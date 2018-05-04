import 'babel-polyfill'
import Vue from 'vue'
import 'common/css/index.css'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import vueLazyLoad from 'vue-lazyload'
import JsCookie from 'js-cookie'
import { getHttp } from 'common/js/http'
import { GetQueryString } from 'common/js/util'
import { HOST_URL, ACTIVE_ID, FILE_NAME } from 'common/js/config'
import { WechatPlugin } from 'vux'

Vue.use(WechatPlugin)

Vue.config.productionTip = false

fastClick.attach(document.body)

Vue.use(vueLazyLoad, {
  loading: require('./assets/logo.png')
})

Vue.prototype.wxShare = function (link) {
  let wx = Vue.wechat

  let sdkUrl = link.split('#')[0]
  let pageUrl = link.split('#')[1]

  let arr = sdkUrl.split('/')
  delete arr[arr.length - 1]
  let dir = arr.join('/')
  dir += 'index.html?page=' + pageUrl.split('?')[0]
  if (pageUrl.split('?')[1]) {
    dir += '_' + pageUrl.split('?')[1]
  }

  getHttp(HOST_URL + 'interfaceUrl', {
    id: 108
  }).then(res1 => {
    getHttp(HOST_URL + 'interfaceUrl', {
      id: 108,
      url: sdkUrl
    }).then(res2 => {
      wx.config({
        debug: false,
        appId: res2.data.appId,
        timestamp: res2.data.timestamp,
        nonceStr: res2.data.nonceStr,
        signature: res2.data.signature,
        jsApiList: ['onMenuShareAppMessage']
      })
      wx.ready(() => {
        wx.onMenuShareAppMessage({
          title: res1.data.share_title,
          desc: res1.data.share_description,
          link: dir,
          imgUrl: res1.data.share_img,
          success: function () {
            console.log('分享成功')
          },
          cancel: function () {
            console.log('分享到朋友取消')
          }
        })
      })
    }).catch(err => {
      console.log(err)
    })
  }).catch(err => {
    console.log(err)
  })
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    let page = GetQueryString('page') // 页面路径
    let token = JsCookie.get('token')
    let code = GetQueryString('code')
    if (page) {
      JsCookie.set('page', page)
    }
    if (code) {
      if (!token) {
        getHttp(HOST_URL + 'interfaceUrl', {
          id: ACTIVE_ID,
          code: code
        }).then(res => {
          if (res.code === 200) {
            let data = res.data
            let token = data.token.token
            let user = data.UserInfo
            let nickname = user.nickname
            let headUrl = user.headimgurl
            JsCookie.set('token', token)
            JsCookie.set('nickname', nickname)
            JsCookie.set('headUrl', headUrl)
            next('/')
          } else {
            alert('请求错误!')
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        next()
      }
    } else {
      getHttp(HOST_URL + 'interfaceUrl', {
        id: ACTIVE_ID
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          let appid = res.data.appid
          location.href = 'interfaceUrl/getUserInfo.html?appid=' + appid + '&filename=' + FILE_NAME
        } else {
          alert('请求错误!')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  let page = JsCookie.get('page')
  if (page) {
    let query = {}
    if (page.split('_')[1]) {
      let keyValues = page.split('_')[1].split('&')
      for (let i = 0, len = keyValues.length; i < len; i++) {
        let keyValue = keyValues[i].split('=')
        query[keyValue[0]] = keyValue[1]
      }
    }
    router.push({
      path: page.split('_')[0],
      query: query
    })
    JsCookie.remove('page')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
