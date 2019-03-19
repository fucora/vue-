<template>
  <div class="page-header">
    <div class="page-header-container center-wrapper clearfix">
      <a class="logo-wrapper pull-left" href="./index.html">
        <img class="logo" src="../../../assets/img/logo@2x.png" alt="图片不存在" width="43" height="29">
        <span>开发者中心</span>
      </a>
      <div class="page-nav pull-left">
        <div
          class="page-nav-item"
          :class="{'nav-active': navActive === pItem.name}"
          v-for="(pItem, index) in hNavData"
          :key="index"
          @click.stop="handleNavClick(pItem)">
          <span>{{pItem.name}}</span>
        </div>
      </div>
      <div class="user-info-wrapper pull-right">
        <div class="user-info-content" @click.stop="isShow = !isShow">
          <span class="user-info">早上好，张小白(开发者)</span>
          <span class="icon-down" :class="{rotate: isShow}"></span>
        </div>
        <span class="icon-bell"></span>
        <transition name="slideInfo">
          <div class="hide-user-info" v-show="isShow" @click.stop>
            <ul class="user-info-list">
              <li class="list-item">
                <a href="./developInfo.html">开发者信息</a>
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
import {logout} from '@/common/api/main';
export default {
  props: {
    active: {
      type: String,
      default: '我的产品'
    }
  },
  data () {
    return {
      isShow: false,
      hNavData: [
        {name: '我的产品', path: './myProducts.html'},
        {name: '开发指引', path: './developGuide.html'},
        {name: '下载中心', path: './downloadCenter.html'}
      ]
    };
  },
  computed: {
    navActive () {
      let {active} = this;
      return active;
    }
  },
  methods: {
    // 点击头部导航
    handleNavClick (pItem) {
      window.location.href = pItem.path;
    },

    // 退出登陆
    handleLogout () {
      logout().then(res => {
        console.log(res);
      });
    }
  },
  mounted () {
    let that = this;
    document.addEventListener('click', function () {
      that.isShow = false;
    }, false);
  }
};
</script>

<style lang="less" scoped>
  .page-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #1D233C;
    z-index: 999;
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
    padding: 18px 0;
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
      background: url('../../../assets/img/doc_arrow2@2x.png') no-repeat center center;
      background-size: cover;
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      transform: rotate(0deg);
      transition: transform .5s;
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
    background: #1D233C;
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
  .slideInfo-enter, .slideInfo-leave-to {
    opacity: 0;
  }
  .slideInfo-enter-active, .slideInfo-leave-active {
    transition: opacity .5s;
  }

  .page-nav {
    .page-nav-item {
      display: inline-block;
      padding: 0 28px;
      line-height: 65px;
      font-size: 16px;
      color: #fff;
      cursor: pointer;
      transition: all .3s;

      span {
        opacity: 0.7;
        transition: all .3s;
      }
    }
  }
  .page-nav-item.nav-active {
    background: rgba(255, 255, 255, .1);
    border-radius: 1px;
    span {
      opacity: 1;
    }
  }
</style>
