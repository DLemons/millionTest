<template>
  <div class="rank" :style="bgStyle">
    <div class="grid">
      <div class="grid-cell rank-padding">
        <div class="rank-line">
          <div class="rank-name">参与项目</div>
          <div class="rank-number">18</div>
        </div>
      </div>
      <div class="grid-cell rank-padding">
        <div class="rank-line">
          <div class="rank-name">累计投票</div>
          <div class="rank-number">18520</div>
        </div>
      </div>
      <div class="grid-cell rank-padding">
        <div class="rank-line">
          <div class="rank-name">访问量</div>
          <div class="rank-number">78520</div>
        </div>
      </div>
    </div>
    <div class="grid grid-padding">
      <div class="grid-cell rank-top" @click="selectRank">
        <img class="rank-top-img" src="https://iph.href.lu/100x100">
        <div class="rank-top-box">
          <div class="rank-top-title">建发·央著</div>
          <div class="rank-top-number">205165</div>
        </div>
      </div>
      <div class="grid-cell rank-top">
        <img class="rank-top-img" src="https://iph.href.lu/100x100">
        <div class="rank-top-box">
          <div class="rank-top-title">建发·央著</div>
          <div class="rank-top-number">205165</div>
        </div>
      </div>
      <div class="grid-cell rank-top">
        <img class="rank-top-img" src="https://iph.href.lu/100x100">
        <div class="rank-top-box">
          <div class="rank-top-title">建发·央著</div>
          <div class="rank-top-number">205165</div>
        </div>
      </div>
    </div>
    <div class="rank-list box-row">
      <div class="rank-list-num">4</div>
      <img class="rank-list-img" src="https://iph.href.lu/60x60">
      <div class="rank-list-box">
        <div class="rank-list-name">建发·央著</div>
        <div class="rank-list-mes">梅溪湖之心，新中式豪宅</div>
      </div>
      <div class="arrow arrow-adjust"></div>
    </div>
    <div class="rank-list box-row">
      <div class="rank-list-num">5</div>
      <img class="rank-list-img" src="https://iph.href.lu/60x60">
      <div class="rank-list-box">
        <div class="rank-list-name">建发·央著</div>
        <div class="rank-list-mes">梅溪湖之心，新中式豪宅</div>
      </div>
      <div class="arrow arrow-adjust"></div>
    </div>
    <div class="rank-list box-row">
      <div class="rank-list-num">6</div>
      <img class="rank-list-img" src="https://iph.href.lu/60x60">
      <div class="rank-list-box">
        <div class="rank-list-name">建发·央著</div>
        <div class="rank-list-mes">梅溪湖之心，新中式豪宅</div>
      </div>
      <div class="arrow arrow-adjust"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        item: 'dfd'
      }
    },
    props: {
      bgColor: {
        type: String,
        default: '#FFF'
      }
    },
    computed: {
      bgStyle () {
        return `background: ${this.bgColor}`
      }
    },
    methods: {
      selectRank () {
        this.$emit('select', this.item)
      }
    }
  }
</script>

<style>
  .rank-padding {
    padding: 15px 0;
    text-align: center;
    background: #477FDE;
  }

  .rank-padding .rank-line {
    border-right: 1px solid #FFF;
  }

  .rank-padding:last-child .rank-line {
    border-right: 0;
  }

  .rank-name {
    margin-bottom: 10px;
  }

  .rank-number {
    font-size: 14px;
    color: #FBA335;
  }

  .grid-padding {
    padding: 10px;
  }

  .rank-top {
    padding: 10px;
    text-align: center;
  }

  .rank-top-box {
    border-width: 0 1px 1px;
    border-style: solid;
    border-color: #FFF;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .rank-top-img {
    width: 100%;
    display: block;
  }

  .rank-top-title {
    padding-top: 6px;
    font-size: 14px;
  }

  .rank-top-number {
    margin: 6px 0;
    color: #9AB3E9;
    font-size: 14px;
  }

  .rank-list {
    position: relative;
    padding: 15px 30px 15px 45px;
    border-bottom: 1px solid #5A8CE1;
  }

  .rank-list:last-child {
    border-bottom: 0;
  }

  .rank-list-num {
    position: absolute;
    top: 0;
    left: 15px;
    height: 90px;
    line-height: 90px;
  }

  .rank-list-img {
    width: 60px;
  }

  .rank-list-box {
    margin-left: 10px;
  }

  .rank-list-name {
    margin-bottom: 5px;
  }

  .rank-list-mes {
    color: #9AB3E9;
    font-size: 14px;
  }

  .arrow-adjust {
    right: 15px;
  }
</style>
