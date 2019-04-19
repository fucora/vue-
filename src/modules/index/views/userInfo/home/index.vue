<template>
  <div class="mine-home-list">
    <div style="">
      <el-tabs :tab-position="tabPosition" style="height: 630px;"  v-model="activeName" type="border-card">
        <el-tab-pane :label="item.label" v-for="(item, index) in tabList" :key="index" :name="item.component">
          <div style="min-height: 630px;">
            <component :is="item.component"></component>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>    
  </div>
</template>

<script>
// 用户信息组件
import componentA from './userInformation';
// 企业信息组件
import componentB from './enterpriseInformation';
// 我的消息组件
import componentC from './mineNews';
// 平台公告组件
import componentD from './platformBulletin';
// 常见问题组件
import componentE from './commonProblem';
export default {
  components: {
    'comA': componentA,
    'comB': componentB,
    'comC': componentC,
    'comD': componentD,
    'comE': componentE
  },
  data () {
    return {
      // activeName: 'comB',
      tabPosition: 'left',
      tabList: [
        {label: '用户信息', component: 'comA'},
        {label: '企业信息', component: 'comB'},
        {label: '我的消息', component: 'comC'},
        {label: '平台公告', component: 'comD'},
        {label: '常见问题', component: 'comE'}
      ]
    };
  },
  computed: {
    activeName: {
      get () {
        return this.$route.query.activeName;
      },
      set (val) {
        // debugger;
        // this.$route.query.activeName = val;
        // this.$emit('numberChange', {pageSize: val, flag: 'pageSize'});
      }
    }
  }
};
</script>

<style lang="less" >
 .mine-home-list {
  .el-tabs--left .el-tabs__header.is-left {
    width: 180px;
  }
  .el-tabs--left .el-tabs__item.is-left{
    text-align: center !important;
  }
  .el-tabs__nav-wrap.is-left {
    //  border: 1px solid !important;
  }
}
</style>