<template>
  <div class="page-header">
    <div class="page-header-container center-wrapper clearfix">
      <a class="logo-wrapper pull-left" @click="gotHome">
        <img class="logo" src="../../../assets/img/logo@2x.png" alt="图片不存在" width="43" height="29">
        <span style="fontSize:18px">开发者中心</span>
      </a>
      <div class="page-nav pull-left">
        <div class="page-nav-item" :class="{'nav-active': navActive === pItem.name}" v-for="(pItem, index) in hNavData" :key="index" @click="handleNavClick(pItem)">
          <span class="level-nav-item" style="display:inline-block;padding: 0 28px">{{pItem.name}}</span>
        </div>
      </div>
      <div class="user-info-wrapper pull-right" v-if="(nickName||mobile)&&getToken" @mouseleave="isShow = false">
        <div class="user-info-content" @click.stop="isShow = !isShow">
          <span v-if="nickName">
            <span class="user-info">{{nickName}}</span>
            <!-- <span class="user-info" v-if="roleName">({{roleName}})</span> -->
          </span>
          <span v-else>
            <span class="user-info">{{mobile}}</span>
            <!-- <span class="user-info" v-if="roleName">({{roleName}})</span> -->
          </span>
          <span class="icon-down" :class="{rotate: isShow}"></span>
        </div>
        <span class="icon-bell"></span>
        <transition name="slideInfo">
          <div class="hide-user-info" v-show="isShow" @click.stop>
            <ul class="user-info-list">
              <li class="list-item">
                <a href="javascript:void(0)" @click="goToInfo">开发者信息</a>
              </li>
              <li class="list-item" @click="handleLogout">
                <a href="javascript:void(0)">退出</a>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import ls from '@/utils/storage/local_storage';
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
      nickName: '', // 昵称
      roleName: '', // 角色
      mobile: '',
      isShow: false,
      hNavData: [
        { name: '我的产品', path: '/product/myProducts' }
        // { name: '开发指引', path: '/developGuideTop' },
        // { name: '下载中心', path: '/downloadCenter' }
      ],
      navActive: this.active
    };
  },
  watch: {
    active(nVal) {
      this.navActive = nVal;
    },
    '$route.path': {
      handler: function(nVal, oVal) {
        if (nVal === '/developGuideTop/developGuide/guide') {
          // this.navActive = '开发指引';
          this.handleNavClick({ name: '开发指引', path: '/developGuideTop' });
        }
      },
      deep: true,
      immediate: true
    },
    '$store.getters.userInfo': {
      handler: function(val, oldVal) {
        this.handleName();
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleName() {
      let tempUserInfo = this.$store.getters.userInfo;
      let lsUserInfo = JSON.parse(ls.getItem('userInfo'));
      // debugger;
      if (
        (tempUserInfo && tempUserInfo.account) ||
        (lsUserInfo && lsUserInfo.account)
      ) {
        this.mobile = tempUserInfo.account || lsUserInfo.account;
        // debugger;
      }
      if (
        (tempUserInfo && tempUserInfo.roleName) ||
        (lsUserInfo && lsUserInfo.roleName)
      ) {
        this.roleName = tempUserInfo.roleName || lsUserInfo.roleName;
        // debugger;
      }
      if (
        (tempUserInfo && tempUserInfo.nickName) ||
        (lsUserInfo && lsUserInfo.nickName)
      ) {
        this.nickName = tempUserInfo.nickName || lsUserInfo.nickName;
        // debugger;
      }
    },
    // 点击头部导航
    handleNavClick(pItem) {
      this.navActive = pItem.name;
      this.$router.push({ path: pItem.path });
    },

    // 跳转开发者信息
    goToInfo() {
      this.$router.push({ path: '/info' });
    },

    // 跳转介绍页
    gotHome() {
      this.$router.push({ path: '/platformIntroduction' });
    },
    // 退出登陆
    async handleLogout() {
      debugger;
      try {
        await this.$store.dispatch('LogOut');
        this.$router.push({ name: '登陆' });
      } catch (e) {}
      // logout().then(res => {
      //   console.log(res);
      // });
    }
  }
};
</script>

<style lang="less" scoped>
.page-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #1d233c;
  z-index: 2000;
  // 覆盖
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
  position: relative;
  height: 65px;
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
    background: url('../../../assets/img/doc_arrow2@2x.png') no-repeat center
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
  position: absolute;
  top: 50%;
  right: 0;
  width: 14px;
  height: 18px;
  margin-top: -9px;
  background: url('../../../assets/img/msg@2x.png') no-repeat center center;
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
