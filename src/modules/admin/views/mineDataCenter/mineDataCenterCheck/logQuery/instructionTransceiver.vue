<template>
  <div class="page-container">
    <div class="page-main-con">
      <con-header :titleIcon="titleIcon1" title="指令收发查询"></con-header>
      <div class="page-main-wrapper">
        <!--条件查询容器-->
        <div class="query-wrapper clearfix">
          <el-form class="query-form" ref="query-form" :rules="rules" label-width="80px" :model="queryFormData" :inline="true">
            <el-row>
              <el-col :span="8">
                <el-form-item label="设备ID" prop="deviceId">
                  <el-input v-model.trim="queryFormData.deviceId" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="设备SN" prop="sn">
                  <el-input v-model.trim="queryFormData.sn" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="指令类型">
                  <el-select v-model.trim="queryFormData.logTypeVal" clearable>
                    <el-option v-for="item  in logTypeValOpts" :key="item.id" :label="item.label" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
               <el-form-item label="时间">
                  <el-date-picker  :picker-options="pickerOptions"  v-model="dateTimeRange" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="handleChangeRange">
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
        <!--列表-->
        <div class="table-wrapper">
          <el-table  v-loading="loading" class="table" :data="dataList" style="width: 100%">
            <el-table-column prop="index" width="70" align="center" :render-header="renderIndex"></el-table-column>
            <el-table-column prop="deviceid" label="设备ID" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sn" label="设备SN" show-overflow-tooltip></el-table-column>
            <el-table-column label="类型" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.logtype==='LOGIN'">上线</span>
                <span v-if="scope.row.logtype==='LOGOUT'">下线</span>
                <span v-if="scope.row.logtype==='commandin'">接收</span>
                <span v-if="scope.row.logtype==='commandout'">下发</span>
              </template>
            </el-table-column>
            <el-table-column prop="msgtype" label="msgtype" show-overflow-tooltip></el-table-column>
            <el-table-column prop="msgtag" label="msgtag"  show-overflow-tooltip></el-table-column>
            <el-table-column prop="body" label="报文详情"  show-overflow-tooltip></el-table-column>
            <el-table-column prop="clientaddr" label="客户端IP"  show-overflow-tooltip></el-table-column>
            <!-- <el-table-column prop="cdate" label="端口" show-overflow-tooltip></el-table-column> -->
            <el-table-column prop="logtime" label="时间点" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
        <div class="myPagination">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import conHeader from '@/components/awesome/con-header/con-header';
import API from '@/modules/index/api/dataCenter/dataCenter';
import { format } from '@/modules/index/api/system/common.js';
import moment from 'moment';
import commonFun from '@/common/js/func';
import { logQueryMixin } from '@/common/js/validation';
export default {
  mixins: [logQueryMixin],
  components: {
    'con-header': conHeader
  },
  data() {
    return {
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
        sn: '',
        deviceId: '',
        logTypeVal: '',
        startTime: '',
        endTime: ''
      },
      rules: {
        sn: { required: true, validator: this.checkSn, trigger: 'blur' },
        deviceId: { required: true, validator: this.checkDeviceId, trigger: 'blur' }
      },
      logTypeValOpts: [
        {
        label: '所有',
        id: 0
       },
      {
        label: '接收',
        id: 3
       },
      {
        label: '下发',
        id: 4
       }
      ],
      dateTimeRange: [],
      dataList: [
        // {
        //   sn: '11',
        //   timestamp: '2018-12',
        //   errorCode: '333',
        //   env: {
        //     deviceId: '01',
        //     appVersion: '02',
        //     osType: 1,
        //     osVersion: '1.1.1',
        //     deviceType: '8s'
        //   }
        // }
      ]
      // luaFormRules: {
      //   sn: [{ required: true, message: 'sn不能为空', trigger: 'blur' }]
      // }
    };
  },
  created() {
    // this.getLogListData();
  },
  methods: {
    // 查询列表数据
    getLogListData(flag) {
      if (this.isGoToRequest()) {
        return;
      }
      if (flag) {
        this.currentPage = 1;
      }
      this.loading = true;
      let params = {
        category: 1,
        pageNo: this.currentPage || 1,
        pageSize: this.pageSize || 5,
        sn: this.queryFormData.sn,
        deviceId: this.queryFormData.deviceId,
        logTypeVal: this.queryFormData.logTypeVal,
        startTime: this.queryFormData.startTime
          ? format(this.queryFormData.startTime, 'yyyy-MM-dd HH:mm:ss')
          : '',
        endTime: this.queryFormData.endTime
          ? moment(this.queryFormData.endTime).format(
          'YYYY-MM-DD HH:mm:ss'
        )
          : ''
      };

      console.log(params);
      API.deviceSearch(params).then(res => {
        // debugger;
        this.loading = false;
        console.log(res);
        if (res.code === 0) {
          if (res.result.total !== 0 && res.result.data.length === 0) {
            this.getLogListData(true);
          }
          this.total = res.result ? res.result.total : 0;
          this.dataList = res.result ? this.initTableData(res.result.data) : [];
        } else {
          this.dataList = [];
          this.total = 0;
        }
      });
    },
        // 给请求回来的表格数据新增index属性（序号）
    initTableData(val) {
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
    if (!this.queryFormData.sn && !this.queryFormData.deviceId) {
         this.$message({
          type: 'info',
          message: '请输入设备SN或ID进行查询'
        });
        return;
      }
      if (!this.queryFormData.sn &&
      !this.queryFormData.deviceId &&
      this.queryFormData.logTypeVal === '' &&
       (!this.dateTimeRange || this.dateTimeRange.length === 0)) {
        debugger;
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
      // let date = new Date();
      // this.dateTimeRange = [val[0], date];

      this.queryFormData.startTime = val ? val[0] : '';
      this.queryFormData.endTime = val ? val[1] : '';
    },
      // 改变currentPage
    handleCurrentChange(val) {
      // this.pageObj.pageNo = val;
      this.getLogListData(false);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getLogListData(true);
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

