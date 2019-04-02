<template>
  <div class="equipmentState-info-mine-warp">
        <div class="title-equipmentState">
            <con-header :title-icon="addProductsIcon" title="在线状态查询" :hasBottomBorder="true"></con-header>
        </div>
        <!-- 查询部分 -->
        <div class="equipmentState-check">
           <el-form :inline="true" :model="formInline" ref="form" class="demo-form-inline" label-width="180px" :rules="rules">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="设备ID" prop="deviceId">
                    <el-input v-model="formInline.deviceId" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="设备SN" prop="sn">
                    <el-input v-model="formInline.sn" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
           </el-form>
           <div class="btn-select" v-authority="'b1_applianStateGetTag'">
              <el-button type="primary" @click="getInformation">查 询</el-button>
              <el-button @click="clear">清 除</el-button>
           </div>
        </div>
        <div class="mine-r-table" v-loading="loading">
          <div class="tip-one">
            设备在线状态
          </div>
          <div>
            <mine-table :info="info" :tabelParameter='parameter'></mine-table>
          </div>
        </div>
  </div>
</template>

<script>
import conHeader from '@/components/awesome/con-header/con-header';
import { checkInfo } from '@/modules/index/views/mineDataCenter/mixin';
import { doSubmit, restData } from '@/modules/index/api/system/common.js';
import API from '@/modules/index/api/dataCenter/dataCenter.js';
// import { restData } from '@/modules/index/api/system/common.js';
import mineTable from './mine-table';
export default {
  components: {
    conHeader,
    mineTable
  },
  mixins: [checkInfo],
  data () {
    return {
      parameter: [
        { head: '设备ID', body: 'deviceId' },
        { head: '设备SN', body: 'sn' },
        { head: '品类', body: 'type' },
        { head: '型号码', body: 'sn8' },
        { head: '在线状态', body: 'online' },
        { head: '所在地', body: 'location' }
      ],
      loading: false,
      addProductsIcon: '/static/img/title_05@2x.png',
      formInline: {
        deviceId: '',
        sn: ''
      },
      // 请求回来的数据
      info: {
        deviceId: '',
        sn: '',
        type: '',
        sn8: '',
        online: '',
        location: ''
      },
      rules: {
        deviceId: { required: true, validator: this.checkId, trigger: 'blur' },
        sn: { required: true, validator: this.checkSn, trigger: 'blur' }
      }
    };
  },
  methods: {
    clear () {
      restData(this.formInline);
      this.info = {
        deviceId: '',
        sn: '',
        type: '',
        sn8: '',
        online: '',
        location: ''
      };
    },
    getInformation () {
      console.log(this.formInline);
      if (!doSubmit('form', this)) return;
      // 同时校验必须至少有一条查询条件才去请求
      if (!this.formInline.deviceId && !this.formInline.sn) {
        this.$message('请至少输入一条查询条件查询');
        return;
      }
      this.getInfo();
    },
    // 查询方法
    getInfo () {
      this.loading = true;
      // this.formInline.deviceId = Number(this.formInline.deviceId);
      // console.log(Number(this.formInline.deviceId));
      const query = {
        // ...this.formInline
        deviceId: this.formInline.deviceId ? Number(this.formInline.deviceId) : 0,
        sn: this.formInline.sn

      };
      // let paramFormData = new FormData();
      // for (const key in this.formInline) {
      //   paramFormData.append(key, this.formInline[key]);
      // }
      API.getSmartStateInfo(query)
         .then((res) => {
           if (res.result) {
             this.info = res.result;
           } else {
              this.info = {
                deviceId: '',
                sn: '',
                type: '',
                sn8: '',
                online: '',
                location: ''
              };
              this.$message({
                message: '查询结果不存在',
                type: 'error',
                duration: 5 * 1000
              });
           }
           this.loading = false;
         })
         .catch(() => {
            this.info = {
              deviceId: '',
              sn: '',
              type: '',
              sn8: '',
              online: '',
              location: ''
            };
            this.loading = false;
         });
    }
  }
};
</script>

<style lang="less">
.equipmentState-info-mine-warp{
  .equipmentState-check{
    margin-top: 24px;
    border-bottom: 1px solid #eeeeee;
  }
  .is-required{
    .el-form-item__label:before{
      content: '' !important;
    }
  }

  .el-input{
    width: 230px;
  }
  .btn-select{
    text-align: right;
    margin-bottom: 20px;
  }
  .tip-one{
    // margin-top: 24px;
    line-height: 70px;
    font-size: 20px;
    font-weight: 700;
  }
  .hasBorder{
    border-bottom: 1px solid #333333;
  }
  .user-form{
    margin-bottom: 30px;
    .el-form-item{
      margin-bottom: 0px;
    }
    .el-form-item__content{
      p {
        width: 235px;
        word-wrap: break-word;
        line-height: 30px;
        padding-top: 5px;
      }
    }
  }
}
</style>
