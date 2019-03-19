<template>
  <div class="page-container">
    <div class="page-main-con">
      <con-header :titleIcon="titleIcon1" title="配网失败日志查询"></con-header>
      <div class="page-main-wrapper">
        <!--条件查询容器-->
        <div class="query-wrapper clearfix">
          <el-form class="query-form" ref="query-form" label-width="70px" :rules="rules" :model="queryFormData" :inline="true">
            <el-row>
              <el-col :span="12">
                <el-form-item label="设备SN" prop="sn">
                  <el-input v-model.trim="queryFormData.sn" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
               <el-form-item label="时间">
                  <el-date-picker  :picker-options="pickerOptions" v-model="dateTimeRange" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="handleChangeRange">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="show-line">
              <el-col :span="24">
                 <el-button class="pull-right query-btn" size="medium" @click="clear">清除</el-button>
                 <el-button class="pull-right query-btn" type="primary" size="medium" @click="handleQuery">查询</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="sdk-log">SDK日志</div>
        <!--列表-->
        <div class="table-wrapper">
          <el-table class="table" v-loading="loading" :data="dataList" style="width: 100%">
            <el-table-column prop="index" width="70" align="center" :render-header="renderIndex"></el-table-column>
            <!-- <el-table-column prop="env.deviceId" label="设备ID" show-overflow-tooltip></el-table-column> -->
            <el-table-column prop="extra.deviceID" label="设备ID" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sn" label="SN" show-overflow-tooltip></el-table-column>
            <el-table-column prop="timestamp" label="上报时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="errorCode" label="错误码" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作系统" show-overflow-tooltip>
              <template slot-scope="scope" v-if="scope.row.env">
                <span v-if="scope.row.env.osType===0">未知</span>
                <span v-if="scope.row.env.osType===1">ios</span>
                <span v-if="scope.row.env.osType===2">android</span>
              </template>
            </el-table-column>
            <el-table-column prop="env.osVersion" label="系统版本"  show-overflow-tooltip></el-table-column>
            <el-table-column prop="env.appVersion" label="APP版本" show-overflow-tooltip></el-table-column>
            <el-table-column prop="env.deviceType" label="手机品牌" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
        <div class="myPagination">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
        <div>
          <a href="index.html">index跳转</a>
          <!-- <router-link to="admin.html">跳转</router-link> -->
          <el-button @click="adminclick">admin ti </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import conHeader from '@/components/awesome/con-header/con-header';
import API from '@/modules/index/api/dataCenter/dataCenter';
import { format } from '@/modules/index/api/system/common.js';
import commonFun from '@/common/js/func';
import { logQueryMixin } from '@/common/js/validation';
import moment from 'moment';
export default {
  mixins: [logQueryMixin],
  components: {
    'con-header': conHeader
  },
  data() {
    return {
      defaultTime: [],
      pickerOptions: {
        disabledDate (time) {
            let curDate = (new Date()).getTime();
            let three = 7 * 24 * 3600 * 1000;
            let threeMonths = curDate - three;
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return time.getTime() > Date.now() || time.getTime() < threeMonths;
        }
      },
      // 分页
      currentPage: 1,
      total: 0,
      pageSize: 10,
      loading: false,

      titleIcon1: '/static/img/title_07@2x.png',
      queryFormData: {
        // 000000311220119898B1503600860000
        sn: '',
        startTime: '',
        endTime: ''
      },
      rules: {
        sn: { required: true, validator: this.checkSn, trigger: 'blur' }
      },
      dateTimeRange: [],
      dataList: [
      ]
    };
  },
  created() {
    // this.getLogListData();
  },
  mounted() {
    // this.defaultTime = ['', '12:11:00'];
  },
  methods: {
    adminclick() {
      debugger;
      this.$router.push({name: '用户信息查询'});
    },
    // 查询Lua协议列表数据
    getLogListData(flag) {
      this.queryFormData.endTime;
      this.queryFormData.startTime;
      // debugger;
      this.loading = true;
      if (this.isGoToRequest()) {
        return;
      }
      if (flag) {
        this.currentPage = 1;
      }
      // debugger;
      console.log(format(this.dateTimeRange, 'yyyy-MM-dd'));

      let params = {
        pageNo: this.currentPage || 1,
        pageSize: this.pageSize || 5,
        startTime: this.queryFormData.startTime
          ? format(this.queryFormData.startTime, 'yyyy-MM-dd HH:mm:ss')
          : '',
        sn: this.queryFormData.sn,
        endTime: this.queryFormData.endTime
          ? moment(this.queryFormData.endTime).format(
          'YYYY-MM-DD HH:mm:ss'
        )
          : ''
      };
      console.log(params);
      API.mouduleNetSearch(params).then(res => {
        debugger;
        console.log(res);
        this.loading = false;
        if (res.code === 0) {
          if (res.result.total !== 0 && res.result.data.length === 0) {
            this.getLogListData(true);
          }
          // this.dataList = res.result.data || [];
          // this.pageObj.total = res.result.total;
          this.total = res.result ? res.result.total : 0;
          this.dataList = res.result ? this.initTableData(res.result.data) : [];
           console.log(this.dataList);

          // debugger;
        } else {
          this.dataList = [];
          this.total = 0;
        }
      });
    },
        // 给请求回来的表格数据新增index属性（序号）
    initTableData(val) {
      debugger;
      if (!val && !val.length) return [];
      for (var i = 0; i < val.length; i++) {
        val[i].index = (this.currentPage - 1) * this.pageSize + i + 1;
      }
      return val;
    },
    renderIndex(h, { column, $index }) {
      return h('span', [h('span', 'ID')]);
    },
    handleQuery() {
      if (!commonFun.doSubmit('query-form', this)) return;
      if (!this.queryFormData.sn) {
         this.$message({
          type: 'info',
          message: '请输入设备SN进行查询'
        });
        return;
      }
      if (!this.queryFormData.sn && (!this.dateTimeRange || this.dateTimeRange.length === 0)) {
        // debugger;
        this.$message({
          type: 'info',
          message: '至少输入一个查询条件'
        });
      } else {
        this.getLogListData(true);
      }
      // this.getLogListData();
    },
    clear() {
      commonFun.restData(this.queryFormData);
      this.dateTimeRange = [];
      this.dataList = [];
      this.total = 0;
    },
        // 选择更新时间
    handleChangeRange(val) {
      // console.log(val);
      // let date = new Date();
      //  console.log(date.getTime());
      // console.log(date.getHours());
      // this.dateTimeRange = [val[0], date];
      // let hour = this.halder(date.getHours());

      // let minute = this.halder(date.getMinutes());
      // let second = this.halder(date.getSeconds());
      // console.log(hour + ':' + minute + ':' + second);
      // this.defaultTime = ['', `${hour}:${minute}:${second}`];
      // debugger;
      // if (val) {
        this.queryFormData.startTime = val ? val[0] : '';
      // this.queryFormData.endTime = val ? date : '';
      this.queryFormData.endTime = val ? val[1] : '';
      // }

      // console.log(this.queryFormData);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getLogListData(true);
    },
      // 改变currentPage
    handleCurrentChange(val) {
      // this.pageObj.pageNo = val;
      this.getLogListData(false);
    }
  }
};
</script>

<style lang="less" scoped>
@import './logQuery.less';
@deep: ~'>>>';
  @{deep} .el-date-editor--daterange{
  width: auto!important;
}
</style>

