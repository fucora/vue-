<template>
  <div class="page-header">
    <div class="page-header-container center-wrapper clearfix">
      <a
        class="logo-wrapper pull-left"
        @click="gotHome"
      >
        <img
          class="logo"
          src="../../../assets/img/logo@2x.png"
          alt="图片不存在"
          width="43"
          height="29"
        >
        <span style="fontSize:18px">开发者中心</span>
      </a>
      <div class="page-nav pull-left">
        <div
          class="page-nav-item"
          :class="{'nav-active': navActive === pItem.name}"
          v-for="(pItem, index) in hNavData"
          :key="index"
          @click="handleNavClick(pItem)"
        >
          <span
            class="level-nav-item"
            style="display:inline-block;padding: 0 28px"
          >{{pItem.name}}</span>
        </div>
      </div>
      <!-- @mouseleave="isShow = false" -->
      <div
        class="user-info-wrapper pull-right"
        v-if="(nickName||mobile)&&getToken"
        @mouseleave="mouseleave"
      >
        <!-- @click.stop="isShow = !isShow" -->
        <div
          class="user-info-content"
          @mouseenter="enter"
        >
          <span v-if="nickName">
            <span class="user-info">{{nickName}}</span>
            <!-- <span class="user-info" v-if="roleName">({{roleName}})</span> -->
          </span>
          <span v-else>
            <span class="user-info">{{mobile}}</span>
            <!-- <span class="user-info" v-if="roleName">({{roleName}})</span> -->
          </span>
          <span
            class="icon-down"
            :class="{rotate: isShow}"
          ></span>
        </div>
        <span class="icon-bell"></span>
        <transition name="slideInfo">
          <!-- v-show="isShow" -->
          <div
            class="hide-user-info"
            v-show="isShow"
            @click.stop
            @mouseenter="sover"
            @mouseleave="sout"
          >
            <ul class="user-info-list">
              <li class="list-item">
                <a
                  href="javascript:void(0)"
                  @click="goToInfo"
                >修改用户密码</a>
              </li>
              <li
                class="list-item"
                @click="handleLogout"
              >
                <a href="javascript:void(0)">退出</a>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
    <el-dialog
      title="修改用户密码"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      width="30%"
      :before-close="handleClose"
    >
      <div>
        <!-- <el-input
          type="text"
          v-model="password"
          @blur="passworInput"
        /> -->
        <el-form
          class="register-form"
          ref="regForm"
          :model="registerData"
          :rules="registerRules"
        >
          <el-form-item prop="password">
            <el-input
              onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
              onpaste="return false"
              oncontextmenu="return false"
              oncopy="return false"
              oncut="return false"
              v-model.trim="registerData.password"
              type="password"
              auto-complete="off"
              placeholder="设置密码：6-16位数字字母组合"
            ></el-input>
          </el-form-item>
          <el-form-item prop="confirmPsw">
            <el-input
              onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
              onpaste="return false"
              oncontextmenu="return false"
              oncopy="return false"
              oncut="return false"
              v-model.trim="registerData.confirmPsw"
              type="password"
              auto-complete="off"
              placeholder="确认密码"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="save"
        >确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import ls from '@/utils/storage/local_storage';
