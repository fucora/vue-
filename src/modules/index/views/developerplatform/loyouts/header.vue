<template>
  <div class="header-content" :style="headerStyle">
    <div class="header-fix center-wrapper container">
      <div class="header-log"><img src="./../../../../../assets/img/Combined Shape@2x.png" alt="logo"><span>开发者平台</span></div>
      <div style="display: flex;">
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#212330" text-color="#fff" active-text-color="#fff">
          <el-menu-item index="home">首页</el-menu-item>
          <!-- <el-menu-item index="api">平台接口</el-menu-item> -->
          <el-menu-item index="developGuide">开发指引</el-menu-item>
        </el-menu>
        <div class="btn-content" v-if="!mobile||!getToken">
          <el-button type="primary" style="backgroundColor:transparent" class="register" @click="register">注册</el-button>
          <el-button type="primary" class="land" @click="land">登录</el-button>
        </div>
        <div v-else class="myInfo-wrapper" @mouseleave="isShow = false">
          <div class="user-info-content" @click.stop="isShow = !isShow">
            <span v-if="nickName">
              <span class="user-info">{{nickName}}</span>
              <span class="user-info" v-if="roleName">({{roleName}})</span>
            </span>
            <span v-else>
              <span class="user-info">{{mobile}}</span>
              <span class="user-info" v-if="roleName">({{roleName}})</span>
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
    <!-- <slot name="platformText"></slot> -->
  </div>
</template>

<script>
import ls from '@/utils/storage/local_storage';
import { getToken } from '@/utils/auth'; // 验权
export default {
  props: {
    headerStyle: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    '$store.getters.saveGetUserInfo': {
      handler: function(val, oldVal) {
        this.handleName();
      },
      deep: true,
      immediate: true
    }
  },
  name: 'Header',
  data() {
    return {
      getToken: getToken(),
      isShow: false,
      nickName: '', // 昵称
      roleName: '', // 角色
      mobile: '',
      activeIndex2: 'home'
    };
  },
  methods: {
    // 退出登陆
    async handleLogout() {
      try {
        await this.$store.dispatch('LogOut').then(result => {
          // debugger;
          this.$router.push({ name: '登陆' });
        });
      } catch (e) {}
      // logout().then(res => {
      //   console.log(res);
      // });
    },
    handleName() {
      let tempUserInfo = this.$store.getters.saveGetUserInfo;
      let lsUserInfo = JSON.parse(ls.getItem('saveGetUserInfo'));
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
    // 跳转开发者信息
    goToInfo() {
      this.$router.push({ path: '/info' });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key === 'api') {
        this.$router.push({ name: '产品' });
      } else if (key === 'developGuide') {
        this.$router.push({ name: '开发指引' });
      } else if (key === 'home') {
        this.$router.push({ name: 'home' });
      }
    },
    register() {
      // window.location.href = './system.html';
      this.$router.push({ name: 'Register' });
    },
    land() {
      this.$router.push({ name: '登陆' });
      // window.location.href = './login.html';
    }
  }
};
</script>
<style lang="less" scoped>
// @media screen and (min-width: 980px){
//   .container {
//       max-width: 1220px;
//       margin: 0 auto;
//   }
// }
@media screen and (min-width: 1180px) {
  .container {
    margin: 0 auto;
  }
}
.land {
  background-color: transparent;
  // opacity: 0.4;
  border-color: #999;
}

.header-log {
  // margin-left: 164px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img {
    width: 43px;
    height: 29px;
    display: inline-block;
    margin-right: 16px;
    vertical-align: middle;
  }
  span {
    font-size: 18px;
    color: #ffffff;
    // padding-left: 10px;
  }
}
.header-fix {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.header-content {
  background-color: rgba(0, 0, 0, 0.2);
  // background-color: #1D233C;
}
.el-menu-demo {
  background-color: transparent !important;
  .el-menu-item {
    background-color: transparent !important;
  }
}
.el-menu--horizontal {
  border-bottom: solid 1px transparent;
}
.btn-content {
  height: 60px;
  align-items: center;
  display: flex;
  margin-left: 20px;
}
.el-menu-demo {
  display: flex;
  justify-content: flex-end;
  // padding-right: 150px;
  // background-color:rgb(12, 17, 35)!important;
}
.el-menu--horizontal > .el-menu-item {
  margin: 0px 20px;
  padding: 0 4px;
  font-size: 16px;
  height: 64px;
  line-height: 64px;
}
.el-button {
  border-radius: 0px;
}

.myInfo-wrapper {
  position: relative;
  height: 65px;
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
      background: url('../../../../../assets/img/doc_arrow2@2x.png') no-repeat
        center center;
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
    background: url('../../../../../assets/img/msg@2x.png') no-repeat center
      center;
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
    // background: rgba(255, 255, 255, 0.1);
    border-radius: 1px;
    span {
      opacity: 1;
    }
  }
}
</style>
