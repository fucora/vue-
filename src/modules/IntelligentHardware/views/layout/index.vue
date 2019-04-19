<template>
  <div class="demo-wrapper">
    <div >
      <!--公共头部 -->
      <!-- <page-header :active="active"></page-header> -->
      <!-- 路由页面内容 -->
      <!-- <iframe src="index.html#/" frameborder="0" class="iframe"></iframe> -->
      <div>
         <transition name="fadePage" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
      <!-- 公共底部 -->
      <!-- <page-footer></page-footer> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
</style>
