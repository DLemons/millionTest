<template>
  <div class="user">
    <div class='user-top'>
      <div class='user-box'>
        <img class='user-img' src='http://iph.href.lu/87x87'>
        <div class='user-txt'>优秀青年</div>
      </div>
    </div>
    <div class="user-info">
      <div class="info-top grid">
        <div class="info-top-txt grid-cell" :class="infoLeftC" @click="infoChoose(0)">已获得奖品</div>
        <div class="info-top-txt grid-cell" :class="infoRightC" @click="infoChoose(1)">已投票楼盘</div>
      </div>
      <div class="info-pos">
        <transition name="info">
          <div class="info-left" v-show="infoLeft">
            <div class="left-box">
              <div class="box-col">
                <img src="https://iph.href.lu/70x90?text=1" class="left-img">
                <div class="left-txt">华为荣耀7</div>
              </div>
            </div>
            <div class="left-box">
              <div class="box-col">
                <img src="https://iph.href.lu/70x90?text=2" class="left-img">
                <div class="left-txt">华为荣耀7</div>
              </div>
            </div>
            <div class="left-box">
              <div class="box-col">
                <img src="https://iph.href.lu/70x90?text=3" class="left-img">
                <div class="left-txt">华为荣耀7</div>
              </div>
            </div>
            <div class="left-box">
              <div class="box-col">
                <img src="https://iph.href.lu/70x90?text=4" class="left-img">
                <div class="left-txt">华为荣耀7</div>
              </div>
            </div>
            <div class="left-box">
              <div class="box-col">
                <img src="https://iph.href.lu/70x90?text=5" class="left-img">
                <div class="left-txt">华为荣耀7</div>
              </div>
            </div>
          </div>
        </transition>
        <transition name="info">
          <div class="info-right" v-show="!infoLeft">
            <div class="right-box grid">
              <img src="https://iph.href.lu/50x50" class="right-img">
              <div class="right-list grid-cell">
                <div class="right-list-name">建发·央著</div>
                <div class="right-list-mes">梅溪湖之心，新中式豪宅</div>
              </div>
              <div class="arrow arrow-info-adjust"></div>
            </div>
            <div class="right-box grid">
              <img src="https://iph.href.lu/50x50" class="right-img">
              <div class="right-list grid-cell">
                <div class="right-list-name">建发·央著</div>
                <div class="right-list-mes">梅溪湖之心，新中式豪宅</div>
              </div>
              <div class="arrow arrow-info-adjust"></div>
            </div>
          </div>
        </transition>
      </div>
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
        infoLeft: true
      }
    },
    activated () {
      getHttp(HOST_URL + 'interfaceUrl', {
        id: 2,
        token: 1234567890
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
        }
      }).catch(err => {
        console.log(err)
      })
    },
    computed: {
      infoLeftC () {
        return this.infoLeft ? 'info-checked' : 'info-no-checked'
      },
      infoRightC () {
        return this.infoLeft ? 'info-no-checked' : 'info-checked'
      }
    },
    methods: {
      infoChoose (index) {
        if (index) {
          this.infoLeft = false
        } else {
          this.infoLeft = true
        }
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style>
  .user-top {
    position: relative;
    width: 100%;
    height: 110px;
    background: #3271DA;
    margin-bottom: 90px;
  }

  .user-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 67px;
    left: 50%;
    z-index: 100;
    margin-left: -100px;
    width: 200px;
  }

  .user-img {
    width: 87px;
    height: 87px;
    border-radius: 50%;
  }

  .user-txt {
    margin-top: 10px;
    font-size: 14px;
    color: #282828;
  }

  .info-top {
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #3271DA;
    margin: 0 30px 20px;
  }

  .info-top-txt {
    height: 30px;
    line-height: 30px;
    text-align: center;
  }

  .info-checked {
    background: #3271DA;
  }

  .info-no-checked {
    background: #FFF;
    color: #000;
  }

  .info-pos {
    position: relative;
  }

  .info-left {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    margin: 0 20px;
  }

  .left-box {
    box-sizing: border-box;
    padding: 10px;
    flex: 0 0 33.3%;
  }

  .left-img {
    width: 100%;
  }

  .left-txt {
    color: #000;
    font-size: 14px;
    margin-top: 10px;
  }

  .info-right {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0 30px;
  }

  .right-box {
    position: relative;
    height: 70px;
    padding: 10px 0;
    border-bottom: 1px solid #E0E0E0;
  }

  .right-box:last-child {
    border-bottom: 0;
  }

  .right-img {
    width: 50px;
    height: 50px;
    margin: auto;
  }

  .right-list {
    margin: auto 10px;
  }

  .right-list-name {
    color: #000;
  }

  .right-list-mes {
    color: #000;
    margin-top: 5px;
    font-size: 12px;
  }

  .arrow-info-adjust {
    border-color: #EDA95A;
  }

  .info-enter-active, .info-leave-active {
    transition: all 0.6s;
  }

  .info-enter, .info-leave-to {
    opacity: 0;
  }
</style>
