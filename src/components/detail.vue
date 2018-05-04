<template>
  <transition name="slide">
    <Scroll class="detail"
            :dataStr="detailList"
            ref="detailList"
    >
      <div v-if="detailList">
        <div class="detail-bg">
          <div class="detail-top">
            <div class="detail-top-left">
              <img v-if="detailList.logo" class="detail-img" :src="'https://static.tuozhong.net/' + detailList.logo">
            </div>
            <div class="detail-top-mid">
              <h4 class="detail-title">
                <span v-html="detailList.title"></span>
                <img src="../common/img/2/crown.png" class="detail-title-img">
              </h4>
              <p class="detail-desc" v-html="detailList.subtitle"></p>
            </div>
            <div class="detail-btn detail-btn-checked" @click="toVote">投票</div>
          </div>
          <div class="detail-mid">
            <div class="detail-mid-num">排名：<span v-html="detailList.rangking"></span></div>
            <div class="detail-mid-num">票数：<span v-html="detailList.vote_count"></span></div>
          </div>
          <div class="detail-bar">
            <p>{{detailList.title}}参加的其他评选</p>
            <img src="../common/img/2/2.png" class="detail-add-icon">
          </div>
          <ul class="accordion">
            <li class="accordion-li" v-for="item in detailList.otherActivity">
              <img src="../common/img/1/cup.png" class="accordion-img">
              <div class="accordion-txt" v-html="item.title"></div>
              <div class="arrow arrow-detail-adjust"></div>
            </li>
          </ul>
        </div>

        <div class="detail-info">
          <div v-if="detailList.activityinfo">
            <img :src="'https://static.tuozhong.net/' + detailList.activityinfo.image1" class="info-img info-margin">
            <div class="info-introduce info-margin" v-html="detailList.activityinfo.content1"></div>
            <img :src="'https://static.tuozhong.net/' + detailList.activityinfo.image2" class="info-img info-margin">
            <div class="info-introduce info-margin" v-html="detailList.activityinfo.content2"></div>
            <img :src="'https://static.tuozhong.net/' + detailList.activityinfo.image3" class="info-img info-margin">
            <div class="info-introduce info-margin" v-html="detailList.activityinfo.content3"></div>
          </div>

          <div>
            <div class="box-row info-row info-margin">
              <i class="info-row-i i-name"></i>
              <span class="info-row-txt" v-html="detailList.title"></span>
            </div>
            <div class="box-row info-row">
              <i class="info-row-i i-address"></i>
              <span class="info-row-txt" v-html="detailList.house_address"></span>
              <div class="arrow arrow-info-adjust"></div>
            </div>
            <div class="box-row info-row">
              <i class="info-row-i i-tel"></i>
              <span class="info-row-txt" v-html="detailList.sale_phone"></span>
            </div>
          </div>

          <div class="info-introduce info-margin" v-html="detailList.content"></div>
          <img v-if="detailList.big_image" :src="'https://static.tuozhong.net/' + detailList.big_image" class="info-img info-margin">

          <div class="info-margin">
            <div class="house-title">楼盘详情</div>
            <ul class="house-detail">
              <li>
                <div>物业类型：<span v-html="detailList.house_type"></span></div>
                <div>装修情况：<span v-html="detailList.decorate"></span></div>
              </li>
              <li>
                <div>产权年限：<span v-html="detailList.property"></span></div>
                <div>建筑类型：<span v-html="detailList.building_type"></span></div>
              </li>
              <li>
                <div>车位配比：<span v-html="detailList.car_rate"></span></div>
                <div>规划户数：<span v-html="detailList.house_num"></span></div>
              </li>
              <li>
                <div>容积率：<span v-html="detailList.plot_rate"></span></div>
                <div>绿化率：<span v-html="detailList.greening_rate"></span></div>
              </li>
              <li>
                <div>在售地块交房时间：<span v-html="detailList.finsh_time"></span></div>
              </li>
            </ul>
          </div>

          <img src="../common/img/logos.png" class="img_footer info-margin">
          <div style="padding: 30px;"></div>
        </div>
      </div>

      <div class="loading-container" v-if="!detailList">
        <loading></loading>
      </div>
    </Scroll>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll'
  import Loading from 'base/loading'
  import {getHttp} from 'common/js/http'
  import {HOST_URL} from 'common/js/config'

  export default {
    data () {
      return {
        detailList: {}
      }
    },
    created () {
      // this.wxShare(window.location.href)
    },
    activated () {
      this.$refs.detailList.scrollTo(0, 0, 0)
      this.initData()
    },
    methods: {
      initData () {
        const houseId = this.$route.query.houseId
        const activityId = this.$route.query.activityId
        getHttp(HOST_URL + 'interfaceUrl', {
          id: 2,
          token: 1234567890,
          house_id: houseId,
          activity_id: activityId
        }).then(res => {
          if (res.code === 200) {
            this.detailList = res.data
          }
        }).catch(err => {
          console.log(err)
        })
      },
      toVote () {
        console.log(333)
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style>
  .info-row {
    border-top: 1px solid #e3e3e3;
    height: 36px;
    line-height: 36px;
    position: relative;
  }

  .info-row:last-child {
    border-bottom: 1px solid #e3e3e3;
  }

  .info-row-i {
    width: 20px;
    height: 24px;
    background-position: center center;
    background-repeat: no-repeat;
  }

  .i-name {
    background-image: url(../common/img/3/1.png);
  }

  .i-address {
    background-image: url(../common/img/3/2.png);
  }

  .i-tel {
    background-image: url(../common/img/3/3.png);
  }

  .info-row-txt {
    color: #000;
    font-size: 14px;
    margin-left: 12px;
  }

  .arrow-info-adjust {
    right: 10px;
    border-color: #f49120;
  }

  .house-title {
    font-size: 16px;
    color: #000;
    padding: 10px 0;
  }

  .house-detail li{
    display: flex;
    height: 36px;
    line-height: 36px;
    border-top: 1px solid #e3e3e3;
  }

  .house-detail li:last-child {
    border-bottom: 1px solid #e3e3e3;
  }

  .house-detail li div{
    flex: 1;
    color: #a3a3a3;
    font-size: 14px;
  }

  .house-detail li span{
    margin-left: 1%;
    color: #000;
    font-size: 14px;
  }

  .detail {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    height: 100%;
    width: 100%;
  }

  .detail-bg {
    background: #3271DA;
  }

  .detail-top, .detail-mid {
    display: flex;
  }

  .detail-top {
    padding: 20px;
    border-bottom: 1px solid #477fde;
  }

  .detail-top-left {
    margin: auto;
  }

  .detail-img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }

  .detail-top-mid {
    flex: 3;
    margin: auto 10px;
  }

  .detail-title {
    display: inline-block;
    position: relative;
  }

  .detail-title-img {
    position: absolute;
    right: -30px;
    top: 50%;
    width: 16px;
    height: 16px;
    margin-top: -9px;
  }

  .detail-desc {
    margin-top: 5px;
    color: #adc1ed;
    font-size: 12px;
  }

  .detail-btn {
    margin: auto auto;
    flex: 1;
    text-align: center;
    background: #ff9a14;
    color: #fff;
    line-height: 2em;
    border-radius: 6px;
  }

  .detail-btn-checked {
    background: #808080;
    color: #666;
  }

  .detail-mid-num {
    flex: 1;
    text-align: center;
    margin: 10px 0;
    border-right: 1px solid #477fde;
  }

  .detail-mid span{
    color: #ff9a14;
  }

  .detail-mid-num:last-child {
    border-right: 0;
  }

  .detail-bar {
    position: relative;
    background: #ff9a14;
  }

  .detail-bar p {
    padding: 10px 20px;
    font-size: 14px;
  }

  .detail-add-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    margin-top: -7px;
    width: 14px;
    height: 14px;
  }

  .accordion-li {
    position: relative;
    height: 35px;
    padding: 0 20px 0 50px;
    border-bottom: 1px solid #477fde;
  }

  .accordion-li:last-child {
    border-bottom: 0;
  }

  .accordion-img {
    position: absolute;
    top: 50%;
    left: 20px;
    width: 21px;
    height: 20px;
    margin-top: -10px;
  }

  .accordion-txt {
    line-height: 35px;
    font-size: 14px;
  }

  .arrow-detail-adjust {
    right: 20px;
  }

  .detail-info {
    padding: 0 20px;
  }

  .info-margin {
    margin-top: 20px;
  }

  .info-img {
    width: 100%;
  }

  .info-introduce {
    font-size: 14px;
    color: #000;
    line-height: 20px;
  }

  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
