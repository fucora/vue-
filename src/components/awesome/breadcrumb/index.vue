<template>
  <div class="breadcrumb-wrapper" v-if="isHidden">
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index) in levelList" v-if="item.meta.title" :key="item.path">
          <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
          <router-link v-else :to="item.redirect||item.path">{{ item.meta.title }}</router-link>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      levelList: null,
      isHidden: true
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name);
      // 判断首页不需要面包屑
      if (this.$route.fullPath === '/product/myProducts/hardwareProducts/products') {
        // debugger;
        this.isHidden = false;
      } else {
        this.isHidden = true;
      }
      // 除去第一个面包屑
      matched.splice(0, 1);
      // matched = [{path: '/', meta: { title: '首页' }}].concat(matched);
      this.levelList = matched;
    }
  }
};
</script>

<style lang="less" scoped>
.breadcrumb-wrapper {
  width: 100%;
}
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
/*fade*/
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
