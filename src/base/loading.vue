<template>
  <div class="loading">
    <img class="loading-img" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>

<style>
  .loading {
    width: 100%;
    text-align: center;
  }

  .loading-img {
    width: 24px;
    height: 24px;
    margin: 0 auto;
  }

  .desc {
    line-height: 20px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
  }
</style>
