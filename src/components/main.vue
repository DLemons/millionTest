<template>
  <div class="main">
    <scroll ref="mainList"
            :data="mainList"
            v-show="mainList"
            class="main-list"
    >
      <div class="main-padding">
        <img src="../common/img/header-top.jpg" class="main-header">

        <div class="parent">
          <div class="child main-top"
               v-for="item in mainList"
               @click="selectId(item.activityinfo.house_id, item.activityinfo.activity_id)"
          >
            <img class="main-top-img" :src="'https://static.tuozhong.net/' + item.logo">
            <div class="main-top-box">
              <div class="main-top-title" v-html="item.title"></div>
              <div class="main-top-number" v-html="item.count"></div>
            </div>
          </div>
        </div>

        <img src="../common/img/logos.png" class="img_footer">
      </div>
    </scroll>

    <div class="loading-container" v-show="!mainList">
      <loading></loading>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll'
  import Loading from 'base/loading'
  import {getHttp} from 'common/js/http'
  import {HOST_URL} from 'common/js/config'

  export default {
    data () {
      return {
        mainList: []
      }
    },
    created () {
      getHttp(HOST_URL + 'interfaceUrl', {
        id: 2,
        token: 1234567890
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.mainList = res.data
          this.$refs.mainList.refresh()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    mounted () {
      this.$refs.mainList.$el.style['height'] = `${document.documentElement.clientHeight}px`
    },
    methods: {
      selectId (houseId, activityId) {
        this.$router.push({
          path: `/detail`,
          query: {
            houseId: houseId,
            activityId: activityId
          }
        })
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style>
  .main-list {
    height: 100%;
    overflow: hidden;
    background: #3271da;
  }

  .main-padding {
    padding-bottom: 60px;
  }

  .main-header {
    width: 100%;
  }

  .main-top {
    text-align: center;
  }

  .main-top-box {
    border-width: 0 1px 1px;
    border-style: solid;
    border-color: #FFF;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .main-top-img {
    width: 100%;
    display: block;
  }

  .main-top-title {
    padding-top: 6px;
    font-size: 14px;
  }

  .main-top-number {
    margin: 6px 0;
    color: #9AB3E9;
    font-size: 14px;
  }
</style>
