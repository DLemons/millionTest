var host = "https://api.rux.cn/"
var SQ = {
  // version: '1.1.1',
  urlParams: {},
  appendParams: function (url, params) {
    if (params) {
      var baseWithSearch = url.split('#')[0]
      var hash = url.split('#')[1]
      for (var key in params) {
        var attrValue = params[key]
        if (attrValue !== undefined) {
          var newParam = key + "=" + attrValue
          if (baseWithSearch.indexOf('?') > 0) {
            var oldParamReg = new RegExp('^' + key + '=[-%.!~*\'\(\)\\w]*', 'g')
            if (oldParamReg.test(baseWithSearch)) {
              baseWithSearch = baseWithSearch.replace(oldParamReg, newParam)
            } else {
              baseWithSearch += "&" + newParam
            }
          } else {
            baseWithSearch += "?" + newParam
          }
        }
      }

      if (hash) {
        url = baseWithSearch + '#' + hash
      } else {
        url = baseWithSearch
      }
    }
    return url
  },
  getUrlParams: function () {
    var pairs = location.search.substring(1).split('&')
    for (var i = 0; i < pairs.length; i++) {
      var pos = pairs[i].indexOf('=')
      if (pos === -1) {
        continue
      }
      SQ.urlParams[pairs[i].substring(0, pos)] = decodeURIComponent(pairs[i].substring(pos + 1))
    }
  },
  getHttp: function (url, params, type, callback) {
    $.ajax({
      url: host + url,
      data: params,
      type: type,
      dataType: "json",
      success: function (data) {
        console.log(host + url)
        console.log(data)
        if (data.code == 200) {
          callback(data.data)
        } else {
          alert("请求错误!")
        }
      },
    })
  },
  doRedirect: function (data) {
    console.log(data)
    var code = SQ.urlParams['index']
    var appId = data.appid
    var scope = SQ.urlParams['scope'] || 'snsapi_base'
    var state = SQ.urlParams['state']
    var redirectUri
    if (!code) {
      redirectUri = SQ.appendParams('https://open.weixin.qq.com/connect/oauth2/authorize#wechat_redirect', {
        'appid': appId,
        'redirect_uri': encodeURIComponent("https://" + window.location.host + "/" + filename  + "/getUserInfo.html"),
        'response_type': 'code',
        'scope': 'snsapi_userinfo',
        // 'scope': 'snsapi_base',
        'state': 'STATE',
      })
    } else {
      redirectUri = SQ.appendParams(SQ.urlParams['redirect_uri'], {
        'code': code,
        'state': state
      })
    }
    location.href = redirectUri
  },
  getsec: function (str) {
    var str1 = str.substring(1, str.length) * 1
    var str2 = str.substring(0, 1)
    if (str2 == "s") {
      return str1 * 1000
    }
    else if (str2 == "h") {
      return str1 * 60 * 60 * 1000
    }
    else if (str2 == "d") {
      return str1 * 24 * 60 * 60 * 1000
    }
  },
  setCookie: function (c_name, value, expiredays) {
    var strsec = SQ.getsec(expiredays)
    var exdate = new Date()
    exdate.setTime(exdate.getTime() + strsec * 1)
    document.cookie = c_name + "=" + escape(value) +
      ((strsec == null) ? "" : "expires=" + exdate.toGMTString())
  },
  getCookie: function (c_name) {
    if (document.cookie.length > 0) {
      c_start = document.cookie.indexOf(c_name + "=")
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1
        c_end = document.cookie.indexOf("", c_start)
        if (c_end == -1) c_end = document.cookie.length
        return unescape(document.cookie.substring(c_start, c_end))
      }
    }
    return ""
  },
  GetQueryString: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
    var r = window.location.search.substr(1).match(reg)
    if (r != null)return unescape(r[2])
    return null
  }
}
