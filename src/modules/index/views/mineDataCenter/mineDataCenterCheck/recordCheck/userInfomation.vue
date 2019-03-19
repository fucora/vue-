<template>
  <div class="userInfomation-info-mine-warp">
    <div class="title-userInfomation">
      <con-header :title-icon="addProductsIcon" title="用户设备查询" :hasBottomBorder="true"></con-header>
    </div>
    <!-- 查询部分 -->
    <div class="userInfomation-check">
      <el-form :inline="true" :model="formInline" ref="form" class="demo-form-inline" :rules="rules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="用户uid" prop="uid">
              <el-input v-model="formInline.uid" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户id" prop="userId">
              <el-input v-model="formInline.userId" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户手机号" prop="mobile">
              <el-input v-model="formInline.mobile" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="btn-select" v-authority="'b1_smartUserGetTag'">
        <el-button type="primary" @click="getInformation">查 询</el-button>
        <el-button @click="clear">清 除</el-button>
      </div>
    </div>

    <div class="mine-r-table">
      <div class="tip-one">
        用户基本信息
      </div>
      <div>
        <mine-table :info="info" :tabelParameter='userParameter'></mine-table>
      </div>
    </div>
    <div v-if="applianList.length">
      <div v-for="(item, index) in applianList" :key="index"  class="mine-r-table">
        <div class="tip-one">
          {{'绑定设备' + (index + 1)}}
        </div>
        <div>
          <mine-table :info="item" :tabelParameter='appParameter'></mine-table>
        </div>
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
  data() {
    return {
      userParameter: [
        { head: '用户id', body: 'id' },
        { head: '用户uid', body: 'uid' },
        { head: '用户手机号', body: 'mobile' },
        { head: '昵称', body: 'nickName' },
        { head: '注册时间', body: 'registerTime' },
        { head: '邮箱', body: 'email' }
      ],
      appParameter: [],
      addProductsIcon: '/static/img/title_05@2x.png',
      formInline: {
        userId: '',
        mobile: ''
      },
      info: {
        id: '',
        mobile: '',
        nickName: '',
        registerTime: '',
        email: ''
      },
      applianList: [],
      rules: {
        uid: {
          required: true,
          validator: this.checkUid,
          trigger: 'blur'
        },
        userId: {
          required: true,
          validator: this.checkUserId,
          trigger: 'blur'
        },
        mobile: { required: true, validator: this.checkMobile, trigger: 'blur' }
      }
    };
  },
  // created() {
  //   // 键盘enter事件
  //   var lett = this;
  //   document.onkeydown = function(e) {
  //     var key = window.event.keyCode;
  //     if (key == 13) {
  //       lett.getInformation();
  //     }
  //   }
  // },
  methods: {
    clear() {
      restData(this.formInline);
      this.applianList = [];
      this.info = {
        id: '',
        mobile: '',
        nickName: '',
        registerTime: '',
        email: ''
      };
    },
    getInformation() {
      console.log(this.formInline);
      if (!doSubmit('form', this)) {
        this.info = {
          id: '',
          mobile: '',
          nickName: '',
          registerTime: '',
          email: ''
        };
        this.applianList = [];
        return;
      }
      // 同时校验必须至少有一条查询条件才去请求
      if (!this.formInline.userId && !this.formInline.mobile && !this.formInline.uid) {
        this.$message('请至少输入一条查询条件查询');
        return;
      }
      this.getInfo();
    },
    // 查询方法
    getInfo() {
      const query = {
        ...this.formInline
      };
      API.getSmartUserInfo(query)
        .then(res => {
          if (res.code === 0) {
            this.info = res.result;
            this.applianList = this.info.applianList.length
              ? this.info.applianList
              : [];
            this.initParameter(this.applianList);
          } else {
            this.info = {
              id: '',
              mobile: '',
              nickName: '',
              registerTime: '',
              email: ''
            };
            this.applianList = [];
          }
        })
        .catch(() => {
          this.info = {
            id: '',
            mobile: '',
            nickName: '',
            registerTime: '',
            email: ''
          };
          this.applianList = [];
        });
    },
    // 初始化表格参数
    initParameter(val) {
      for (var i = 0; i < val.length; i++) {
        if (val[i].activeStatus === 0) {
          val[i].activeStatusShow = '未激活';
        } else {
          val[i].activeStatusShow = '已激活';
        }
      }
      this.appParameter = [
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
      ];
    }
  }
};
</script>

<style lang="less">
.userInfomation-info-mine-warp {
  .userInfomation-check {
    margin-top: 24px;
    border-bottom: 1px solid #eeeeee;
  }
  .is-required {
    .el-form-item__label:before {
      content: '' !important;
    }
  }
  .el-input {
    width: 230px;
  }
  .btn-select {
    text-align: right;
    margin-bottom: 20px;
  }
  .tip-one {
    // margin-top: 24px;
    line-height: 70px;
    font-size: 20px;
    font-weight: 700;
  }
  .hasBorder {
    border-bottom: 1px solid #333333;
  }
  .user-form {
    margin-bottom: 30px;
    .el-form-item {
      margin-bottom: 0px;
    }
    .el-form-item__content {
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
