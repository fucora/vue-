<template>
    <div class="sn-mine--warp">
        <div class="title-mip">
            <con-header :title-icon="addProductsIcon" title="账户管理" :hasBottomBorder="true"></con-header>
        </div>
        <!-- 查询部分 -->
        <div class="mip-check">
           <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline" label-width="80px" :rules="rules">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="email" prop="sn">
                    <el-input v-model.trim="formInline.sn" clearable></el-input>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="12">
                  <el-form-item label="所属人手机号" prop="mobile">
                    <el-input v-model.trim="formInline.mobile" clearable></el-input>
                  </el-form-item>
                </el-col> -->
              </el-row>
           </el-form>
           <div class="btn-select"  v-authority="'b1_snListTarge'">
              <el-button type="primary" @click="checkSnList">筛 选</el-button>
              <el-button @click="clear">清 除</el-button>
           </div>
        </div>
        <!-- 表格部分 -->
        <div class="table-mip" v-loading="loading">
          <div style="margin-bottom: 10px;text-align: right;">
            <el-button type="primary" @click="addAccount">新增账户</el-button>
          </div>
          <el-table :data="tableData" style="width: 100%"  class='table'>
            <el-table-column prop="index" width="50" align="center" :render-header="renderIndex"></el-table-column>
            <el-table-column prop="sn" label="SN" align="center"></el-table-column>
            <el-table-column prop="mobile" label="所属人手机号" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="departmentName" label="开发者所在组" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="提交时间" align="center" width="150" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{scope.row.createTime | fomatDate('yyyy-MM-dd HH:mm')}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="auditUid" label="审批人" align="center" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column prop="id" label="id" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="email" label="email" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="新增时间" align="center" width="150" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{scope.row.createTime | fomatDate('yyyy-MM-dd HH:mm')}}</div>
              </template>
            </el-table-column> -->
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                  <span v-authority="'b1_snEnabledTag'">
                    <el-button type="text" @click="enterBtton(scope.row.id, 0)" :disabled="scope.row.status === 1">启用</el-button>
                    <!-- <el-button type="text" @click="enterBtton(scope.row.id, 0)" :disabled="scope.row.status === 0">启用</el-button> -->
                  </span>
                  <span style="color: #DEDFE5;">|</span>
                  <span v-authority="'b1_snProhibitTag'">
                    <el-button type="text" @click="enterBtton(scope.row.id, 1)" :disabled="scope.row.status === 0">禁用</el-button>
                    <!-- <el-button type="text" @click="enterBtton(scope.row.id, 1)" :disabled="scope.row.status === 1">禁用</el-button> -->
                  </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>

        <mine-pagination
        @numberChange="numberChange"
        :total="total"
        :pageSizes="[10, 20, 30]"
        :page-size="pageSize"
        :current-page="currentPage"
        >
        </mine-pagination>

        </div>

        <mine-dialog :dialogFormVisible='flag' :width='"40%"' :modalFlag="modalFlag" @close="close" :title="title" :showClose="showClose">
          <add-account slot="option" @close="close" :flag="flag"></add-account>
        </mine-dialog>

    </div>
</template>
<script>
import { restData, format } from '@/modules/admin/api/system/common.js';
import conHeader from '@/components/awesome/con-header/con-header';
import API from '@/modules/admin/api/backgroundAccountManagement/index.js';
import minePagination from '@/modules/admin/components/mine-pagination';
import mineDialog from '@/modules/admin/components/mine-dialog';
import addAccount from './add-accout';
import { backgroundAccountManagement } from '../mixin';
export default {
  components: {
    conHeader,
    minePagination,
    mineDialog,
    addAccount
  },
  mixins: [ backgroundAccountManagement ],
  data () {
    return {
      // 控制弹框显影
      flag: false,
      // 是否显示按钮
      showClose: true,
      modalFlag: false,
      title: '',
      rules: {
        sn: [{ required: false, validator: this.checkEmailGet, trigger: 'change' }]
      },
      loading: false,
      addProductsIcon: '/static/img/title_05@2x.png',
      formInline: {
        mobile: '',
        sn: ''
      },
      tableData: [
        {index: 1, status: 0, sn: '111111223242432', mobile: '1383838924', departmentName: '中央研究院', createTime: '2019-10-24 14:54', auditUid: 'lll'},
        {index: 2, status: 1, sn: '111111223242432', mobile: '1383838924', departmentName: '中央研究院', createTime: '2019-10-24 14:54', auditUid: 'lll'}
      ],
      currentPage: 1,
      total: 0,
      pageSize: 10
    };
  },
  created () {
    this.getList(true);
  },
  methods: {
    addAccount () {
      this.flag = true;
      this.title = '新增账户';
    },
    close (val) {
      this.flag = val;
    },
    numberChange (val) {
      switch (val.flag) {
        case 'pageSize':
          this.pageSize = val.pageSize;
          this.getList(true);
          break;
        case 'currentPage':
          this.currentPage = val.currentPage;
          this.getList(false);
          break;
        default:
          break;
      }
    },
    renderIndex(h, { column, $index }) {
      return h('span', [h('span', '编号')]);
    },
    // 给请求回来的表格数据新增index属性（序号
    initTableData(val) {
      if (!val && !val.length) return [];
      for (var i = 0; i < val.length; i++) {
        val[i].index = (this.currentPage - 1) * this.pageSize + i + 1;
      }
      return val;
    },
    enterBtton (val, flag) {
      var tip = '';
      if (flag === 0) {
        tip = '启用账户';
      } else {
        tip = '禁用账户';
      }
      this.$confirm(`此操作将${tip}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.save(val, flag);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    save (val, flag) {
      const params = {
        id: val
      };
      if (flag === 0) {
        API.recoverSn(params)
        .then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: res.message
              });
              this.getList(false);
            }
        });
      } else {
        API.forbidSn(params)
        .then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: res.message
              });
              this.getList(false);
            }
        });
      }
    },
    // 查询按钮
    checkSnList () {
      this.$refs['formInline'] &&
      this.$refs['formInline'].validate(valid => {
        if (!valid) {
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
        ...this.formInline,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      };
      API.getSnList(params)
      .then(res => {
        this.loading = false;
        if (res.code === 0) {
          this.total = res.result ? res.result.total : 0;
          this.tableData = res.result ? this.initTableData(res.result.data) : [];
        } else {
          this.tableData = [];
          this.total = 0;
        }
      })
      .catch(() => {
          this.tableData = [];
          this.total = 0;
          this.loading = false;
      });
    },
    clear () {
      restData(this.formInline);
      this.getList(true);
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