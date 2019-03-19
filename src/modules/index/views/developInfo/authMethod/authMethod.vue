<template>
  <div class="page-container">
    <div class="page-main-con">
      <con-header :titleIcon="titleIcon1" title="企业认证"></con-header>
      <div class="page-form-wrapper">
        <div>
          <h3 class="form-title">方式1&nbsp;&nbsp;&nbsp;&nbsp;美的内部用户mip账户认证</h3>
          <el-form class="page-form" ref="mipForm" :model="mipFormData" :rules="mipFormRules" label-width="150px">
            <el-form-item label="mip账户" prop="mip">
              <el-input v-model.trim="mipFormData.mip"></el-input>
            </el-form-item>

            <el-form-item label="真实名字" prop="realName">
              <el-input v-model.trim="mipFormData.realName"></el-input>
            </el-form-item>

            <el-form-item label="事业部" prop="departmentName">
              <el-select class="departmentName"  @change="departmentNameChange" v-model="mipFormData.departmentId" clearable placeholder="请选择事业部">
                <el-option v-for="(item,index) in departmentNameOptions" :key="index" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="tool" ref="mipUpImg" prop="mipAuditUrl" label="上传mip用户截图">
                <div class="upload-btn upload-btn-img">
                  <el-upload class="upload-demo" list-type="picture-card" :on-preview="handlePictureCardPreview" :http-request="uploadImgApi" drag :action="'dddd'" multiple :limit="3" :file-list="fileList" :before-upload="beforeUpload" :on-success="uploadSuccess" :on-error="uploadError" :on-remove="uploadRemove">
                    <div>
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">点击或将文件拖拽到这里上传或<em>点击上传</em></div>
                    </div>
                  </el-upload>
                  <div class="el-upload__tip" slot="tip">支持扩展名：.jpeg,.gif,.png,.jpg，且不超过5M</div>
                  <el-dialog :width="'70%'" :visible.sync="dialogVisible">
                    <img width="100%" :src="mipFormData.mipAuditUrl" alt="">
                  </el-dialog>
                </div>
              <el-input v-if="false" v-model="mipFormData.mipAuditUrl"></el-input>
            </el-form-item>
            <el-form-item prop="agreement">
              <el-checkbox v-model="mipFormData.agreement">
                <span style="color: #606266;">勾选确认同意</span>
                <span style="color: #5667FF;" class="policy" @click.prevent="goAgreement">开发者协议</span>
              </el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="submitMipAuth">提交认证</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import conHeader from '@/components/awesome/con-header/con-header';
