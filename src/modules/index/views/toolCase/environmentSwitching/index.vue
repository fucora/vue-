<template>
  <div class="page-container-mine-toolCase">
    <div class="page-main-con">
      <con-header :titleIcon="titleIcon1" title="环境切换"></con-header>
      <div class="page-main-wrapper">
        <!--条件查询容器-->
        <div class="query-wrapper clearfix">
          <el-form class="query-form" ref="query-form" :model="queryFormData" :inline="true" :rules="rules">
            <el-row>
              <el-col :span="12">
                <el-form-item label="设备SN">
                  <el-input v-model.trim="queryFormData.sn" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="生效状态">
                  <el-select filterable v-model="queryFormData.status" clearable>
                    <el-option v-for="item  in statusList" :key="item.id" :value="item.id" :label="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div style="text-align:right;margin-bottom: 20px;border-bottom: 1px solid #dedfe5; padding-bottom: 20px;">
            <el-button  type="primary" @click="handleQuery">查 询</el-button>
            <el-button @click="clear">清 除</el-button>
          </div>
        </div>

        <!--操作按钮容器-->
        <div class="operator-wrapper">
          <el-button  type="primary" @click="addLua">新增切换</el-button>
        </div>

        <!--Lua协议列表-->
        <div class="table-wrapper" v-loading="loading">
          <el-table class="table" :data="dataList" style="width: 100%">
            <el-table-column prop="index" width="50" align="center" :render-header="renderIndex"></el-table-column>
            <el-table-column prop="sn" width="150" label="设备SN" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="originalEnv" width="150" label="源环境" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.originalEnv === 0">国内DEV</span>
                <span v-if="scope.row.originalEnv === 1">国内SIT</span>
                <span v-if="scope.row.originalEnv === 2">国内PROD</span>
              </template>
            </el-table-column>
            <el-table-column prop="targetEnv" width="150" label="目标环境" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.targetEnv === 0">国内DEV</span>
                <span v-if="scope.row.targetEnv === 1">国内SIT</span>
                <span v-if="scope.row.targetEnv === 2">国内PROD</span>
              </template>
            </el-table-column>
            <el-table-column prop="status" width="150" label="生效状态" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.status === 0">等待执行</span>
                <span v-if="scope.row.status === 1">成功</span>
                <span v-if="scope.row.status === 2">失败重试中</span>
                <span v-if="scope.row.status === 3">失败</span>
              </template>
            </el-table-column>
            <el-table-column prop="account" width="150" label="提交人" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="提交时间" align="center" width="150" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{scope.row.createTime | fomatDate('yyyy-MM-dd HH:mm')}}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150" fixed="right">
              <template slot-scope="scope">
                <!-- 详情所有状态都显示 -->
                <el-button type="text" @click="environmentInfo(scope.row)">详情</el-button>
                <el-button type="text" v-if="scope.row.status === 3" @click="submitAgain(scope.row)">重新提交</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="myPagination">
          <mine-pagination
           @numberChange="numberChange"
           :total="total"
           :pageSizes="[10, 20, 30]"
           :page-size="pageSize"
           :current-page="currentPage"
           >
           </mine-pagination>
        </div>
      </div>
<!-- <el-button type="text" @click="environmentInfo({id: 2})">详情</el-button> -->
      <mine-dialog :dialogFormVisible='flag' :width='"45%"' :modalFlag="modalFlag" @close="close" :title="title" :showClose="showClose">
        <div slot="option" v-if="dilogType === 'add'">
          <add-dialog @close="close" :flag="flag" @handleSave="addHandleSave"></add-dialog>
        </div>
        <div slot="option" v-if="dilogType === 'info'">
          <info-dialog :flag="flag" @close="close" :infoId="infoId" :luaFormData="luaFormData"></info-dialog>
        </div>
      </mine-dialog>
    </div>
  </div>
</template>

