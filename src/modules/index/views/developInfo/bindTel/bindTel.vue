<template>
  <div class="page-main-con">
    <con-header :titleIcon="titleIcon2" title="绑定手机号"></con-header>
    <div class="page-form-wrapper">
      <el-form class="page-form" ref="bindForm" :model="bindFormData" :rules="bindRules" label-width="150px">
        <el-form-item label="登陆账号">
          <div class="account">{{bindFormData.account}}</div>
        </el-form-item>

        <el-form-item label="手机号" prop="mobile">
          <el-input v-model.trim="bindFormData.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item label="绑定手机号" class="indentfy-code-parent" prop="smsCode">
          <el-input v-model.trim="bindFormData.smsCode" placeholder="请输入验证码"></el-input>
          <el-button class="code-btn" @click.prevent="handleGetCode" size="mini" type="info" plain>{{codeText}}</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="medium" @click="handleSubmit">完成</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import conHeader from '@/components/awesome/con-header/con-header';
import {getSmsCode, bindMobile} from '../../../api/developInfo/index';
export default {
  data () {
    var validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('验证码不能为空'));
      } else if (value !== this.smsCode) {
        callback(new Error('验证码错误'));
      } else {
        callback();
      }
    };
    var validateMobile = (rule, value, callback) => {
      var regMobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      if (value === '') {
        callback(new Error('手机号不能为空'));
      } else if (!regMobile.test(value)) {
        callback(new Error('手机号不符合规则'));
      } else {
        callback();
      }
    };
    return {
      titleIcon2: '/static/img/title_02@2x.png',
      bindFormData: {
        account: 'qq123456',
        mobile: '',
        smsCode: ''
      },
      smsCode: '123456',
      codeText: '获取验证码',
      bindRules: {
        mobile: [
          {validator: validateMobile, trigger: 'blur'}
        ],
        smsCode: [
          {validator: validateCode, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    // 获取验证码
    handleGetCode () {
      clearInterval(this.timer);
      let regMobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      if (!regMobile.test(this.bindFormData.mobile)) return;
      let second = 60;
      let params = {
        mobile: this.bindFormData.mobile
      };
      getSmsCode(params).then(res => {
        console.log(res);
        this.codeText = `重新获取(${second})`;
        this.timer = setInterval(() => {
          second--;
          if (second <= 0) {
            clearInterval(this.timer);
          }
          let s = (second >= 10) ? second : `0${second}`;
          this.codeText = `重新获取(${s})`;
        }, 1000);
      });
    },

    // 完成绑定
    handleSubmit () {
      this.$refs['bindForm'] && this.$refs['bindForm'].validate((valid) => {
        if (!valid) {
          return;
        }
        this.handleBindMobile();
      });
    },

    // 绑定手机号
    handleBindMobile () {
      let params = {
        account: this.bindFormData.account,
        mobile: this.bindFormData.mobile,
        code: this.bindFormData.smsCode
      };
      bindMobile(params).then(res => {
        console.log(res);
      });
    }
  },
  components: {
    'con-header': conHeader
  }
};
</script>

<style lang="less" scoped>
  @import '../personInfo/personInfo.less';
</style>