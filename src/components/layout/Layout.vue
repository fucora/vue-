<template>
  <div class="page-wrapper center-wrapper">
      <div class="page-main">
        <div class="page-left-menu">
          <side-bar></side-bar>
        </div>
        <div class="page-right-container">
          <breadcrumb></breadcrumb>
          <transition name="fadePage" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
  </div>
</template>

<script>
import sideBar from '../awesome/sideBar/index';
import breadcrumb from '../awesome/breadcrumb/index';
export default {
  name: 'Layout',
  components: {
    'side-bar': sideBar,
    breadcrumb
  }
};
</script>

<style lang="less" scoped>
  .page-wrapper {
    margin: 0 auto;
    padding-top: 65px;
    padding-bottom: 16px;
  }
  .page-main {
    display: -webkit-flex;
    display: -moz-flex;
    display: flex;
    padding-top: 16px;
    box-sizing: border-box;
  }
  .page-right-container {
    width: 1080px;
    padding-left: 32px;
    box-sizing: border-box;
  }
</style>