<script>
import conHeader from '@/components/awesome/con-header/con-header';
import minePagination from '@/modules/index/components/mine-pagination';
import { restData, format } from '@/modules/index/api/system/common.js';
import mineDialog from '@/modules/index/components/mine-dialog';
import addDialog from './addDialog';
import infoDialog from './infoDialog';
import { toolCaseMixin } from '../mixin';
import API from '@/modules/index/api/toolCase/index.js';
export default {
  mixins: [toolCaseMixin],
  components: {
    'con-header': conHeader,
    // pagination,
    mineDialog,
    minePagination,
    addDialog,
    infoDialog
  },
  data() {
    return {
      statusList: [
        {name: '等待执行', id: 0},
        {name: '成功', id: 1},
        {name: '失败重试中', id: 2},
        {name: '失败', id: 3}
      ],
      luaFormData: {},
      loading: false,
      // 分页
      currentPage: 1,
      total: 0,
      pageSize: 10,
      dilogType: '',
      infoId: '',
      flag: false,
      // 是否显示按钮
      showClose: false,
      modalFlag: false,
      title: '',
      titleIcon1: '/static/img/title_07@2x.png',
      queryFormData: {
        sn: '',
        status: ''
      },
      //  表格数据
      dataList: [
        // {sn: '111', index: 1, originalEnv: 0, targetEnv: 2, status: 0, account: 'me', createTime: '2019/10/24 10:55:35', onlineStatus: 2, wifiVersion: '2231214', description: '原因'}
      ],
      rules: {
        // sn: { required: false, validator: this.checkSn, trigger: 'blur' }
      }
    };
  },
  filters: {
    fomatDate (val, type) {
      if (!val) return '';
      return format(val, type);
    }
  },
  methods: {
    //  重新提交
    submitAgain (val) {
      let params = {
        id: val.id
      };
      API.saveSnSwithchAgain(params).then(res => {
        if (res.code === 0) {
            this.$message({
                type: 'success',
                message: res.message
            });
            this.getLuaListData(false);
        }
      });
    },
    clear () {
      restData(this.queryFormData);
      this.getLuaListData(true);
    },
    numberChange (val) {
      switch (val.flag) {
        case 'pageSize':
          this.currentPage = 1;
          this.pageSize = val.pageSize;
          this.getLuaListData(true);
          break;
        case 'currentPage':
          this.currentPage = val.currentPage;
          this.getLuaListData(false);
          break;
        default:
          break;
      }
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
      return h('span', [h('span', '编号')]);
    },
    close(val) {
      this.flag = val;
    },
    // 新增提交
    addHandleSave(val) {
      this.flag = val;
      this.getLuaListData(true);
    },
    // 点击查询
    handleQuery() {
      this.$refs['query-form'] &&
      this.$refs['query-form'].validate(valid => {
        if (!valid) {
          return;
        }
        this.getLuaListData(true);
      });
    },
    // 查询列表数据
    getLuaListData(flag) {
      if (flag) {
        this.currentPage = 1;
      }
      let params = {
        pageNo: this.currentPage || 1,
        pageSize: this.pageSize || 10,
        ...this.queryFormData
      };
      this.loading = true;
      API.snSwithchList(params).then(res => {
        if (res.code === 0) {
          this.total = res.result ? res.result.total : 0;
          this.dataList = res.result.data ? this.initTableData(res.result.data) : [];
        } else {
          this.dataList = [];
          this.total = 0;
        }
        this.loading = false;
      });
    },
    // 新增切换对话框
    addLua() {
      this.dilogType = 'add';
      this.flag = true;
      this.showClose = true;
      this.title = '新增切换';
    },
    // 详情
    environmentInfo(row) {
      this.flag = true;
      this.showClose = true;
      this.title = '详情';
      this.dilogType = 'info';
      this.infoId = row.id;
      this.luaFormData = row;
    }
  },
  created() {
    this.getLuaListData(true);
  }
};
</script>

<style lang="less" scoped>
@import '../agreement.less';
.file-upload {
  overflow: hidden;
  padding-left: 4px;
  text-overflow: ellipsis;
  -webkit-transition: color 0.3s;
  transition: color 0.3s;
  white-space: nowrap;
}
.page-container-mine-toolCase{
  .operator-wrapper{
    text-align: right;
  }
}

</style>g
