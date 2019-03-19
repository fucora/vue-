<template>
  <div class="page-container">
    <div class="page-main-con">
      <con-header :title-icon="titleIcon1" title="企业认证信息"></con-header>
      <div class="table-wrapper-list">
        <!--开始认证方式列表-->
        <table v-if="isShowAuth" class="table-detail" border="1" bordercolor="#ebeef5">
          <tbody>
            <tr v-for="(val, key) in tableLabel" :key="key">
              <td class="col-label">
                <span>{{val}}</span>
              </td>
              <td class="col-content">
                <span v-if="typeof tableAuthenData[key] !== 'object'">
                  <span v-if="tableAuthenData[key]===0"><span class="mipAuthen">mip认证</span><span class="red">审核中</span></span>
                  <span v-else-if="tableAuthenData[key]===1"><span class="mipAuthen">mip认证</span><span class="red">企业认证成功</span></span>
                  <span v-else-if="tableAuthenData[key]===2" @click="goToAuthMethod"><span class="mipAuthen">mip认证</span><span class="red" style="cursor:pointer">认证失败，重新认证</span></span>
                  <span v-else>{{tableAuthenData[key]}}</span>
                </span>
                <div class="col-list" v-if="(typeof tableAuthenData[key] === 'object') && (tableAuthenData[key] instanceof Array)">
                  <div class="col-item" v-for="(mItem, index) in tableAuthenData[key]" :key="index">
                    <div class="col-img">
                      <img v-if="mItem.profilePicUrl" :src="mItem.profilePicUrl" alt="图片不存在" />
                    </div>
                    <p>mip账号：{{mItem.mip}}</p>
                    <p><span style="float: left">{{mItem.isGrouper===true?'组长：':'成员：'}}</span>{{mItem.realName}}</p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!--结束认证方式列表-->
      </div>
      <div v-if="!isShowAuth" class="uncertified-wrapper">
        <div class="uncertified">
          <label>认证方式:</label>
          <span class="uncer-text">未认证</span>
          <el-button type="text" @click="goToAuthMethod">去认证</el-button>
        </div>

        <div class="certified-operator">
          <label>认证后, 您可以:</label>
          <div class="operator-list">
            <div class="operator-item">
              <img class="operator-img" src="../../../img/office_01@2x.png" alt="图片不存在" />
              <span class="operator-title">开发硬件</span>
            </div>
            <div class="operator-item">
              <img class="operator-img" src="../../../img/office_02@2x.png" alt="图片不存在" />
              <span class="operator-title">开发应用</span>
            </div>
            <div class="operator-item">
              <img class="operator-img" src="../../../img/office_03@2x.png" alt="图片不存在" />
              <span class="operator-title">管理插件</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import conHeader from '@/components/awesome/con-header/con-header';
import {getUserManage} from '../../../api/developInfo/index';
export default {
  data() {
    return {
      titleIcon1: '/static/img/title_03@2x.png',
      id: '123456789',

      tableLabel: {
        status: '认证方式',
        enterpriseName: '企业名称',
        deparmentName: '开发组名称',
        // developTeamMembers: '开发组成员',
        crews: '开发组成员'
      },
      isShowAuth: true,
      tableAuthenData: {}
    };
  },
  methods: {
    // 去认证
    goToAuthMethod () {
      this.$router.push({name: 'AuthMethod'});
    },

    // 获取用户企业认证信息
    getUserAuthenInfo () {
      let params = {
        id: this.id
      };
      getUserManage(params).then(res => {
        // debugger;
        // console.log(res);
        if (res.code === 0) {
           this.tableAuthenData = res.result;
        } else {
          this.isShowAuth = false;
        }
      });
    }
  },
  mounted () {
    this.getUserAuthenInfo();
  },
  components: {
    'con-header': conHeader
  }
};
</script>

<style lang="less" scoped>
  @import './authenInfo.less';
  .mipAuthen{
    padding-right:10px;
  }
  .red{
    color: #FF0000;
  }
    .col-img{
    margin: 0 auto 10px;
  }
</style>
