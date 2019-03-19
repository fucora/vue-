<template>
  <div class="page-container">
    <div class="page-main-con">
      <con-header :title-icon="titleIcon1" title="个人信息"></con-header>
      <div class="page-form-wrapper">
        <el-form class="page-form" ref="userForm" :model="userFormData" :rules="rules" label-width="150px">
          <el-form-item label="登录账号">
            <div class="account">{{userFormData.mobile}}</div>
          </el-form-item>

          <el-form-item label="昵称" prop="nickName">
            <el-input v-model.trim="userFormData.nickName"></el-input>
          </el-form-item>

          <!-- <el-form-item label="绑定手机号">
            <div class="bind-phone">
              <span class="phone">{{userFormData.mobile}}</span>
              <span class="un-bind">未绑定</span>
              <el-button type="text" @click.prevent="goToBindTel">去绑定</el-button>
            </div>
          </el-form-item> -->

          <el-form-item label="登录密码">
            <div class="password">
              <span>******</span>
              <el-button class="modify-psw" type="text" @click.prevent="goToModifyPsw">重置密码</el-button>
            </div>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model.trim="userFormData.email"></el-input>
          </el-form-item>
          <el-form-item label="联系地址" class="person-address" prop="address">
            <v-distpicker :province="select.province" :city="select.city" :area="select.area" @province='one' @city="two" @area="three"></v-distpicker>
            <el-input v-model="userFormData.addressInput" style="margin-top: 20px" class="addressInput" @input="addressInput"></el-input>
            <el-input v-model="userFormData.address" type="hidden"></el-input>
          </el-form-item>
          <!-- <el-form-item label="联系地址" prop="address">
            <v-distpicker @province='one' @city="two" @area="three"></v-distpicker>
            <el-input v-model="userFormData.address" type="hidden"></el-input>
            <el-input v-model.trim="userFormData.detialAddress"></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" size="medium" @click="handlSave">保存修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import conHeader from '@/components/awesome/con-header/con-header';
