<template>
  <div class="demo-wrapper">
    <div >
      <!--公共头部 -->
      <page-header :active="active" @moudelChange="moudelChange"></page-header>
      <!-- 路由页面内容 -->
      
      <div style="margin: 0 auto; width: 1200px; padding-top: 10px; min-height: 650px;">
         <transition name="fadePage" mode="out-in">
          <iframe src="../index/index.html#/product/home" frameborder="0" id="iframeId" class="iframe"></iframe>
          <!-- <router-view></router-view> -->
        </transition>
      </div>
      <!-- 公共底部 -->
      <page-footer></page-footer>
    </div>
  </div>
</template>

<script>
import pageHeader from '@/components/awesome/tab-header/page-header';
import pageFooter from '@/components/awesome/footer_rgs/footer_rgs';
export default {
  data() {
    return {
      active: '',
      isHidden: true,
      rootPath: ''
    };
  },
  components: {
    'page-header': pageHeader,
    pageFooter
    // HeaderHome
  },
  watch: {
    '$route.path': function(to, form) {
      // this.isPath();
    }
  },
  methods: {
    moudelChange (val) {
      var _div = document.getElementById('iframeId');
      _div.src = val.path;
    }
    // isPath() {
    //   let pathArr = this.$router.history.current.path.split('/');
    //   if (pathArr.length) {
    //     this.rootPath = '/' + pathArr[1];
    //   }
    //   // debugger;
    //   if (this.rootPath === '/platformIntroduction') {
    //     this.isHidden = false;
    //     this.active = ' ';
    //     // debugger;
    //   } else {
    //     this.isHidden = true;
    //   }
    // }
  },
  mounted() {
    // this.isPath();
  }
};
</script>

<style lang="less" scoped>
.iframe{
  width: 1200px;
  min-height: 650px;
}
</style>
