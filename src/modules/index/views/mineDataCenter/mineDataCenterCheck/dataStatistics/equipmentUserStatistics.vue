<template>
  <div class="page-container">
    <div class="page-main-con">
      <con-header :titleIcon="titleIcon1" title="产品数据统计"></con-header>
      <div class="page-main-wrapper">
        <!--条件查询容器-->
        <div class="query-wrapper clearfix">
          <el-form class="query-form" ref="query-form" label-width="60px"  :model="queryFormData" :inline="true">
            <el-row>
              <el-col :span="8">
                <el-form-item label="开发组">
                  <el-input disabled v-model.trim="queryFormData.groupId" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="品类">
                  <el-select filterable v-model.trim="queryFormData.applianceType" clearable>
                    <el-option v-for="item  in applianceTypeList" :key="item.id" :label="item.nameZh" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
               <el-form-item label="时间">
                  <el-date-picker :picker-options="pickerOptions" v-model="dateTimeRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="handleChangeRange">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="8">
                <el-form-item label="型号码">
                  <el-select v-model="typeCode" multiple clearable>
                    <el-option v-for="item  in sn8Opts" :key="item.id" :label="item.sn8" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col> -->
            </el-row>
            <el-row>
              <!-- <el-col :span="8">
               <el-form-item label="时间">
                  <el-date-picker v-model="dateTimeRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="handleChangeRange">
                  </el-date-picker>
                </el-form-item>
              </el-col> -->
              <el-col :span="8">
                <el-form-item label="省">
                  <el-select filterable placeholder="全部" @change="provincesChange" v-model.trim="queryFormData.provinces" clearable>
                    <el-option v-for="item  in provincesList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="市">
                  <el-select filterable placeholder="全部" v-model.trim="queryFormData.cities" clearable>
                    <el-option v-for="item  in citiesList" :key="item.id" :label="item.cityName" :value="item.id">
                    </el-option>
                  </el-select>
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
          <el-table v-loading="loading" class="table" :data="dataList" style="width: 100%">
            <el-table-column prop="date" label="日期" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column prop="newUsers" label="新增用户（人）" show-overflow-tooltip></el-table-column> -->
            <el-table-column prop="networkedDevices" label="联网总数" show-overflow-tooltip></el-table-column>
            <el-table-column prop="newNetworkedDevices" label="新增联网" show-overflow-tooltip></el-table-column>
            <el-table-column prop="newActives" label="新增激活"  show-overflow-tooltip></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <!-- <el-button type="text" size="small" @click="goUserlist(scope.row)">用户明细</el-button> -->
                <el-button  type="text" size="small" @click="goDevicelist(scope.row)">设备明细</el-button>
              </template>
            </el-table-column>
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
import commonFun from '@/common/js/func';
import moment from 'moment';
import { dropDownTranslation } from '@/common/js/dropDownTranslation';
export default {
  mixins: [dropDownTranslation],
  components: {
    'con-header': conHeader
  },
  data() {
    return {
      pickerOptions: {
        disabledDate (time) {
            let curDate = (new Date()).getTime();
            let three = 365 * 24 * 3600 * 1000;
            let threeMonths = curDate - three;
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return time.getTime() > Date.now() || time.getTime() < threeMonths;
        }
      },
      // provincesList: [], // 省
      // citiesList: [], // 市
      // applianceTypeList: [], // 品类
      // typeCodeList: [], // 型号码

      // 分页
      currentPage: 1,
      total: 0,
      pageSize: 10,
      loading: false,
      titleIcon1: '/static/img/title_07@2x.png',
      //  typeCode: [],
      queryFormData: {
        // 000000311220119898B1503600860000
        groupId: '',
        applianceType: '',

        provinces: '',
        cities: '',

        startTime: '',
        endTime: ''
      },
      dateTimeRange: [],
      dataList: [
      ]
    };
  },
  created() {
    // 加载下来
    // this.getLogListData();
    this.initData();
  },
  methods: {
    initData() {
      // this.getApplianSelect();// 品类
      this.getQueryinfo();// 查询的下拉信息
    },
    provincesChange(val) {
      this.queryFormData.cities = '';
      if (val) {
      this.getQuerycity(val);
      }
    },
    // 设备明细
    goDevicelist(val) {
      //  query: {applianceType: this.queryFormData.applianceType, provinces: this.queryFormData.provinces, cities: this.queryFormData.cities},
      this.$router.push(
        {name: '设备明细',
       params: {groupId: this.userInfo.departMentId, endTime: val.date}});
    },
    // 用户明细
    // goUserlist(val) {
    //   this.$router.push({name: '用户明细', query: {id: val}});
    // },

    // 查询Lua协议列表数据
    getStatisticsListData(flag) {
      console.log(format(this.dateTimeRange, 'yyyy-MM-dd'));
      // if (this.isGoToRequest()) {
      //   return;
      // }
      if (flag) {
        this.currentPage = 1;
      }
      this.loading = true;
      let params = {
        groupId: Number(this.userInfo.departMentId),
        applianceType: commonFun.fetchWord(
          this.queryFormData.applianceType,
          'id',
          this.applianceTypeList,
          'type'
        ) ? [commonFun.fetchWord(
          this.queryFormData.applianceType,
          'id',
          this.applianceTypeList,
          'type'
        )] : ['0'],
        // typeCode: this.typeCode,
        provinces: this.queryFormData.provinces ? [this.queryFormData.provinces] : [0],
        cities: this.queryFormData.cities ? [this.queryFormData.cities] : [0],

        curPage: this.currentPage || 1,
        pageSize: this.pageSize || 5,
        // lastPage: 0,
        startTime: this.queryFormData.startTime
          ? format(this.queryFormData.startTime, 'yyyy-MM-dd')
          : '',
        endTime: this.queryFormData.endTime
          ? moment(this.queryFormData.endTime).format(
          'YYYY-MM-DD'
        )
          : ''
      };
      //   let e = new Date(params.endTime).getDate();
      // let s = new Date(params.startTime).getDate();
      // let totalPage = e - s + 1;
      // let lastPage = Math.ceil(totalPage / this.pageSize);
      // let lastPageSize = totalPage % this.pageSize;
      // // debugger;
      // if (lastPageSize !== 0 && totalPage !== 0) {
      //   if (lastPage === params.curPage) {
      //     params.pageSize = lastPageSize;
      //   }
      // }

      API.statistics(params).then(res => {
        console.log(res);
        this.loading = false;
        if (res.code === 0) {
      let query = {
      applianceTypeId: this.queryFormData.applianceType,
      applianceType: commonFun.fetchWord(
          this.queryFormData.applianceType,
          'id',
          this.applianceTypeList,
          'nameZh'
        ),
        applianceTypeType: commonFun.fetchWord(
          this.queryFormData.applianceType,
          'id',
          this.applianceTypeList,
          'type'
        ),
       provincesId: this.queryFormData.provinces,
       provinces: commonFun.fetchWord(
          this.queryFormData.provinces,
          'id',
          this.provincesList,
          'name'
        ),
       citiesId: this.queryFormData.cities,
       cities: commonFun.fetchWord(
          this.queryFormData.cities,
          'id',
          this.citiesList,
          'cityName'
        ),
        groupId: Number(this.userInfo.departMentId),
        groupIddepartMentName: this.userInfo.departMentName
       };
      this.$store.commit('equipmentUserStatisticsList', query);
          // this.dataList = res.result.data || [];
          // this.pageObj.total = res.result.total;
          this.total = res.result.totalCount ? res.result.totalCount : 0;
          // this.dataList = res.result ? res.result : [];
             this.dataList = res.result.data ? res.result.data : [];
          // this.dataList = res.result ? this.initTableData(res.result.data) : [];
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
      if (!this.dateTimeRange || this.dateTimeRange.length === 0) {
        this.$message({
          type: 'info',
          message: '请输入查询时间段'
        });
      } else {
      this.getStatisticsListData(true);
      }
    },
    clear() {
      commonFun.restData(this.queryFormData);
      this.dateTimeRange = [];
      this.dataList = [];
      this.citiesList = [];
      this.total = 0;
      this.getQueryinfo();// 查询的下拉信息
    },
        // 选择更新时间
    handleChangeRange(val) {
      this.queryFormData.startTime = val ? val[0] : '';
      this.queryFormData.endTime = val ? val[1] : '';
      console.log(this.queryFormData);
    },
      // 改变currentPage
    handleCurrentChange(val) {
      // debugger;
      // this.pageObj.pageNo = val;
      this.getStatisticsListData(false);
    },
    handleSizeChange (val) {
      this.pageSize = val;
      this.getStatisticsListData(true);
    }
  }
};
</script>

<style lang="less" scoped>
@import './../logQuery/logQuery.less';

</style>

