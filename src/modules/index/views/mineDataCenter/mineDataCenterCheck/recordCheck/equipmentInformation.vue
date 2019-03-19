<template>
  <div class="equipmentInformation-info-mine-warp">
        <div class="title-equipmentInformation">
            <con-header :title-icon="addProductsIcon" title="设备查询" :hasBottomBorder="true"></con-header>
        </div>
        <!-- 查询部分 -->
        <div class="equipmentInformation-check">
           <el-form :inline="true" :model="formInline" ref="form" class="demo-form-inline" :rules="rules">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="设备ID" prop="applianceCode">
                    <el-input v-model="formInline.applianceCode" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="设备SN" prop="sn">
                    <el-input v-model="formInline.sn" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="设备条码" prop="productCode">
                    <el-input v-model="formInline.productCode" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
           </el-form>
           <div class="btn-select" v-authority="'b1_applianInfoGetTag'">
              <el-button type="primary" @click="getInformation">查 询</el-button>
              <el-button @click="clear">清 除</el-button>
           </div>
        </div>

        <div class="mine-r-table">
          <div class="tip-one">
            设备基本信息
          </div>
          <div>
            <mine-table :info="info" :tabelParameter='baseParameter'></mine-table>
          </div>
        </div>

        <div class="mine-r-table">
          <div class="tip-one">
            所在家庭信息
          </div>
          <div>
            <mine-table :info="info" :tabelParameter='famliParameter'></mine-table>
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
      baseParameter: [
        { head: '设备ID', body: 'applianceCode' },
        { head: '设备SN', body: 'sn' },
        { head: '设备条码', body: 'productCode' },
        { head: '品类', body: 'applianceType' },
        { head: '型号码', body: 'modelNumber' },
        { head: '绑定状态', body: 'activeStatusShow' },
        { head: '注册时间', body: 'registerTime' },
        { head: '绑定时间', body: 'activeTime' },
        { head: '绑定地点', body: 'applianPos' },
        { head: 'wifi版本号', body: 'wifiVersion' }
      ],
      famliParameter: [
        { head: '家庭组ID', body: 'homeGroupId' },
        { head: '创建人ID', body: 'createUser' },
        { head: '创建人手机号', body: 'mobile' },
        { head: '家庭名称', body: 'homeGroupName' },
        { head: '家电数', body: 'homeGroupCount' },
        { head: '用户数', body: 'userHomeCount' },
        { head: '创建时间', body: 'createTime' }
      ],
      // 请求回来的数据
      info: {
        applianceCode: '',
        sn: '',
        productCode: '',
        applianceType: '',
        modelNumber: '',
        activeStatus: '',
        activeStatusShow: '',
        registerTime: '',
        activeTime: '',
        applianPos: '',
        wifiVersion: '',
        homeGroupId: '',
        createUser: '',
        mobile: '',
        homeGroupName: '',
        homeGroupCount: '',
        userHomeCount: '',
        createTime: ''
      },
      addProductsIcon: '/static/img/title_05@2x.png',
      formInline: {
        applianceCode: '',
        productCode: '',
        sn: ''
      },
      rules: {
        applianceCode: { required: true, validator: this.checkId, trigger: 'blur' },
        productCode: { required: true, validator: this.checkSn, trigger: 'blur' },
        sn: { required: true, validator: this.checkSn, trigger: 'blur' }
      }
    };
  },
  methods: {
    clear () {
      restData(this.formInline);
      this.info = {
        applianceCode: '',
        sn: '',
        productCode: '',
        applianceType: '',
        modelNumber: '',
        activeStatus: '',
        activeStatusShow: '',
        registerTime: '',
        activeTime: '',
        applianPos: '',
        wifiVersion: '',
        homeGroupId: '',
        createUser: '',
        mobile: '',
        homeGroupName: '',
        homeGroupCount: '',
        userHomeCount: '',
        createTime: ''
      };
    },
    getInformation () {
      console.log(this.formInline);
      if (!doSubmit('form', this)) return;
      // 同时校验必须至少有一条查询条件才去请求
      if (!this.formInline.applianceCode && !this.formInline.productCode && !this.formInline.sn) {
        this.$message('请至少输入一条查询条件查询');
        return;
      }
      this.getInfo();
    },
    // 查询方法
    getInfo () {
      const query = {
        ...this.formInline
      };
      API.getSmartApplianceInfo(query)
         .then((res) => {
           if (res.code === 0) {
             this.info = res.result;
             this.initParameter(this.info);
           } else {
             this.info = {
              applianceCode: '',
              sn: '',
              productCode: '',
              applianceType: '',
              modelNumber: '',
              activeStatus: '',
              activeStatusShow: '',
              registerTime: '',
              activeTime: '',
              applianPos: '',
              wifiVersion: '',
              homeGroupId: '',
              createUser: '',
              mobile: '',
              homeGroupName: '',
              homeGroupCount: '',
              userHomeCount: '',
              createTime: ''
            };
           }
         })
         .catch(() => {
            this.info = {
              applianceCode: '',
              sn: '',
              productCode: '',
              applianceType: '',
              modelNumber: '',
              activeStatus: '',
              activeStatusShow: '',
              registerTime: '',
              activeTime: '',
              applianPos: '',
              wifiVersion: '',
              homeGroupId: '',
              createUser: '',
              mobile: '',
              homeGroupName: '',
              homeGroupCount: '',
              userHomeCount: '',
              createTime: ''
            };
         });
    },
    initParameter (val) {
      if (val['activeStatus'] === 0) {
        val['activeStatusShow'] = '未激活';
      } else {
        val['activeStatusShow'] = '已激活';
      }
    }
  }
};
</script>

<style lang="less">
.equipmentInformation-info-mine-warp{
  .equipmentInformation-check{
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
