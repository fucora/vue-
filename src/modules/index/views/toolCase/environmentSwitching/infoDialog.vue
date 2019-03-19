<template>
  <div>
    <div class="title">
      <span>状态:</span>
      <span v-if="luaFormData.status === 0">等待执行</span>
      <span v-if="luaFormData.status === 1">成功</span>
      <span v-if="luaFormData.status === 2">失败重试中</span>
      <span v-if="luaFormData.status === 3">失败</span>
    </div>
    <div class="dialog-body">
      <el-form ref="lua-form" :model="luaFormData" label-width="128px" label-position="left">
        <el-form-item label="设备SN">
          <p>{{luaFormData.sn}}</p>
        </el-form-item>
        <el-form-item label="当前环境">
          <p v-if="luaFormData.originalEnv === 0">{{'国内DEV'}}</p>
          <p v-if="luaFormData.originalEnv === 1">{{'国内SIT'}}</p>
          <p v-if="luaFormData.originalEnv === 2">{{'国内PROD'}}</p>
        </el-form-item>
        <el-form-item label="在线状态">
          <p>{{'在线'}}</p>
          <!-- <p v-if="luaFormData.onlineStatus === 1">{{'在线'}}</p>
          <p v-if="luaFormData.onlineStatus === 2">{{'不存在'}}</p> -->
        </el-form-item>
        <el-form-item label="wifi固件版本">
          <p>{{luaFormData.wifiVersion}}</p>
        </el-form-item>
        <el-form-item label="目标环境">
          <p v-if="luaFormData.targetEnv === 0">{{'国内DEV'}}</p>
          <p v-if="luaFormData.targetEnv === 1">{{'国内SIT'}}</p>
          <p v-if="luaFormData.targetEnv === 2">{{'国内PROD'}}</p>
        </el-form-item>
        <el-form-item label="切换原因">
          <p>{{luaFormData.reason}}</p>
        </el-form-item>

        <el-form-item label="提交人" >
          <p>{{luaFormData.account}}</p>
        </el-form-item>
        <el-form-item label="提交时间" >
          <p>{{luaFormData.createTime}}</p>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// import API from '@/modules/index/api/toolCase/index.js';
export default {
  props: {
    infoId: {
      type: Number
    },
    luaFormData: {
      type: Object,
      default: {}
    },
    flag: {
      type: Boolean
    }
  },
  data() {
    return {
      // luaFormData: {}
    };
  },
  watch: {
    flag: {
      handler(nowVal, oldVal) {
        if (nowVal === true) {
          // this.getLuaDetail();
        }
      },
      deep: true,
      immediate: true
    }
  },
  // mounted() {
  //   this.getLuaDetail();
  // },
  methods: {
    // 详情
    // getLuaDetail() {
    //   let params = {
    //     id: this.infoId
    //   };
    //   API.saveSnSwithchInfo(params).then(res => {
    //     if (res.code === 0) {
    //       // this.init(res);
    //       this.luaFormData = res.result;
    //     }
    //   });
    // }
  }
};
</script>
<style lang="less" scoped>
.title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 15px;
  color: black;
  // margin-left: 74px;
}
.dialog-footer {
  display: flex;
  -ms-flex-pack: center;
  justify-content: flex-end;
  margin-right: 30px;
}
.dialog-body{
  .el-form-item{
    margin-bottom: 0;
  }
  .click-download{
    color: blue;
    cursor: pointer;
  }
  .click-download1{
    color: blue;
  }
  p{
      word-wrap: break-word;
  }
}
// @deep: ~">>>";
// .upload-demo{
//  @{deep} .el-upload{
//     width: 100%;
//   }
// }
// .addlua-upload {
//   width: 100%;
//   @{deep}.el-upload-dragger {
//     // width: 412px;
//         width: 100%;
//   }
// }
</style>