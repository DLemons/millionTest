<template>
  <div class="index">
    <div v-show="rankList.length">
      <div class="top" ref="top">
        <transition name="top">
          <img src="https://iph.href.lu/375x180" v-show="!modeOpen" class="">
        </transition>
        <transition name="top">
          <img src="https://iph.href.lu/375x120" v-if="modeOpen" class="">
        </transition>
      </div>
      <scroll ref="indexList"
              :data="rankList"
              class="index-list"
      >
        <ul>
          <li v-for="(item, index) in rankList">
            <div class="title"
                 :style="indexColor(index)"
                 @click.stop="showsMode(index)"
                 ref="title"
            >
              <i class="cup"></i>
              <h6 v-html="item.subtitle"></h6>
              <span v-html="item.title"></span>
              <div class="arrow arrow-index-adjust"></div>
            </div>
            <transition name="rank"
                        @before-enter="beforeEnter"
                        @enter="enter"
                        @after-enter="afterEnter"
                        @leave="leave"
                        @after-leave="afterLeave"
            >
              <div class="mode" v-show="shows[index].type">
                <rank :bgColor="bgColor1"
                      @select="selectId"
                ></rank>
              </div>
            </transition>
          </li>
        </ul>
      </scroll>
    </div>

    <div class="loading-container" v-show="!rankList.length">
      <loading></loading>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll'
  import Loading from 'base/loading'
  import Rank from 'components/rank'
  import Velocity from 'velocity-animate'
  import {getHttp} from 'common/js/http'
  import {HOST_URL} from 'common/js/config'

  const topHeight = 180
  const topHeightOpen = 120
  const titleHeight = 60
  const tabHeight = 40

  export default {
    data () {
      return {
        topIndex: 0,
        modeOpen: false,
        shows: [],
        rankList: [],
        bgColor1: '#06C0BD'
      }
    },
    created () {
      // this.wxShare(window.location.href)

      getHttp(HOST_URL + 'interfaceUrl', {
        id: 1,
        token: 1234567890
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          let rankList = res.data
          let shows = []
          for (let i = 0, len = rankList.length; i < len; i++) {
            shows.push({ type: false })
          }
          this.rankList = rankList
          this.shows = shows
        }
      }).catch(err => {
        console.log(err)
      })
    },
    mounted () {
      this.$refs.indexList.$el.style['height'] = `${document.documentElement.clientHeight - topHeight - tabHeight}px`
    },
    methods: {
      beforeEnter (el) {
        el.style.height = 0
        this.$refs.indexList.$el.style['height'] = `${document.documentElement.clientHeight - topHeightOpen - tabHeight}px`
      },
      enter (el, done) {
        let titleShowNum = 2
        if (this.topIndex === (this.shows.length - 1)) {
          titleShowNum = 1
        }
        Velocity(el, { height: `${document.documentElement.clientHeight - topHeightOpen - titleShowNum * titleHeight - tabHeight}px` }, { duration: 200, complete: done })
      },
      afterEnter () {
      },
      leave (el, done) {
        Velocity(el, { height: 0 }, { duration: 200, complete: done })
        this.$refs.indexList.$el.style['height'] = `${document.documentElement.clientHeight - topHeight - tabHeight}px`
      },
      afterLeave () {
      },
      indexColor (index) {
        return `background: linear-gradient(to right, ${this.rankList[index].start_color}, ${this.rankList[index].end_color});`
      },
      showsMode (index) {
        let shows = this.shows
        if (shows[index].type) {
          shows[index].type = false
          this.topIndex = 0
          this.modeOpen = false
          this.$refs.top.style.height = `${topHeight}px`
        } else {
          for (let i = 0, len = shows.length; i < len; i++) {
            if (i === index) {
              shows[i].type = true
              this.topIndex = index
            } else {
              shows[i].type = false
            }
          }
          this.modeOpen = true
          this.$refs.top.style.height = `${topHeightOpen}px`
        }
        this.shows = shows
      },
      selectId (index) {
        this.$router.push({
          path: `/index/${index}`
        })
      }
    },
    components: {
      Scroll,
      Loading,
      Rank
    },
    watch: {
      topIndex () {
        this.$refs.indexList.scrollTo(0, -titleHeight * this.topIndex, 400)
      },
      shows: {
        handler () {
          setTimeout(() => {
            this.$refs.indexList.refresh()
            let shows = this.shows
            for (let i = 0, len = shows.length; i < len; i++) {
              if (shows[i].type) {
                this.$refs.indexList.disable()
                return
              }
            }
            this.$refs.indexList.enable()
          }, 400)
        },
        deep: true
      }
    }
  }
</script>

<style>
  .top {
    position: relative;
    width: 100%;
    height: 180px;
    transition: height 0.2s;
    overflow: hidden;
  }

  .top-pos {
    position: absolute;
    top: 0;
    left: 0;
  }

  .top-enter-active {
    transition: all 0.6s;
  }

  .top-enter {
    opacity: 0;
  }

  .index-list {
    width: 100%;
    overflow: hidden;
  }

  .title {
    position: relative;
    padding: 14px 30px 10px 80px;
    width: 100%;
    height: 60px;
  }

  .cup {
    position: absolute;
    top: 18px;
    left: 45px;
  }

  .cup:before {
    content: "";
    background-image: url(../common/img/1/cup.png);
    /*background-image: url(../../static/img/1/cup.png);*/
    background-size: 70%;
    position: absolute;
    width: 50px;
    height: 48px;
    z-index: 100;
    top: -12px;
    left: -30px;
    background-repeat: no-repeat;
    background-position: center center;
  }

  .title h6 {
    margin-bottom: 5px;
  }

  .title span {
    font-size: 14px;
  }

  .arrow-index-adjust {
    right: 20px;
  }

  .mode {
    width: 100%;
    height: 240px;
    overflow-y: scroll;
  }
</style>