import commonFun from '@/common/js/func';
import { authMethodMixin } from '@/common/js/validation';
export default {
  mixins: [authMethodMixin],
  data() {
    return {
      dialogVisible: false,
      accept: '.jpeg,.gif,.png,.jpg',
      fileList: [],
      succfileList: [],
      titleIcon1: '/static/img/title_03@2x.png',
      mipFormData: {
        mip: '',
        realName: '',
        departmentName: '',
        mipAuditUrl: '',
        departmentId: '',
        agreement: []
      },
      departmentNameOptions: [],
      imageUrl1: '',
      imageUrl2: '',
      imageUrl3: '',
      mipFormRules: {
        agreement: { type: 'array', required: true, message: '请阅读开发者协议并勾选', trigger: 'change' },
        mip: { required: true, validator: this.checkMip, trigger: 'blur' },
        password: [
          { required: true, message: '请输入mip密码', trigger: 'blur' }
        ],
        mipAuditUrl: [
          {
            required: true,
            message: '上传mip用户截图',
            trigger: 'change'
          }
        ],
        realName: [
          { required: true, message: '请输入真实名字', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '请输入事业部', trigger: 'change' }
        ]
      }
    };
  },
  created() {
    this.getDepartmentAll({});
  },
  watch: {
    // 'mipFormData.mipAuditUrl': function (n, o) {
    //   debugger;
    // //  let ele = document.querySelector('.upload-demo>.el-upload.el-upload--picture-card');
    //  if (n) {
    //   //  ele.style.display = 'none';
    //  } else {
    //   //  ele.style.display = 'block';
    //  }
    // }
  },
  methods: {
    handlePictureCardPreview(file) {
        this.mipFormData.mipAuditUrl = file.url;
        this.dialogVisible = true;
    },
    goAgreement() {
      window.open('/static/staticData/agreement.html');
    },
    departmentNameChange(value) {
      this.mipFormData.departmentName = commonFun.fetchWord(
          value,
          'id',
          this.departmentNameOptions,
          'name'
        );
         debugger;
    },
    async getDepartmentAll(param) {
      try {
        await this.$store.dispatch('departmentAll', param).then(result => {
          this.departmentNameOptions = result.result;
          // debugger;
        });
      } catch (e) {}
    },
    // 提交mip认证
    submitMipAuth() {
      let param = this.mipFormData;
      // debugger;
      this.$refs['mipForm'] &&
        this.$refs['mipForm'].validate(valid => {
          if (!valid) return;
          if (!this.mipFormData.agreement) {
            this.$message({
              showClose: true,
              message: '请阅读开发者协议并勾选',
              type: 'error'
            });
            return;
          }
          this.handleMipAuth(param);
        });
    },
    // 上传的接口
    async handleMipAuth(param) {
      try {
        await this.$store.dispatch('mipAdd', param).then(result => {
          // debugger;
          if (result.code === 0) {
            this.$message({
              message: '提交认证成功，请等待平台审核' || result.message,
              type: 'success',
              onClose: () => {
                this.$router.push({ name: 'AuthenInfo' });
              }
            });
          }
        });
      } catch (e) {}
    },
    // 图片上传
    uploadImgApi(item) {
      // 传入参数uploadFile是后端需要的健
      let param = { uploadFile: item.file };
      this.getUpMipImg(param);
    },
    // 上传的接口
    async getUpMipImg(param) {
      try {
        await this.$store.dispatch('imgDoUpLoad', param).then(result => {
          if (result.code === 0) {
            // debugger;
            // this.upImgSrc = result.result;
            this.mipFormData.mipAuditUrl = result.result.url;
            this.mipFormData.name = result.result.originalFileName;

            this.fileList.splice(0, 1, {
              name: result.result.originalFileName,
              url: result.result.url
            });
            this.$refs.mipUpImg.clearValidate();
            this.$message({
              message: result.message,
              type: 'success'
            });
          }
        });
      } catch (e) {}
    },
    // 文件img上传前
    beforeUpload(file) {
      console.log(this.mipFormData.mipAuditUrl);
      // if (this.mipFormData.mipAuditUrl) {
      //   this.$message({
      //     type: 'error',
      //     message: '已上传，请不要重复上传'
      //   });
      //   return false;
      // }
      // commonFun.extMatch(file, this.accept, this);
      // commonFun.extMatchSize(file, 5, this);
      debugger;
      return (
        commonFun.extMatch(file, this.accept, this) &&
        commonFun.extMatchSize(file, 5, this)
      );
    },
    // 上传成功
    uploadSuccess(res, file, fileList) {
      debugger;
      this.fileList = fileList;
    },
    // 上传失败
    uploadError(err, file, fileList) {
      if (err) {
        this.$message({
          showClose: true,
          message: '文件上传失败',
          type: 'error'
        });
      }
    },
    // 移除文件时
    uploadRemove(file, fileList) {
      debugger;
      // if (fileList.length === 0) {
        this.fileList = fileList;
        this.mipFormData.mipAuditUrl = '';
      // }
      if (fileList.length === 1) {
        this.mipFormData.mipAuditUrl = fileList[0].url;
      }
      // this.fileList = fileList;
      // this.mipFormData.mipAuditUrl = '';
    }
  },
  components: {
    'con-header': conHeader
  }
};
</script>

<style lang="less" scoped>
@import './authMethod.less';
@deep: ~'>>>';
.el-upload__tip{
  // margin-top: -120px;
}
@{deep} .el-upload-list__item{
    transition: all 0s
}
@{deep} .el-upload-list--picture-card .el-upload-list__item-actions{
  transition: opacity 0s;
}
.el-select.departmentName{
  width: 100%;
}
</style>
