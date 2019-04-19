<template>
  <div class="rgs-footer clearfix">
    <div class="rgs-footer-contain center-wrapper clearfix">
        <div class="page-nav pull-left"> <p class="copy-right">Copyright © 1968-2018 Midea Group. all right reserved</p> </div>
        <div class="page-nav pull-left">
          <div
            class="page-nav-item"
            :class="{'nav-active': navActive === pItem.name}"
            v-for="(pItem, index) in footList"
            :key="index"
            @click="handleNavClick(pItem)"
          >
            <span
              class="level-nav-item"
              style="display:inline-block;padding: 0 28px"
            >{{pItem.name}}</span>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      footList: [
        { name: '联系我们', path: '/product/hardware' },
        { name: '服务条款', path: '/product/applicationService' },
        { name: '隐私保护', path: '/product/dataCenter' }
      ],
      navActive: ''
    };
  },
  methods: {
    handleNavClick(pItem) {
      this.navActive = pItem.name;
      // this.$router.push({ path: pItem.path });
    }
  }
};
</script>

<style lang="less" scoped>
  .rgs-footer {
    width: 100%;
    background: #1d233c;
    height: 65px;
    // position:fixed;  
    // bottom: 0px;  
    // z-index: -1;
  }
  .page-nav {
  .page-nav-item {
    display: inline-block;
    // padding: 0 28px;
    line-height: 65px;
    font-size: 14px;
    color: #666;
    cursor: pointer;
    transition: all 0.3s;

    span {
      opacity: 0.7;
      transition: all 0.3s;
    }
  }
}
.page-nav-item.nav-active {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1px;
  span {
    opacity: 1;
  }
}
  .rgs-footer-contain {
    height: 65px;
    // margin: 0 auto;
    position: absolute;
    left: 25%;
    // margin-left: 50%;
    p {
      line-height: 65px;
      font-size: 14px;
      color: #666;
    }
  }
</style>
