<template>
  <div class="page-wrapper center-wrapper">
      <div class="page-main">
        <div v-if="isShowLeft!=='/downloadCenter'" class="page-left-menu" style="width: 200px;">
          <side-bar :sideBarHieght="sideBarHieght" v-show="isShowLeft!=='/developGuideTop'"></side-bar>
        </div>
        <div id="pageRightHeigh" :class="['page-right-container']" ref="pageRight">
          <breadcrumb v-if="isShowLeft!=='/downloadCenter'" v-show="isShowLeft!=='/developGuideTop'"></breadcrumb>
          <transition name="fadePage" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
  </div>
</template>

<script>
import sideBar from '../awesome/Leftmenu/index';
import breadcrumb from '../awesome/breadcrumb/index';
export default {
  props: {
    isShowLeft: {
      type: String
    }

  },
  name: 'Layout',
  components: {
    'side-bar': sideBar,
    breadcrumb
  },
  data() {
    return {
      sideBarHieght: ''
    };
  },
  watch: {
    '$route.path': {
      handler: function(val, oldVal) {
          this.getSideBarHeight();
        },
        deep: true,
        immediate: false
      }

    // '$refs.pageRight.clientHeight': (oldVal, newVal) => {
    //   console.log(oldVal);
    //   console.log(oldVal);
    //   debugger;
    // }
  },
  methods: {
    getHeight() {
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
       return clientHeight - 97;
    },
    getSideBarHeight() {
    // debugger;
        this.$nextTick(() => {
          setTimeout(() => {
              let cur = '';
              let curHeight = '';
              let clientHeight = (document.documentElement.clientHeight || document.body.clientHeight) - 97;

            if (document.querySelector('#pageRightHeigh') && document.querySelector('#pageRightHeigh').children && document.querySelector('#pageRightHeigh').children.length > 1 && document.querySelector('#pageRightHeigh').children[1]) {
              cur = document.querySelector('#pageRightHeigh').children[1];
              //  curHeight = cur.offsetHeight > this.getHeight();
            } else {
             cur = document.querySelector('#pageRightHeigh');
              // curHeight = cur.offsetHeight > this.getHeight()?cur.offsetHeight:this.getHeight();
            }
            // if (this.$route.path.split('/')[1] === 'product ') {
              console.log(this.$route.path.split('/')[1]);
              // debugger;

            if (cur && this.$route.path.split('/')[1] === 'product') {
            curHeight = cur.offsetHeight > this.getHeight() ? cur.offsetHeight : this.getHeight();
            console.log(cur.offsetHeight > this.getHeight());
            console.log(this.getHeight());
            // debugger;
            console.log(curHeight);

            if (curHeight && curHeight > clientHeight) {
                this.sideBarHieght = curHeight + 40 + 'px';
              }
            if (curHeight <= clientHeight) {
                this.sideBarHieght = clientHeight + 'px';
              }
            }
            if (this.$route.path.split('/')[1] !== 'product') {
              this.sideBarHieght = clientHeight + 'px';
            }

            // debugger;
          }, 1000);
    });
    }
  },
  beofreUpdate() {
    debugger;
  },
  mounted() {
    this.getSideBarHeight();
    // console.log(this.$refs);
    // console.log(this.$refs.pageRight);
    // console.log(this.$refs.pageRight.clientHeight);
    // debugger;
    //     this.$nextTick(() => {
    //     let cur = document.querySelector('#pageRightHeigh');
    //     console.log(cur);
    //     let curHeight = cur.clientHeight;
    //     console.log(curHeight);
    //     debugger;
    // });
  }
};
</script>

<style lang="less" scoped>
  .page-wrapper {
    margin: 0 auto;
    padding-top: 65px;
    padding-bottom: 16px;
    position: relative;
  }
  .page-main {
    display: -webkit-flex;
    display: -moz-flex;
    display: flex;
    padding-top: 16px;
    box-sizing: border-box;
  }
  .page-right-container {
    width: 1080px;
    padding-left: 32px;
    box-sizing: border-box;
    margin: 0 auto;
  }
</style>
