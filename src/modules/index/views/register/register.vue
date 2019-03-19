<template>
  <div class="register-wrapper">
    <header-lr></header-lr>
    <div class="register-container center-wrapper">
      <div class="register-main">
        <h3 class="title3">注册新账号</h3>
        <div class="form-wrapper">
          <el-form class="register-form" ref="regForm" :model="registerData" :rules="registerRules">
            <el-form-item prop="smsCode" class="indentfy-code-parent">
              <el-input v-model.trim="registerData.smsCode" auto-complete="off" placeholder="请输入验证码"></el-input>
              <!-- <el-button class="code-btn" @click.prevent="handleGetCode" size="mini" type="info" plain>获取验证码</el-button> -->
              <el-button class="code-btn" v-show="isCountDown" @click.prevent="handleGetCode" size="mini" type="info" plain>获取验证码 </el-button>
              <el-button class="code-btn" style="cursor: text;" v-show="!isCountDown" size="mini" type="info" plain><span>{{count}}s</span></el-button>
            </el-form-item>
            <el-form-item prop="mobile" class="mobile">
              <el-input v-model.trim="registerData.mobile" auto-complete="off" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false" v-model.trim="registerData.password" type="password" auto-complete="off" placeholder="设置密码：6-16位数字字母组合"></el-input>
            </el-form-item>
            <el-form-item prop="confirmPsw">
              <el-input onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false" v-model.trim="registerData.confirmPsw" type="password" auto-complete="off" placeholder="确认密码"></el-input>
            </el-form-item>
          </el-form>
          <el-checkbox class="agree-box" v-model="registerData.agree">
            <span style="color: #606266;">我同意</span>
            <span style="color: #409EFF;" class="policy" @click.prevent="goPrivacy">隐私协议</span>
            <span style="color: #606266;">和</span>
            <span style="color: #409EFF;" class="state" @click.prevent="goService">服务声明</span>
          </el-checkbox>
          <div class="register-btn">
            <el-button type="primary" size="medium" @click="handleSubmit">注册</el-button>
          </div>
          <!-- <div class="other-box">
            <div class="wechat-box">
              <i class="wechat-login"></i>
              <i class="qq-login"></i>
            </div>
            <p class="other-login">其他登陆方式</p>
          </div> -->
        </div>
      </div>
    </div>
    <footer-rgs></footer-rgs>
  </div>
</template>

<script>
import headerLr from '@/components/awesome/header_lr/header_lr2';
import footerRgs from '@/components/awesome/footer_rgs/footer_rgs';
// import {register, getSmsCode} from '../../api/register/register';
import { register, getSmsCode } from '../../api/register/register';
// import CryptoJS from 'crypto-js';
import {Encrypt} from './../login/crypto.js';
export default {
  data() {
    var validatePsw = (rule, value, callback) => {
      var regPsw = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (!regPsw.test(value)) {
          callback(new Error('请输入长度为6-16为数字字母组合'));
        } else {
          if (this.registerData.confirmPsw !== '') {
            this.$refs['regForm'].validateField('confirmPsw');
          }
          callback();
        }
      }
    };
    var validateCheckPsw = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerData.password) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('验证码不能为空'));
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
      isCountDown: true,
      count: null,
      timer: null,

      registerData: {
        mobile: '',
        smsCode: '',
        password: '',
        confirmPsw: '',
        agree: false
      },
      // smsCode: '123456',
      registerRules: {
        mobile: [{ validator: validateMobile, trigger: 'blur' }],
        smsCode: [{ validator: validateCode, trigger: 'blur' }],
        password: [{ validator: validatePsw, trigger: 'blur' }],
        confirmPsw: [{ validator: validateCheckPsw, trigger: 'blur' }]
      }
    };
  },
  methods: {
    goService() {
      window.open('/static/staticData/service.html');
    },
    // 打开隐私
    goPrivacy() {
      // location.
       window.open('/static/staticData/privacy.html');
      //  window.open('/static/staticData/test.html');

      //  window.location.href = '/static/staticData/privacy.html';
    },
    // 提交注册
    handleSubmit() {
      this.$refs['regForm'] &&
        this.$refs['regForm'].validate(valid => {
          if (!valid) {
            // this.$message({
            //   showClose: true,
            //   message: '必填项不符合',
            //   type: 'warning'
            // });
            return;
          }
          if (!this.registerData.agree) {
            this.$message({
              showClose: true,
              message: '请勾选我同意隐私协议和服务声明',
              type: 'error'
            });
            return;
          }
          this.handleRegister();
        });
    },

    // 注册
    handleRegister() {
      // let md5Psw = CryptoJS.MD5(this.registerData.password).toString();
      // let md5Psw = this.registerData.password;
      let md5Psw = Encrypt(this.registerData.password);
      let params = {
        mobile: this.registerData.mobile,
        password: md5Psw,
        smsCode: this.registerData.smsCode,
        type: 1
      };
      register(params).then(res => {
        debugger;
        console.log(res);
        if (res.code === 0) {
          this.$message({
            message: res.message,
            center: true,
            type: 'success',
            onClose: val => {
              this.$router.push({ name: '登陆' });
            }
          });
          // this.$router.push({ name: '登陆' });
        }
      });
    },
    // 获取验证码
    handleGetCode() {
      let regMobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      if (!regMobile.test(this.registerData.mobile)) return;
      let params = {
        mobile: this.registerData.mobile,
        type: 1
      };
      getSmsCode(params).then(res => {
        console.log(res);
        if (res.code === 0) {
          const TIME_COUNT = 60;
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.isCountDown = false;
            this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
              } else {
              this.isCountDown = true;
              clearInterval(this.timer);
              this.timer = null;
              }
            }, 1000);
            }
          this.$message({
            message: '验证码已发送您的手机',
            type: 'success'
          });
        }
        if (res.code === 10060013) {
          this.$message({
            message: res.message,
            center: true
          });
        }
      });
    }
  },
  components: {
    'header-lr': headerLr,
    'footer-rgs': footerRgs
  },
  destroyed() {
    this.registerData.password = '';
    this.registerData.confirmPsw = '';
  }
};
</script>

<style lang="less" scoped>
@import './register.less';
</style>