import VDistpicker from 'v-distpicker';
// import { moduleVendorMixin } from '@/modules/index/views/mineSystem/mixin';
import { authMethodMixin } from '@/common/js/validation';
import ls from '@/utils/storage/local_storage';
// import { doSubmit, restData } from '@/modules/index/api/system/common.js';
export default {
  mixins: [authMethodMixin],
  data() {
    return {
      oldData: {},
      select: {
        province: '',
        city: '',
        area: ''
      },
      titleIcon1: '/static/img/title_01@2x.png',
      userFormData: {
        account:
          this.$store.getters.userInfo.name ||
          JSON.parse(ls.getItem('userInfo')).name,
        nickName: '',
        mobile:
          this.$store.getters.userInfo.mobile ||
          JSON.parse(ls.getItem('userInfo')).mobile,
        password: '******',
        email: '',
        detialAddress: '',
        address: '',
        addressInput: ''
      },
      rules: {
        nickName: {
          required: true,
          validator: this.checkName,
          trigger: 'blur'
        },
        email: { required: true, validator: this.checkEmail, trigger: 'blur' },
        mobile: {
          required: true,
          validator: this.checkMobile,
          trigger: 'change'
        },
        address: { required: true, message: '请选择地区', trigger: 'change' }
      }
    };
  },
  methods: {
    addressInput(val) {
      if (
        !val ||
        !this.select.province ||
        !this.select.city ||
        !this.select.area
      ) {
        this.userFormData.address = '';
      } else {
        this.userFormData.address =
          this.select.province +
          ',' +
          this.select.city +
          ',' +
          this.select.area +
          ',' +
          this.userFormData.addressInput;
      }
    },
    initAddres(val) {
      if (val.value === '省' || val.value === '市' || val.value === '区') {
        return '';
      } else {
        return val.value;
      }
    },
    one(val) {
      this.select.province = this.initAddres(val);
      if (
        !this.userFormData.addressInput ||
        !this.select.province ||
        !this.select.city ||
        !this.select.area
      ) {
        this.userFormData.address = '';
      } else {
        this.userFormData.address =
          this.select.province +
          ',' +
          this.select.city +
          ',' +
          this.select.area +
          ',' +
          this.userFormData.addressInput;
      }
    },
    two(val) {
      this.select.city = this.initAddres(val);
      if (
        !this.userFormData.addressInput ||
        !this.select.province ||
        !this.select.city ||
        !this.select.area
      ) {
        this.userFormData.address = '';
      } else {
        this.userFormData.address =
          this.select.province +
          ',' +
          this.select.city +
          ',' +
          this.select.area +
          ',' +
          this.userFormData.addressInput;
      }
    },
    three(val) {
      this.select.area = this.initAddres(val);
      if (
        !this.userFormData.addressInput ||
        !this.select.province ||
        !this.select.city ||
        !this.select.area
      ) {
        this.userFormData.address = '';
      } else {
        this.userFormData.address =
          this.select.province +
          ',' +
          this.select.city +
          ',' +
          this.select.area +
          ',' +
          this.userFormData.addressInput;
        debugger;
      }
    },
    handlSave() {
      let param = {
        ...this.userFormData,
        ...this.select
      };
      let isUpdata = false;
      console.log(param);
      this.$refs['userForm'] &&
        this.$refs['userForm'].validate(valid => {
          if (!valid) {
            return;
          }
          // console.log(param);
          // console.log(this.oldData);
          for (const key in this.oldData) {
            if (param.hasOwnProperty(key)) {
              const ele = this.oldData[key];
              if (param[key] !== ele) {
                //  return;
                isUpdata = true;
              }
              // console.log(ele);
            }
          }
          // debugger;
          if (isUpdata) {
            // debugger;
            this.$store.dispatch('update', param).then(result => {
              if (result.code === 0) {
                this.$message({
                  message: result.message,
                  type: 'success',
                  onClose: () => {
                    this.getUserInfo();
                  }
                });
              }
            });
          } else {
            this.$message({
              message: '您未作任何修改',
              type: 'warning'
              // onClose: () => {
              //   this.getUserInfo();
              // }
            });
          }
        });
    },
    // 修改密码
    goToModifyPsw() {
      this.$router.push({ name: '忘记密码' });
    },
    // 跳转绑定手机号
    goToBindTel() {
      // this.$router.push({ name: 'BindTel' });
    },
    getUserInfo() {
      this.$store.dispatch('getUserInfo', '').then(result => {
        debugger;
        console.log(result);
        if (result.code === 0) {
          this.userFormData.account = result.result.account;
          this.userFormData.email = result.result.email;
          this.userFormData.nickName = result.result.nickName;
          let tempAddresArr = result.result.address.split(',');
          this.select.province = tempAddresArr[0];
          this.select.city = tempAddresArr[1];
          this.select.area = tempAddresArr[2];
          console.log(this.select);
          this.userFormData.addressInput = tempAddresArr[3];
          this.oldData.account = result.result.account;
          this.oldData.email = result.result.email;
          this.oldData.nickName = result.result.nickName;
          // this.oldData.nickName = result.result.nickName;
          this.oldData.province = tempAddresArr[0];
          this.oldData.city = tempAddresArr[1];
          this.oldData.area = tempAddresArr[2];
          this.oldData.addressInput = tempAddresArr[3];
        }
      });
    }
  },
  components: {
    'con-header': conHeader,
    VDistpicker
  },
  mounted() {
    this.getUserInfo();
  }
};
</script>

<style lang="less" scoped>
@import './personInfo.less';
.distpicker-address-wrapper {
  display: flex;
  & > select {
    flex: 1;
  }
}
@deep: ~'>>>';
.person-address{
@{deep} .distpicker-address-wrapper{
   select {
    width: 100%;
    flex: 1;
  }
}
}


</style>
