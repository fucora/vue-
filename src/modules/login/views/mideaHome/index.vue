<template>
  <div class="login-wrapper">
    <header-lr></header-lr>
    <div style="height: 91.5%;"></div>
    <!-- 公共底部 -->
    <page-footer></page-footer>
  </div>
</template>

<script>
import headerLr from '@/components/awesome/header_lr/header_mideaHome';
import pageFooter from '@/components/awesome/footer_rgs/footer_rgs';
export default {
  data() {
    return {
    };
  },
  methods: {
  },
  created() {
  },
  components: {
    'header-lr': headerLr,
    pageFooter
  }
};
</script>

<style lang="less" scoped>
@import './login.less';
.login-container{
  height: 100%;
}
.login-main{
  display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>