import { Encrypt } from '@/modules/index/views/login/crypto';
// import { logout } from '@/common/api/main';
import { getToken } from '@/utils/auth'; // 验权
export default {
  props: {
    active: {
      type: String,
      default: ''
    }
  },
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
    return {
      registerRules: {
        password: [{ validator: validatePsw, trigger: 'blur' }],
        confirmPsw: [{ validator: validateCheckPsw, trigger: 'blur' }]
      },
      registerData: {
        password: '',
        confirmPsw: ''
      },
      dialogVisible: false,
      password: '',

      getToken: getToken(),
      nickName: '', // 昵称
      roleName: '', // 角色
      mobile: '',
      isShow: false,
      hNavData: [
        { name: '我的产品', path: '/product/myProducts' }
        // { name: '开发指引', path: '/developGuideTop' },
        // { name: '下载中心', path: '/downloadCenter' }
      ],
      navActive: this.active
    };
  },
  watch: {
    active(nVal) {
      this.navActive = nVal;
    },
    '$route.path': {
      handler: function(nVal, oVal) {
        if (nVal === '/developGuideTop/developGuide/guide') {
          // this.navActive = '开发指引';
          this.handleNavClick({ name: '开发指引', path: '/developGuideTop' });
        }
      },
      deep: true,
      immediate: true
    },
    '$store.getters.userInfo': {
      handler: function(val, oldVal) {
        this.handleName();
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleName() {
      let tempUserInfo = this.$store.getters.userInfo;
      let lsUserInfo = JSON.parse(ls.getItem('userInfo'));
      // debugger;
      if (
        (tempUserInfo && tempUserInfo.email) ||
        (lsUserInfo && lsUserInfo.email)
      ) {
        this.mobile = tempUserInfo.email || lsUserInfo.email;
        // debugger;
      }
      if (
        (tempUserInfo && tempUserInfo.roleName) ||
        (lsUserInfo && lsUserInfo.roleName)
      ) {
        this.roleName = tempUserInfo.roleName || lsUserInfo.roleName;
        // debugger;
      }
      if (
        (tempUserInfo && tempUserInfo.nickName) ||
        (lsUserInfo && lsUserInfo.nickName)
      ) {
        this.nickName = tempUserInfo.nickName || lsUserInfo.nickName;
        // debugger;
      }
    },
    // 点击头部导航
    handleNavClick(pItem) {
      this.navActive = pItem.name;
      this.$router.push({ path: pItem.path });
    },

    // 跳转开发者信息
    goToInfo() {
      this.dialogVisible = true;
      // this.$router.push({ path: '/info' });
    },
    handleClose() {
      this.dialogVisible = false;
      this.registerData.password = '';
      this.registerData.confirmPsw = '';
    },
    passworInput(e) {
      // console.log(e.target.value);
      //  let regPsw = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
      // if (!regPsw.test(e.target.value)) {
      //     this.$message({
      //     type: 'warning',
      //     message: '请输入长度为6-16为数字字母组合'
      //   });
      // }
      // debugger;
    },
    save() {
      if (!this.registerData.password) {
        this.$message({
          type: 'warning',
          message: '不能为空'
        });
        return;
      }
      let regPsw = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
      if (!regPsw.test(this.registerData.password)) {
        this.$message({
          type: 'warning',
          message: '请输入长度为6-16为数字字母组合'
        });
        return;
      }
      let md5Pasword = Encrypt(this.registerData.password);
      console.log(md5Pasword);
      this.$store
        .dispatch('updatedPassword', { password: md5Pasword })
        .then(res => {
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: res.message
            });
            // console.log(md5Pasword);
            this.dialogVisible = false;
            this.registerData.password = '';
            this.registerData.confirmPsw = '';
            this.handleLogout();
          }
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err.message
          });
        });
    },
    enter() {
      this.isShow = true;
    },
    mouseleave() {
      this._timer = setTimeout(() => {
        this.isShow = false;
      }, 150);
    },
    sover() {
      // 清除定时器不然定时器继续执行
      clearTimeout(this._timer);
    },
    sout() {
      this.isShow = false;
    },

    // 跳转介绍页
    gotHome() {
      this.$router.push({ path: '/platformIntroduction' });
    },
    // 退出登陆
    async handleLogout() {
      debugger;
      try {
        await this.$store.dispatch('LogOut');
        this.$router.push({ name: '登陆' });
      } catch (e) {}
      // logout().then(res => {
      //   console.log(res);
      // });
    }
  }
};
</script>

<style lang="less" scoped>
.page-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #1d233c;
  z-index: 2000;
  // 覆盖
}
.page-header-container {
  height: 65px;
  margin: 0 auto;

  a {
    font-size: 16px;
    color: #fff;
  }
}
.logo-wrapper {
  margin-right: 55px;
  // padding: 18px 0;
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
}
.logo {
  display: inline-block;
  margin-right: 16px;
  vertical-align: middle;
}
.user-info-wrapper {
  position: relative;
  height: 65px;
}
.user-info-content {
  line-height: 65px;
  margin-right: 27px;
  span {
    display: inline-block;
    opacity: 0.7;
    font-size: 14px;
    color: #fff;
    letter-spacing: 0;
    vertical-align: middle;
    cursor: pointer;
  }
  .icon-down {
    width: 20px;
    height: 20px;
    background: url("../../../assets/img/doc_arrow2@2x.png") no-repeat center
      center;
    background-size: cover;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    transform: rotate(0deg);
    transition: transform 0.5s;
    &.rotate {
      -webkit-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      transform: rotate(180deg);
    }
  }
}
.icon-bell {
  position: absolute;
  top: 50%;
  right: 0;
  width: 14px;
  height: 18px;
  margin-top: -9px;
  background: url("../../../assets/img/msg@2x.png") no-repeat center center;
  background-size: cover;
}
.hide-user-info {
  position: absolute;
  top: 67px;
  left: 0;
  width: 140px;
  height: auto;
  background: #1d233c;
  border-radius: 4px;
  overflow: hidden;
}
.user-info-list {
  width: 100%;
  .list-item {
    a {
      display: block;
      padding-left: 16px;
      border-bottom: 1px solid #fff;
      line-height: 36px;
      font-size: 14px;
      color: #fff;
      opacity: 0.7;
    }
  }
}
.slideInfo-enter,
.slideInfo-leave-to {
  opacity: 0;
}
.slideInfo-enter-active,
.slideInfo-leave-active {
  transition: opacity 0.5s;
}

.page-nav {
  .page-nav-item {
    display: inline-block;
    // padding: 0 28px;
    line-height: 65px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s;

    span {
      opacity: 0.7;
      transition: all 0.3s;
    }
  }
}
.page-nav-item.nav-active {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1px;
  span {
    opacity: 1;
  }
}
</style>
