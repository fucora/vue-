<template>
  <div class="side-wrapper" :style="{height: height}">
    <el-menu class="slide-menu" :default-active="defaultActive" :collapse="isCollapse" mode="vertical" background-color="#fbfbfb" text-color="#333" active-text-color="#fff" :default-openeds="openedsArr">
      <sidebar-item v-for="route in menus" :key="route.name" :item="route" :base-path="rootPath + '/' + route.path"></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
import _ from 'lodash';
import SidebarItem from './SidebarItem';
import { mapGetters } from 'vuex';
import ls from '@/utils/storage/local_storage';
export default {
  data() {
    return {
      isCollapse: false,
      height: '803px',
      rootPath: '',
      menus: [],
      openedsArr: ['产品', '我的产品', '硬件产品', '我的协议', '日志查询', 'license管理', '数据中心', '数据查询', '数据统计', '工具箱'],
      defaultActive: '/product/myAgreement/elecManagement',
      urlArrTemp: []
    };
  },
  // computed: {
  //   routes () {
  //     console.log(this.$router.history.current.path);
  //     let path = this.getRootPath(this.$router.history.current.path);
  //     let menus = this.getSecondPath(this.$router.options.routes, path);
  //     return menus;
  //     // return this.$router.options.routes;
  //   }
  // },
  props: {
    sideBarHieght: {
      type: String
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  watch: {
    '$route.path': function() {
      this.getMenus();
    },
    roles: function() {
      this.getMenus();
    },
  'sideBarHieght': {
      handler: function(val, oldVal) {
          // this.getSideBarHeight();
          // debugger;
          this.height = val;
        },
        deep: true,
        immediate: true
    }
  },
  methods: {
    getHeight() {
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      this.height = clientHeight - 97 + 'px';
    },

    // 获取当前路由根路径
    getRootPath(url) {
      let urlArr = url.split('/');
      this.urlArrTemp = urlArr;
      if (urlArr.length) {
        this.rootPath = '/' + urlArr[1];
      }
      return this.rootPath;
    },

    // 获取根路由的二级路由
    getSecondPath(routes, path) {
      if (!routes) return;
      let results = [];
      routes.forEach(item => {
        if (item.path === path) {
          results = _.cloneDeep(item.children);
        }
      });
      return results;
    },
    getMeunsArr(arr, isAuthHidden) {
      if (arr.length > 0) {
        let meArr = [];
// 开发者显示菜单：我的产品  我的协议 数据中心
// 对接人显示菜单：license管理
        arr.forEach((item) => {
          // if (!isAuthHidden.isDeveloper && !isAuthHidden.isContacter) {
          if (isAuthHidden.isDeveloper) {
            if (item.path === 'licenseManagement') {
              item.hidden = true;
            }
          }
          if (isAuthHidden.isContacter) {
            if (item.path === 'myProducts' || item.path === 'myAgreement' || item.path === 'dataCenter' || item.path === 'environment') {
              item.hidden = true;
            }
          }
          // 未验证
          if (!isAuthHidden.isMipAuth && !isAuthHidden.isContacter) {
            if (item.path === 'myProducts' || item.path === 'myAgreement' || item.path === 'dataCenter' || item.path === 'licenseManagement' || item.path === 'environment') {
              item.hidden = true;
            }
          }
          if (isAuthHidden.isMipAuth && isAuthHidden.isContacter) {
            if (item.path === 'myAgreement' || item.path === 'dataCenter' || item.path === 'licenseManagement' || item.path === 'environment') {
              item.hidden = false;
            }
          }
        // }
          meArr.push(item);
        });
        return meArr;
      }
    },
    // 获取侧边栏菜单
    getMenus() {
      let path = this.getRootPath(this.$router.history.current.path);
      debugger;
      let isAuthHidden = '';
      // debugger;
      // if (this.$store.getters.userInfo.property) {
      //   isAuthHidden = this.$store.getters.userInfo.property ? this.$store.getters.userInfo.property : ls.getObject('userInfo').property;
      // }
      let tempUserInfo = this.$store.getters.userInfo;
      let lsUserInfo = JSON.parse(ls.getItem('userInfo'));
      // debugger;
      if (
        (tempUserInfo && tempUserInfo.property) ||
        (lsUserInfo && lsUserInfo.property)
      ) {
        isAuthHidden = tempUserInfo.property || lsUserInfo.property;
        // debugger;
      }
      console.log(isAuthHidden);

      // if (path === '/product') {
      //   this.menus = this.getSecondPath(this.$store.getters.roles.length ? this.$store.getters.roles : ls.getObject('roles'), path);
      //   // debugger;
      //   this.$router.push({path: this.urlArrTemp.join('/')});
      //   this.defaultActive = this.urlArrTemp.join('/');
      // } else {
      //   this.menus = this.getSecondPath(this.$router.options.routes, path);
      //   // debugger;
      //   this.$router.push({path: this.urlArrTemp.join('/')});
      //   this.defaultActive = this.urlArrTemp.join('/');
      // }
        // this.menus = this.getSecondPath(this.$router.options.routes, path);

        // this.menus = this.getMeunsArr(this.getSecondPath(this.$router.options.routes, path), isAuthHidden);
        // this.menus = this.getSecondPath(this.$router.options.routes, path);
        this.menus = this.getSecondPath(this.$router.options.routes, path);

        // console.log(this.getSecondPath(this.$router.options.routes, path));
        // console.log(this.menus, 'getMeunsArr');
        // debugger;
        this.$router.push({path: this.urlArrTemp.join('/')});
        this.defaultActive = this.urlArrTemp.join('/');
    }
  },
  mounted() {
    // debugger;
    this.getMenus();
    this.getHeight();
    window.addEventListener(
      'resize',
      () => {
        this.getHeight();
      },
      false
    );
  },
  components: {
    'sidebar-item': SidebarItem
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';
.side-wrapper {
  overflow-x: hidden;
  overflow-y: auto;
  .slide-menu {
    box-sizing: border-box;
    border-right: none;
    width: 200px;
    height: 100%;
    @{deep} .el-submenu {
      .el-submenu__title {
        font-size: 16px;
        color: #333333;
        span {
          font-weight: 700;
        }
        .el-submenu__icon-arrow {
          // display: none;
        }
      }
    }
   @{deep} .el-menu.el-menu--inline{
     .el-menu-item {
       span{
         display: inline-block;
         width: 100%;
       }
     }
   }
  }
}
</style>
