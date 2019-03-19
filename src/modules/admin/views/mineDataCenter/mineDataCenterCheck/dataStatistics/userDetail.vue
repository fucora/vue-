<template>
  <div class="page-container">
    <div class="page-main-con">
      <con-header :titleIcon="titleIcon1" title="用户明细"></con-header>
      <div class="page-main-wrapper">
        <div class="details-table">
          <table class="table-detail" border="1" bordercolor="#ebeef5">
            <tbody>
              <tr v-for="(val, key) in tableLabel" :key="key">
                <td class="col-label">
                  <span>{{val}}</span>
                </td>
                <td class="col-content">
                  <span>{{tableData1[key]}}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="export">
          <!-- <el-button size="medium" type="primary">导出统计结果</el-button> -->
        </div>
        <!--profile属性列表-->
        <div class="table-wrapper">
          <el-table class="table" :data="tableData2" style="width: 100%">
            <el-table-column prop="uid" label="用户id" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="nickName" label="昵称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
            <el-table-column prop="mobile" label="手机号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="registerTime" label="注册时间" show-overflow-tooltip></el-table-column>
         </el-table>
        </div>
        <div class="myPagination">
          <el-pagination @current-change="handleCurrentChange" :page-size="pageSize" :current-page.sync="currentPage" layout="total, prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import conHeader from '@/components/awesome/con-header/con-header';
import API from '@/modules/index/api/dataCenter/dataCenter';
export default {
  components: {
    'con-header': conHeader
  },
  data() {
    return {
            // 分页
      currentPage: 1,
      total: 0,
      pageSize: 5,

      titleIcon1: '/static/img/title_05@2x.png',
      tableLabel: {
        uid: '开发组',
        applianceType: '品类',
        typeCode: 'SN8',
        province: '省',
        boundTime: '首次绑定时间'
      },
      tableData1: {},
      tableData2: [],
      status: ''
    };
  },
  methods: {
          // 改变currentPage
    handleCurrentChange(val) {
      // this.pageObj.pageNo = val;
      this.getUserDetail();
    },
    // 获取详情数据
    getUserDetail() {
      let id = this.$route.params.id;
      if (typeof id !== 'undefined') {
        let params = {
          id: id,
          curPage: this.currentPage || 1,
          pageSize: this.pageSize || 5
        };
        API.userlist(params).then(res => {
          console.log(res);
          if (res.code === 0 && res.result) {
            this.total = res.result ? res.result.totalPage : 0;

            this.status = res.result.status;
            this.tableData2 = res.result.property || [];
            this.tableData1 = res.result;
          } else {
            this.tableData1 = {};
            this.tableData2 = [];
            this.total = 0;
          }
        });
      }
    }
  },
  mounted() {
    this.$route.params;
    debugger;
    // this.getProfileDetail();
  }
};
</script>

<style lang="less" scoped>
// @import '../agreement.less';
.details-table{
  margin-top: 24px;
}
.export{
  width: 100%;
      margin: 10px 0px 24px;
    display: flex;
    justify-content: flex-end;
}
</style>
