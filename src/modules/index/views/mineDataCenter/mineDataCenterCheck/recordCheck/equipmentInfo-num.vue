<template>
   <div class="m-number-equipmentInfo-num" >
    <!-- 这里有两种显示方式 通过showFlag变量区分-->
     <div v-if="showFlag" v-loading="loading">
        <div v-show="applianList.length">
            <div v-for="(item, index) in applianList" :key="index"  class="mine-r-table">
                <div class="tip-one">
                {{'绑定设备' + (index + 1)}}
                </div>
                <div>
                <mine-table :info="item" :tabelParameter='appParameter'></mine-table>
                </div>
            </div>
        </div>
        <div v-show="!applianList.length">
          <p style="text-align: center">暂无数据</p>
        </div>
     </div>
     <div v-else>
        <div v-show="applianList.length">
          <div class="table-mip" v-loading="loading">
          <el-table :data="applianList" style="width: 100%"  class='table'>
            <el-table-column prop="applianCode" width="200" label="设备ID" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="applianSn" width="200" label="设备SN" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="productCode" width="200" label="设备条码" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="applianType" width="200" label="品类" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="modelNumber" width="200" label="型号码" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="activeStatusShow" width="200" label="绑定状态" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="注册时间" width="200" align="center"  show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{scope.row.registerTime | fomatDate('yyyy-MM-dd HH:mm')}}</div>
              </template>
            </el-table-column>
            <el-table-column label="绑定时间" align="center" width="200" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{scope.row.activeTime | fomatDate('yyyy-MM-dd HH:mm')}}</div>
              </template>
            </el-table-column>
             <el-table-column prop="applianPos"  label="绑定地点" width="200" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column prop="wifiVersion"  label="wifi版本号" width="200"  align="center" show-overflow-tooltip></el-table-column>
          </el-table>
            <!-- <mine-pagination
            @numberChange="numberChange"
            :total="total"
            :pageSizes="[10, 20, 30]"
            :page-size="pageSize"
            :current-page="currentPage"
            >
            </mine-pagination> -->
        </div>
        </div>
        <div v-show="!applianList.length">
          <p style="text-align: center">暂无数据</p>
        </div>
     </div>
   </div>
</template>
<script>
import mineTable from './mine-table';
// import minePagination from '@/modules/admin/components/mine-pagination';
import { format } from '@/modules/admin/api/system/common.js';
import API from '@/modules/index/api/dataCenter/dataCenter.js';
export default {
  components: {
    mineTable
    // minePagination
  },
  props: {
    flag: {
      type: Boolean
    },
    id: {
      type: [Number, String]
    },
    showFlag: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    flag: {
      handler: function(val, oldVal) {
        if (val === true) {
        //   debugger;
        this.applianList = [];
        this.getList();
        }
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      applianList: [],
      loading: false,
      appParameter: [
        { head: '设备ID', body: 'applianCode' },
        { head: '设备SN', body: 'applianSn' },
        { head: '设备条码', body: 'productCode' },
        { head: '品类', body: 'applianType' },
        { head: '型号码', body: 'modelNumber' },
        { head: '绑定状态', body: 'activeStatusShow' },
        { head: '注册时间', body: 'registerTime' },
        { head: '绑定时间', body: 'activeTime' },
        { head: '绑定地点', body: 'applianPos' },
        { head: 'wifi版本号', body: 'wifiVersion' }
      ]
    //   currentPage: 1,
    //   total: 0,
    //   pageSize: 10
    };
  },
  methods: {
    // numberChange (val) {
    //   switch (val.flag) {
    //     case 'pageSize':
    //       this.pageSize = val.pageSize;
    //       this.getList();
    //       break;
    //     case 'currentPage':
    //       this.currentPage = val.currentPage;
    //       this.getList();
    //       break;
    //     default:
    //       break;
    //   }
    // },
    getList () {
      this.loading = true;
      const params = {
        id: this.id
        // pageNo: this.currentPage,
        // pageSize: this.pageSize
      };
      API.getApplianList(params)
      .then(res => {
        this.loading = false;
        if (res.code === 0) {
        //   this.total = res.result ? res.result.total : 0;
          this.applianList = res.result ? this.initTableData(res.result) : [];
        } else {
          this.applianList = [];
        //   this.total = 0;
          this.$message({
            message: res.message,
            type: 'warning'
          });
        }
      })
      .catch((res) => {
          this.applianList = [];
        //   this.total = 0;
          this.loading = false;
          this.$message({
            message: res.message,
            type: 'error'
          });
      });
    },
    initTableData (val) {
      if (!val) return [];
      for (var i = 0; i < val.length; i++) {
        switch (val[i].activeStatus) {
            case 0:
              val[i]['activeStatusShow'] = '未激活';
            break;
            case 1:
              val[i]['activeStatusShow'] = '已激活';
            break;
            // case 3:
            //   val[i]['activeStatusShow'] = '禁止';
            // break;
        }
      }
      return val;
    }
  },
  filters: {
    fomatDate (val, type) {
      if (!val) return '';
      return format(val, type);
    }
  }
};
</script>
<style lang="less">
.el-dialog--center .el-dialog__body {
  overflow: scroll;
  max-height: 400px;  
  .m-number-equipmentInfo-num {
    .tip-one {
      text-align: center;
      line-height: 45px;
    }
    .mine-table-start-warp .column-th {
      padding-left: 5px !important;
      text-align: center;
    }
    .mine-table-start-warp .column {
      padding-left: 10px !important;
    }
  }
}
.mine-table-start-warp .details-table {
//   width: 49.8% !important;
}
</style>
