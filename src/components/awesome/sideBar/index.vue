<template>
  <div class="side-wrapper" :style="{height: height}">
    <el-menu
      class="slide-menu"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#fbfbfb"
      text-color="#333"
      active-text-color="#fff"
      :default-openeds="openedsArr">
        <sidebar-item v-for="route in routes" :key="route.name" :item="route" :base-path="route.path"></sidebar-item>
      </el-menu>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem';
export default {
  data () {
    return {
      isCollapse: false,
      height: '803px',
      openedsArr: ['我的产品', '硬件产品', '我的协议']
    };
  },
  computed: {
    routes () {
      return this.$router.options.routes;
    }
  },
  methods: {
    getHeight () {
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      this.height = clientHeight - 97 + 'px';
    }
  },
  mounted () {
    this.getHeight();
    window.addEventListener('resize', () => {
      this.getHeight();
    }, false);
  },
  components: {
    'sidebar-item': SidebarItem
  }
};
</script>

<style lang="less" scoped>
@deep:~ '>>>';
  .side-wrapper {
    overflow-x: hidden;
    overflow-y: auto;
    .slide-menu {
      box-sizing: border-box;
      border-right: none;
      width: 200px;
      height: 100%;
      @{deep} .el-submenu{
        .el-submenu__title{
          font-size: 16px;
          color: #333333;
          span{
              font-weight: 700;
          }
          .el-submenu__icon-arrow{
            display: none;
          }
        }
      }
    }
  }
</style>
