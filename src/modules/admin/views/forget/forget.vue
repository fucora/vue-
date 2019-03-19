<template>
  <div class="forget-wrapper">
    <div>
      <div class="header-lr-wrapper">
        <div class="header-lr-content center-wrapper">
          <a class="logo-wrapper" href="javascript:void(0)" @click="gotHome">
            <img class="logo" src="../../../../assets/img/logo@2x.png" alt="图片不存在" width="43" height="29">
            <span>开发者中心</span>
          </a>
          <div class="hlr-nav">
            <a class="nav-link-a" href="./index.html">平台介绍</a>
            <a href="#" @click="goDevelopGuide">开发指引</a>
          </div>
        </div>
      </div>
    </div>
    <!-- <header-lr></header-lr> -->
    <div class="forget-container center-wrapper">
      <div class="forget-main">
        <div class="steps-box">
          <div class="steps">
            <span class="step1" :style="{opacity: step === 1 ? 1 : 0.3}">1</span>
            <i class="step-line"></i>
            <span class="step2" :style="{opacity: step === 1 ? 0.2 : 1}">2</span>
          </div>
          <div class="steps-desc">
            <span class="desc1" :style="{color: step === 1 ? '#333' : '#999'}">验证账号</span>
            <span class="desc2" :style="{color: step === 1 ? '#999' : '#000'}">设置新密码</span>
          </div>
        </div>

        <div class="form-wrapper">
          <el-form v-if="step === 1" class="forget-form step-form1" ref="stepForm1" :model="stepFormData1" :rules="stepRules1">
            <el-form-item prop="mobile">
              <el-input v-model.trim="stepFormData1.mobile" auto-complete="off" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="smsCode" class="indentfy-code-parent">
              <el-input v-model.trim="stepFormData1.smsCode" auto-complete="off" placeholder="请输入验证码"></el-input>
              <el-button class="code-btn" v-show="isCountDown" @click.prevent="handleGetCode" size="mini" type="info" plain>获取验证码 </el-button>
              <el-button class="code-btn" style="cursor: text;" v-show="!isCountDown" size="mini" type="info" plain><span>{{count}}s</span></el-button>
            </el-form-item>
          </el-form>

          <el-form v-if="step === 2" class="forget-form step-form2" ref="stepForm2" autocomplete="off" :model="stepFormData2" :rules="stepRules2">
            <el-input type="text" v-show="false" v-model.trim="stepFormData1.mobile" placeholder="请输入手机号"></el-input>
            <!-- <input type="text" style="display:none" />
            <input type="password" style="display:none" /> -->
            <el-form-item prop="password">
              <el-input onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false" autocomplete="new-password" v-model.trim="stepFormData2.password" type="password" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item prop="confirmPsw">
              <el-input onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false" autocomplete="new-password" v-model.trim="stepFormData2.confirmPsw" type="password" placeholder="确认新密码"></el-input>
            </el-form-item>
          </el-form>

          <div class="step-btn">
            <el-button type="primary" size="medium" @click="handleStep">{{step === 1 ? '下一步' : '完成'}}</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- <footer-rgs></footer-rgs> -->
    <div>
      <div class="rgs-footer">
        <div class="rgs-footer-contain center-wrapper clearfix">
          <p class="copy-right pull-left">Copyright © 1968-2018 Midea Group. all right reserved 美的集团</p>
          <p class="pull-right">使用反馈</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import headerLr from '@/components/awesome/header_lr/header_lr';
