<template>
  <div class="header-lr-wrapper">
    <div class="header-lr-content center-wrapper">
      <!-- <a class="logo-wrapper" href="javascript:void(0)" @click="goToHome"> -->
      <a class="logo-wrapper" href="javascript:void(0)" >
        <img class="logo" src="../../../assets/img/logo@2x.png" alt="图片不存在" width="43" height="29">
        <span>开发者中心</span>
      </a>
      <div class="hlr-nav">
        <a class="nav-link-a" href="javascript:void(0)" @click="toLogin">登陆</a>
        <a href="javascript:void(0)" @click="toRegist">注册</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {};
  },
  methods: {
    // 跳转首页
    toLogin() {
      this.$router.push({name: '登陆'});
    },
    toRegist() {
      this.$router.push({name: '注册'});
    }
  }
};
</script>

<style lang="less" scoped>
.header-lr-wrapper {
  // position: fixed;
  // top: 0;
  // left: 0;
  // width: 100%;
  background: #1D233C;
  // z-index: 999;
    // background-color: rgba(0, 0, 0, 0.2);
      width: 100%;
    z-index: 1;
    position: fixed;
}
.header-lr-content {
  position: relative;
  height: 65px;
  margin: 0 auto;
        width: 100%;
    display: flex;
    justify-content: space-between;

  a {
    font-size: 16px;
    color: #fff;
        span{
      font-size: 18px;
    }
  }
}
.logo-wrapper {
  // position: absolute;
  // top: 0;
  // left: 0px;
  // padding: 18px 0;
  // overflow: hidden;
    display: flex;
  align-items: center;
    justify-content: center;
}
.logo {
  display: inline-block;
  margin-right: 16px;
  vertical-align: middle;
}
.hlr-nav {
  position: absolute;
  top: 0;
  right: 0px;
  padding: 23px 0 24px 0;
}
.nav-link-a:after {
  content: '|';
  display: inline-block;
  font-size: 14px;
  color: #dedfe5;
  margin: 0 35px 0 37px;
}
</style>
