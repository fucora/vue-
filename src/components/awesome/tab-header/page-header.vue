<template>
  <div class="page-header">
    <div class="page-header-container center-wrapper clearfix">
      <a class="logo-wrapper pull-left">
        <img class="logo" src="../../../assets/img/logo@2x.png" alt="图片不存在" width="43" height="29">
        <span style="fontSize:18px">美的开放平台</span>
      </a>
      <div class="page-nav pull-left">
        <div
          class="page-nav-item"
          :class="{'nav-active': navActive === pItem.name}"
          v-for="(pItem, index) in hNavData"
          :key="index"
        >
          <a
            class="level-nav-item"
            style="display:inline-block;padding: 0 28px"
            href="javascript:void(0);"
            @click="gotoMoudel(pItem)"
          >{{pItem.name}}</a>
        </div>
      </div>

    <div class="user-info-wrapper pull-right">

      <el-badge :value="12" class="item">
        <span class="icon-bell" @click="gotoMoudel(userInfoPath)"></span>
      </el-badge>

      <el-dropdown >
          <span class="icon-bell" style="margin-top: 5px;" ></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :divided="item.flag" :command="item.name" v-for="(item, index) in userList" :key="index">
              <a
                class="level-nav-item"
                style="display:inline-block;padding: 0 28px"
                href="javascript:void(0);" @click="gotoMoudel(item)" target="_blank"
              >{{item.name}}</a>
            </el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
// import ls from '@/utils/storage/local_storage';
// import { logout } from '@/common/api/main';
import { getToken } from '@/utils/auth'; // 验权
export default {
  props: {
    active: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      getToken: getToken(),
      hNavData: [
        { name: '智能硬件', path: '../IntelligentHardware/index.html#/' },
        { name: '应用服务', path: '../applicationService/index.html#/' },
        { name: '数据中心', path: '../mineDataCenter/index.html#/' },
        { name: '运营中心', path: '..//operationCenter/index.html#/' },
        { name: '文档中心', path: '../documentCenter/index.html#/' }
      ],
      userInfoPath: { name: '我的消息', flag: false, path: '../index/index.html#/product/userInfo?activeName=comC' },
      userList: [
        { name: '用户信息', flag: false, path: '../index/index.html#/product/userInfo?activeName=comA' },
        { name: '企业信息', flag: false, path: '../index/index.html#/product/userInfo?activeName=comB' },
        // { name: '我的产品', flag: false },
        { name: '我的消息', flag: false, path: '../index/index.html#/product/userInfo?activeName=comC' },
        { name: '平台公告', flag: false, path: '../index/index.html#/product/userInfo?activeName=comD' },
        { name: '常见问题', flag: false, path: '../index/index.html#/product/userInfo?activeName=comE' },
        { name: '注销', flag: true, path: '/login/index.html#/login' }
      ],
      navActive: this.active
    };
  },
  watch: {
    active(nVal) {
      this.navActive = nVal;
    },
    // '$route.path': {
    //   handler: function(nVal, oVal) {
    //     if (nVal === '/developGuideTop/developGuide/guide') {
    //       // this.navActive = '开发指引';
    //       this.handleNavClick({ name: '开发指引', path: '/developGuideTop' });
    //     }
    //   },
    //   deep: true,
    //   immediate: true
    // },
    '$store.getters.userInfo': {
      handler: function(val, oldVal) {
        // this.handleName();
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
  gotoMoudel (val) {
    if (val.name === '注销') {
      this.toLogin(val);
    } else {
      this.$emit('moudelChange', val);
    }
  },
  async toLogin (val) {
    await this.$store.dispatch('LogOut');
    window.location.href = window.location.origin + val.path;
  }
    // handleName() {
    //   let tempUserInfo = this.$store.getters.userInfo;
    //   let lsUserInfo = JSON.parse(ls.getItem('userInfo'));
    //   // debugger;
    //   if (
    //     (tempUserInfo && tempUserInfo.email) ||
    //     (lsUserInfo && lsUserInfo.email)
    //   ) {
    //     this.mobile = tempUserInfo.email || lsUserInfo.email;
    //     // debugger;
    //   }
    //   if (
    //     (tempUserInfo && tempUserInfo.roleName) ||
    //     (lsUserInfo && lsUserInfo.roleName)
    //   ) {
    //     this.roleName = tempUserInfo.roleName || lsUserInfo.roleName;
    //     // debugger;
    //   }
    //   if (
    //     (tempUserInfo && tempUserInfo.nickName) ||
    //     (lsUserInfo && lsUserInfo.nickName)
    //   ) {
    //     this.nickName = tempUserInfo.nickName || lsUserInfo.nickName;
    //     // debugger;
    //   }
    // },
  }
};
</script>

<style lang="less" scoped>
.page-header {
  // position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #1d233c;
  z-index: 2000;
  // 覆盖
}
.el-badge{
  margin-top: -10px;
}
.page-header-container {
  height: 65px;
  margin: 0 auto;

  a {
    font-size: 16px;
    color: #fff;
  }
}
.logo-wrapper {
  margin-right: 55px;
  // padding: 18px 0;
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
}
.logo {
  display: inline-block;
  margin-right: 16px;
  vertical-align: middle;
}
.user-info-wrapper {
  float: right;
  margin-top: 10px;
  // position: relative;
  // height: 65px;
  .el-dropdown {
    margin-left: 30px;
  }
}
.user-info-content {
  line-height: 65px;
  margin-right: 27px;
  span {
    display: inline-block;
    opacity: 0.7;
    font-size: 14px;
    color: #fff;
    letter-spacing: 0;
    vertical-align: middle;
    cursor: pointer;
  }
  .icon-down {
    width: 20px;
    height: 20px;
    background: url("../../../assets/img/doc_arrow2@2x.png") no-repeat center
      center;
    background-size: cover;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    transform: rotate(0deg);
    transition: transform 0.5s;
    &.rotate {
      -webkit-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      transform: rotate(180deg);
    }
  }
}
.icon-bell {
  // position: absolute;
  // top: 70%;
  // right: 0;
  width: 25px;
  height: 25px;
  display: inline-block;
  padding-top: 5px;
  // margin-top: 9px;
  background: url("../../../assets/img/msg@2x.png") no-repeat center center;
  background-size: cover;
}
.hide-user-info {
  position: absolute;
  top: 67px;
  left: 0;
  width: 140px;
  height: auto;
  background: #1d233c;
  border-radius: 4px;
  overflow: hidden;
}
.user-info-list {
  width: 100%;
  .list-item {
    a {
      display: block;
      padding-left: 16px;
      border-bottom: 1px solid #fff;
      line-height: 36px;
      font-size: 14px;
      color: #fff;
      opacity: 0.7;
    }
  }
}
.slideInfo-enter,
.slideInfo-leave-to {
  opacity: 0;
}
.slideInfo-enter-active,
.slideInfo-leave-active {
  transition: opacity 0.5s;
}

.page-nav {
  .page-nav-item {
    display: inline-block;
    // padding: 0 28px;
    line-height: 65px;
    font-size: 16px;
    color: #fff;
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
</style>