// import footerRgs from '@/components/awesome/footer_rgs/footer_rgs';
// import {getSmsCode, resetPsw} from '../../api/forget';
import { resetPsw, getSmsCode, verify } from '../../api/register/register';
// import CryptoJS from 'crypto-js';
import {Encrypt} from './../login/crypto.js';
export default {
  data() {
    var validatePsw = (rule, value, callback) => {
      var regPsw = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
      if (value === '') {
        this.stepFormData2.password = '';
        callback(new Error('请输入密码'));
      } else {
        if (!regPsw.test(value)) {
          callback(new Error('请输入长度为6-16为数字字母组合'));
        } else {
          if (this.stepFormData2.confirmPsw !== '') {
            this.$refs['stepForm2'].validateField('confirmPsw');
          }
          callback();
        }
      }
    };
    var validateCheckPsw = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.stepFormData2.password) {
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

      step: 1,
      stepFormData1: {
        mobile: '',
        smsCode: ''
      },
      stepFormData2: {
        password: '',
        confirmPsw: ''
      },
      stepRules1: {
        mobile: [{ validator: validateMobile, trigger: 'blur' }],
        smsCode: [{ validator: validateCode, trigger: 'blur' }]
      },
      stepRules2: {
        password: [{ validator: validatePsw, trigger: 'blur' }],
        confirmPsw: [{ validator: validateCheckPsw, trigger: 'blur' }]
      },
      result: ''
    };
  },
  methods: {
        // 跳转介绍页
    gotHome() {
      this.$router.push({ path: '/platformIntroduction' });
    },
    goDevelopGuide() {
      this.$router.push({name: '开发指引模块'});
    },
    // 点击下一步
    handleStep() {
      if (this.step === 1) {
        this.$refs['stepForm1'] &&
          this.$refs['stepForm1'].validate(valid => {
            if (!valid) return;
            this.getVerify();
            // this.step = 2;
          });
      } else {
        this.$refs['stepForm2'] &&
          this.$refs['stepForm2'].validate(valid => {
            if (!valid) return;
            this.handleResetPsw();
          });
      }
    },
    // verify 手机验证
    getVerify() {
      let regMobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      if (!regMobile.test(this.stepFormData1.mobile)) return;
      let params = {
        mobile: this.stepFormData1.mobile,
        smsCode: this.stepFormData1.smsCode,
        type: 3
      };
      verify(params).then(res => {
        if (res.code === 0) {
          this.step = 2;
          this.result = res.result;
        }
        console.log(res);
      });
    },
    // 获取验证码
    handleGetCode() {
      let regMobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      if (!regMobile.test(this.stepFormData1.mobile)) return;
      let params = {
        mobile: this.stepFormData1.mobile,
        type: 3
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
    },

    // 重置密码
    handleResetPsw() {
      // let md5Psw = CryptoJS.MD5(this.stepFormData2.password).toString();
      // let md5Psw = this.stepFormData2.password;
      let md5Psw = Encrypt(this.stepFormData2.password);
      // debugger;
      let params = {
        mobile: this.stepFormData1.mobile,
        password: md5Psw,
        smsCode: this.stepFormData1.smsCode,
        type: 3,
        randomCode: this.result
      };
      resetPsw(params).then(res => {
        // debugger;
        if (res.code === 0) {
          this.$message({
            message: '修改密码成功',
            type: 'success',
            onClose: () => {
              // debugger
              this.$router.push({ name: '登陆' });
            }
          });
        } else {
          this.step = 1;
        }

        console.log(res);
      });
    }
  },
  destroyed() {
    this.stepFormData2.password = '';
    this.stepFormData2.confirmPsw = '';
  }
  // components: {
  //   'header-lr': headerLr,
  //   'footer-rgs': footerRgs
  // }
};
</script>

<style lang="less" scoped>
.forget-wrapper {
  width: 100%;
}
.forget-container {
  padding-top: 65px;
  margin: 0 auto;
}
.forget-main {
  margin-top: 150px;
  margin-bottom: 112px;
  margin-left: auto;
  margin-right: auto;
  width: 300px;

  .form-wrapper {
    width: 100%;
  }
}
.steps-box {
  margin-bottom: 95px;
  width: 100%;
}
.steps {
  text-align: center;
  span {
    display: inline-block;
    width: 36px;
    height: 36px;
    background: #1d233c;
    line-height: 36px;
    text-align: center;
    font-size: 18px;
    color: #fff;
    vertical-align: middle;
    border-radius: 50%;
  }
  .step-line {
    display: inline-block;
    width: 124px;
    height: 8px;
    background: url('../../img/signin_line@2x.png') no-repeat center center;
    background-size: cover;
    vertical-align: middle;
  }
}

.steps-desc {
  position: relative;
  margin-top: 8px;
  span {
    position: absolute;
    font-size: 16px;
    color: #333;
  }
  .desc1 {
    top: 0px;
    left: 34px;
  }
  .desc2 {
    top: 0px;
    right: 26px;
  }
}

.forget-form {
  // .el-form-item {
  //   margin-bottom: 16px;
  // }
}
.indentfy-code-parent {
  position: relative;

  .code-btn {
    position: absolute;
    top: 50%;
    right: 6px;
    margin-top: -14px;
  }
}
.step-btn {
  margin-top: 25px;
  margin-bottom: 46px;
  .el-button {
    display: block;
    width: 100%;
  }
}
.header-lr-wrapper {
  // position: fixed;
  // top: 0;
  // left: 0;
  // width: 100%;
  background: #1d233c;
  // z-index: 999;
    // background-color: rgba(0, 0, 0, 0.2);
      width: 100%;
    z-index: 1;
    position: fixed;
}
.header-lr-content {
  position: relative;
  height: 65px;
  margin: 0 auto;
        width: 100%;
    display: flex;
    justify-content: space-between;

  a {
    font-size: 16px;
    color: #fff;
        span{
      font-size: 18px;
    }
  }
}
.logo-wrapper {
  // position: absolute;
  // top: 0;
  // left: 0px;
  // padding: 18px 0;
  // overflow: hidden;
    display: flex;
  align-items: center;
    justify-content: center;
  cursor: pointer;
}
.logo {
  display: inline-block;
  margin-right: 16px;
  vertical-align: middle;
}
.hlr-nav {
  position: absolute;
  top: 0;
  right: 0px;
  padding: 23px 0 24px 0;
}
.nav-link-a:after {
  content: '|';
  display: inline-block;
  font-size: 14px;
  color: #dedfe5;
  margin: 0 35px 0 37px;
}
.rgs-footer {
  width: 100%;
  background: #f1f1f1;
}
.rgs-footer-contain {
  height: 92px;
  margin: 0 auto;
  p {
    line-height: 92px;
    font-size: 14px;
    color: #666;
  }
}
// @import './forget.less';
</style>
