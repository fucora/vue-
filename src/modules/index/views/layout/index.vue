<template>
  <div class="demo-wrapper">
    <div v-if="isHidden">
      <page-header :active="active"></page-header>
      <layout :isShowLeft="rootPath"></layout>
    </div>
    <div v-else>
      <header-home :headerStyle="{position: 'absolute',width:'100%',zIndex:'1'}"></header-home>
      <transition name="fadePage" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import pageHeader from '@/components/awesome/tab-header/page-header';
import HeaderHome from './../developerplatform/loyouts/header';
import layout from '@/components/layout/layout1';
export default {
  data() {
    return {
      active: '我的产品',
      isHidden: true,
      rootPath: ''
    };
  },
  components: {
    'page-header': pageHeader,
    layout,
    HeaderHome
  },
  watch: {
    '$route.path': function(to, form) {
      this.isPath();
    }
  },
  methods: {
    isPath() {
      let pathArr = this.$router.history.current.path.split('/');
      if (pathArr.length) {
        this.rootPath = '/' + pathArr[1];
      }
      // debugger;
      if (this.rootPath === '/platformIntroduction') {
        this.isHidden = false;
        this.active = ' ';
        // debugger;
      } else {
        this.isHidden = true;
      }
    }
  },
  mounted() {
    this.isPath();
  }
};
</script>

<style lang="less" scoped>
</style>
