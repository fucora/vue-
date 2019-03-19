<template>
  <div id="app" v-on:click="myClick">
    admin
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldEle: ''
    };
  },
  watch: {
    '$route.path': function(n, o) {
      // debugger;
      this.$store.commit('setRouterPath', n);
    }
  },
  mounted() {
    // console.log('App');
    // window.onbeforeunload = function(params) {
    //   console.log(params, 'onbeforeunload');

    //   debugger;
    // };
  },
  methods: {
    myClick(e) {
      if (
        this.oldEle &&
        this.oldEle.children.length > 0 &&
        this.oldEle.children[0].innerHTML === e.target.innerHTML
      ) {
        this.oldEle.style.color = '#fff';
        this.oldEle.classList.add('is-active');
      }
      if (e.target.className === 'level-nav-item') {
        if (
          e.target.innerHTML === '我的产品' ||
          e.target.innerHTML === '开发指引' ||
          e.target.innerHTML === '下载中心'
        ) {
          this.findNodeChildren(
            document.querySelectorAll('.slide-menu .menu-wrapper')
          );
        }
      }
    },
    findNodeChildren(arr) {
      if (arr.length && arr.length > 0) {
        for (let index = 0; index < arr.length; index++) {
          const element = arr[index];
          if (element.children.length > 0) {
            this.findNodeChildren(element.children);
          }
          if (
            element.classList.contains('el-menu-item') &&
            element.classList.contains('is-active')
          ) {
            element.classList.remove('is-active');
            this.oldEle = element;
            element.style.color = '';
          }
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
#app {
  width: 100%;
}
</style>
