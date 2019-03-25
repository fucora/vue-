<template>
  <div class="login-wrapper">
    <header-lr></header-lr>
    <div class="login-container center-wrapper">
      <el-row class="login-main">
        <el-col :span="15" class="login-left">
          <h2 class="title">美的IoT开放平台</h2>
          <p class="desc">实现从终端、云到服务，实现真正的开放，与各合作伙伴将建立起耦合式、嵌入式的合作关系，相互赋能，彻底打破信息孤岛，实现生态共建、共享资源、开放系统，与各行业合作伙伴共同构筑用户智慧生活生态</p>
        </el-col>
        <el-col :span="9" class="login-right">
          <div class="login-box">
            <h5 class="title5">账号密码登录</h5>
            <div class="form-wrapper">
              <el-form class="login-form" :model="loginData" ref="loginForm" :rules="loginRules" :show-message="false">
                <el-form-item prop="account">
                  <el-input v-model.trim="loginData.account" auto-complete="off" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="password" :style="{marginBottom: tipErrorText === '' ? '16px' : '4px'}">
                  <el-input onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false" v-model.trim="loginData.password" type="password" auto-complete="off" placeholder="密码"></el-input>
                </el-form-item>
              </el-form>
              <transition name="fadeTip">
                <div class="tip-error" v-if="tipErrorText !== ''">
                  <span class="error-icon">!</span>
                  <span class="error-text">{{tipErrorText}}</span>
                </div>
              </transition>
              <!-- <el-checkbox v-model="loginData.remember">记住密码</el-checkbox> -->
              <div class="login-btn">
                <el-button type="primary" size="medium" @click="handleSubmitLogin">登录</el-button>
              </div>
              <div class="forget clearfix">
                <!-- <a class="forget-psw pull-left" href="javascript:void(0)" @click="forget">忘记密码</a> -->
                <!-- <a class="register-new pull-right" href="javascript:void(0)" @click="register">注册新账号</a> -->
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
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import headerLr from '@/components/awesome/header_lr/header_lr2';
import Cookies from 'js-cookie';
import { setCookie } from '@/utils/index';
import CryptoJS from 'crypto-js';
import {Encrypt} from './crypto.js';
// import { login } from '../../api/login/login';
const securityKey = window.environment.securityKey;
export default {
  data() {
    return {
      loginData: {
        account: '',
        password: '',
        remember: true
      },
      loginRules: {
        account: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      tipErrorText: ''
    };
  },
  methods: {
    // 点击登陆
    handleSubmitLogin() {
      this.$refs['loginForm'] &&
        this.$refs['loginForm'].validate(valida => {
          if (!valida) {
            // this.tipErrorText = '用户名或密码不正确';
            return;
          }
          this.handleLogin();
        });
    },

    // 登陆api
    async handleLogin() {
      // let md5Psw = this.loginData.password;
      // let md5Psw = CryptoJS.MD5(this.loginData.password).toString();
      let md5Psw = Encrypt(this.loginData.password);
      // console.log(md5Psw);
      let params = {
        account: this.loginData.account,
        password: md5Psw
        // remember: this.loginData.remember
      };
      // console.log(Decrypt(md5Psw));
      // debugger;
      try {
          //         store.dispatch('FedLogOut').then(() => {
          //   location.reload(); // 为了重新实例化vue-router对象 避免bug
          // });
        // this.$router.push({name: '开发者平台系统管理'});
        await this.$store.dispatch('LoginByUsername', params).then((res) => {
          // this.$store.dispatch('getMeauAuthed', {uid: res.user.uid}).then(res => {
          // });
        });
        this.$router.push({name: '开发者平台系统管理'});
      } catch (e) {}
    },
    // handleLogin() {
    //   // let md5Psw = CryptoJS.MD5(this.loginData.password).toString();
    //   let md5Psw = this.loginData.password;
    //   let params = {
    //     account: this.loginData.account,
    //     password: md5Psw
    //     // remember: this.loginData.remember
    //   };
    //   this.$store
    //     .dispatch('LoginByUsername', params)
    //     .then(() => {
    //       debugger;
    //       // this.loading = false
    //       // this.$router.push({ path: '/' })
    //     })
    //     .catch(() => {
    //       // this.loading = false
    //     });
    //   // login(params).then(res => {
    //   //   console.log(res);
    //   //   if (res.code === 0) {
    //   //     if (this.loginData.remember) {
    //   //       this.rememberPsw();
    //   //     } else {
    //   //       Cookies.remove('info');
    //   //     }
    //   //     this.$router.push({ name: '产品' });
    //   //   }
    //   // });
    // },

    // 记住密码
    rememberPsw() {
      let loginInfo = {
        account: this.loginData.account,
        password: this.loginData.password
      };
      let secretKey = securityKey;
      let ciphertext = CryptoJS.DES.encrypt(
        JSON.stringify(loginInfo),
        secretKey
      ).toString();
      setCookie('info', ciphertext);
    },

    // 获取登陆后记住的信息
    getInfo() {
      let loginInfo = Cookies.get('info');
      if (typeof loginInfo !== 'undefined') {
        let secretKey = securityKey;
        let bytes = CryptoJS.DES.decrypt(loginInfo, secretKey);
        let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        this.loginData.account = decryptedData.account
          ? decryptedData.account
          : '';
        this.loginData.password = decryptedData.password
          ? decryptedData.password
          : '';
      }
    },

    // 跳转注册页面
    register() {
      this.$router.push({ path: '/register' });
    },

    // 跳转忘记密码页面
    forget() {
      this.$router.push({ path: '/forget' });
    }
  },
  created() {
    this.getInfo();
  },
  components: {
    'header-lr': headerLr
  }
};
</script>

<style lang="less" scoped>
@import './login.less';
.login-container{
  height: 100%;
}
.login-main{
  display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>

