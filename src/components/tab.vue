<template>
  <div class="tab">
    <router-link to="/main" class="tab-cell" @click.native="tab(0)">
      <div class="tab-center">
        <img :src="list[0].nowIconPath" class="tab-img">
      </div>
    </router-link>
    <router-link to="/index" class="tab-cell" @click.native="tab(1)">
      <div class="tab-center">
        <img :src="list[1].nowIconPath" class="tab-img">
      </div>
    </router-link>
    <router-link to="/user" class="tab-cell" @click.native="tab(2)">
      <div class="tab-center">
        <img :src="list[2].nowIconPath" class="tab-img">
      </div>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  const main1 = require('common/img/tab/main_1.png')
  const main2 = require('common/img/tab/main_2.png')
  const index1 = require('common/img/tab/index_1.png')
  const index2 = require('common/img/tab/index_2.png')
  const user1 = require('common/img/tab/user_1.png')
  const user2 = require('common/img/tab/user_2.png')

  export default {
    data () {
      return {
        list: [
          {
            iconPath: main2,
            selectedIconPath: main1,
            nowIconPath: main1,
            name: '首页'
          },
          {
            iconPath: index2,
            selectedIconPath: index1,
            nowIconPath: index2,
            name: '首页'
          },
          {
            iconPath: user2,
            selectedIconPath: user1,
            nowIconPath: user2,
            name: '我的'
          }
        ]
      }
    },
    methods: {
      tab (index) {
        let list = this.list
        for (let i = 0, len = list.length; i < len; i++) {
          if (i === index) {
            list[i].nowIconPath = list[i].selectedIconPath
          } else {
            list[i].nowIconPath = list[i].iconPath
          }
        }
        this.list = list
      }
    }
  }
</script>

<style>
  .tab {
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    width: 100%;
    height: 40px;
    background: #FFF;
    border-top: 1px solid #DCDCDC;
  }

  .tab-cell {
    flex: 1;
    padding: 10px 0;
  }

  .tab-center {
    text-align: center;
    border-right: 1px solid #DEDEDE;
    height: 20px;
  }

  .tab-cell:last-child {
    border-right: 0;
  }

  .tab-img {
    margin: auto;
    width: 70px;
    height: 20px;
  }
</style>
