<template>
    <div class="sn-mine--warp">
        <div class="title-mip">
            <con-header :title-icon="addProductsIcon" title="用户信息查询" :hasBottomBorder="true"></con-header>
        </div>
        <!-- 查询部分 -->
        <div class="mip-check">
           <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline" label-width="80px" :rules="rules">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="email" prop="email">
                    <el-input v-model.trim="formInline.email" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
           </el-form>
           <div class="btn-select">
              <el-button type="primary" @click="checkSnList">筛 选</el-button>
              <el-button @click="clear">清 除</el-button>
           </div>
        </div>
        <!-- 表格部分 -->
        <div class="table-mip" v-loading="loading">
          <el-table :data="tableData" style="width: 100%"  class='table'>
            <el-table-column prop="index" width="50" align="center" :render-header="renderIndex"></el-table-column>
            <el-table-column prop="id"  label="用户id" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="appId" label="appId" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="email" label="email" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="nickName" label="昵称" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="注册时间" align="center" width="200" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{scope.row.registerTime | fomatDate('yyyy-MM-dd HH:mm')}}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="100">
              <template slot-scope="scope">
                  <span>
                    <el-button type="text" @click="enterBtton(scope.row.id)">绑定设备</el-button>
                  </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>

        <!-- <mine-pagination
        @numberChange="numberChange"
        :total="total"
        :pageSizes="[10, 20, 30]"
        :page-size="pageSize"
        :current-page="currentPage"
        >
        </mine-pagination> -->

        </div>

        <mine-dialog :dialogFormVisible='flag' :width='"80%"' :modalFlag="modalFlag" @close="close" :title="title" :showClose="showClose">
          <equipmentInfo-num slot="option" @close="close" :flag="flag" :id="equipmentInfoId"></equipmentInfo-num>
        </mine-dialog>

    </div>
</template>
<script>
import { restData, format } from '@/modules/admin/api/system/common.js';
import conHeader from '@/components/awesome/con-header/con-header';
import API from '@/modules/index/api/dataCenter/dataCenter.js';
// import minePagination from '@/modules/admin/components/mine-pagination';
import mineDialog from '@/modules/admin/components/mine-dialog';
import equipmentInfoNum from './equipmentInfo-num';
import { checkInfo } from '@/modules/index/views/mineDataCenter/mixin';
export default {
  components: {
    conHeader,
    // minePagination,
    mineDialog,
    equipmentInfoNum
  },
  mixins: [ checkInfo ],
  data () {
    return {
      // 控制弹框显影
      flag: false,
      // 是否显示按钮
      showClose: true,
      modalFlag: false,
      title: '绑定设备信息',
      rules: {
        email: [{ required: false, validator: this.checkEmailGet, trigger: 'change' }]
      },
      loading: false,
      addProductsIcon: '/static/img/title_05@2x.png',
      formInline: {
        email: ''
      },
      tableData: [],
      // currentPage: 1,
      // total: 0,
      // pageSize: 10,
      equipmentInfoId: ''
    };
  },
  methods: {
    close (val) {
      this.flag = val;
    },
    // numberChange (val) {
    //   switch (val.flag) {
    //     case 'pageSize':
    //       this.pageSize = val.pageSize;
    //       this.getList(true);
    //       break;
    //     case 'currentPage':
    //       this.currentPage = val.currentPage;
    //       this.getList(false);
    //       break;
    //     default:
    //       break;
    //   }
    // },
    renderIndex(h, { column, $index }) {
      return h('span', [h('span', '编号')]);
    },
    // 给请求回来的表格数据新增index属性（序号
    initTableData(val) {
      if (!val && !val.length) return [];
      for (var i = 0; i < val.length; i++) {
        // val[i].index = (this.currentPage - 1) * this.pageSize + i + 1;
        val[i].index = i + 1;
      }
      return val;
    },
    enterBtton (val) {
      this.flag = true;
      this.equipmentInfoId = val;
    },
    // 查询按钮
    checkSnList () {
      this.$refs['formInline'] &&
      this.$refs['formInline'].validate(valid => {
        if (!valid) {
          return;
        }
        if (!this.formInline.email) {
          this.$message({
            showClose: true,
            message: '请输入查询条件进行查询！',
            type: 'warning'
          });
          return;
        }
        this.getList(true);
      });
    },
    getList (flag) {
      if (flag) {
        this.currentPage = 1;
      }
      this.loading = true;
      const params = {
        ...this.formInline
        // pageNo: this.currentPage,
        // pageSize: this.pageSize
      };
      API.getSmartUserInfo(params)
      .then(res => {
        this.loading = false;
        if (res.code === 0) {
          // this.total = res.result ? res.result.total : 0;
          this.tableData = res.result ? this.initTableData(res.result) : [];
        } else {
          this.tableData = [];
          // this.total = 0;
        }
      })
      .catch(() => {
          this.tableData = [];
          // this.total = 0;
          this.loading = false;
      });
    },
    clear () {
      restData(this.formInline);
      this.tableData = [];
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

<style lang="less" scoped>
  .img-minepopover{
    width: 300px;
    height: 300px;
  }
#app {
  .el-button.el-button--text.is-disabled {
  color: #c0c4cc;
 }
}
.sn-mine--warp{
  .mip-check{
    margin-top: 24px;
    .is-required{
      .el-form-item__label:before{
        content: '' !important;
      }
    }
    .el-input{
      width: 230px;
    }
  }
  .fenye{
    text-align: right;
    margin-top: 16px;
   }

  .dialog-footer{
    text-align: right;
  }
  .btn-select{
    text-align: right;
  }
  .table-mip{
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid #DEDFE5;
    // td {
    //   span{
    //     padding: 0 2px;
    //     color: #5667FF;
    //   }
    //   span:hover{
    //     cursor: pointer;
    //     // color: #5667FF;
    //   }
    // }
  }
}
</style>