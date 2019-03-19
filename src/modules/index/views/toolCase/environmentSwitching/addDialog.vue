<template>
  <div class="add-env-mine">
    <div class="title">
        状态：新建
    </div>
    <div class="dialog-body">
      <el-form ref="lua-form" :model="luaFormData" :rules="luaFormRules" label-width="128px" label-position="left">

        <el-form-item label="设备SN" prop="sn">
          <el-row>
            <el-col :span="22">
              <el-select filterable v-model="luaFormData.sn" clearable style="width: 100%;" @change="snChange">
                <el-option
                  v-for="item in snList"
                  :key="item.id"
                  :label="item.sn"
                  :value="item.sn"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="2">
              <el-button type="text" @click="addSn">新增SN</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="当前环境" prop="originalEnv">
          <el-row>
            <el-col :span="22">
              <el-select filterable v-model="luaFormData.originalEnv" clearable style="width: 100%;" @change="envChange">
                <el-option
                  v-for="item in envList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="2">
              <el-button type="text" @click="checkInfo()" :disabled="checkFlag">查询</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="提示">
          <p style="color: red;"> 点击查询,将自动获取在线状态及wifi固件版本号,为保证切换成功，请确保设备在线, 并且设备在线时才能提交</p>
        </el-form-item>

        <el-form-item label="在线状态" prop="onlineStatus">
          <el-select v-model="luaFormData.onlineStatus" disabled style="width: 100%;" placeholder="">
            <el-option v-for="item  in statusList" :key="item.id" :value="item.id" :label="item.name">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="wifi固件版本号" prop="wifiVersion">
          <el-input v-model="luaFormData.wifiVersion" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="目标环境" prop="targetEnv">
          <el-select v-model="luaFormData.targetEnv" clearable style="width: 100%;" @change="targetEnvChange">
            <el-option
              v-for="pro in envList"
              :key="pro.id"
              :label="pro.name"
              :value="pro.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="切换原因" prop="reason">
          <el-input type="textarea" v-model.trim="luaFormData.reason"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleSave" :disabled="submitFlag">提 交</el-button>
    </div>

    <mine-dialog :dialogFormVisible='addSnFlag' :appendToBody="true" :center="true" :modal="true" :width='"40%"' :modalFlag="modalFlag" @close="close" :title="title" :showClose="showClose">
      <add-sn slot="option" @close="close" :flag="addSnFlag"></add-sn>
    </mine-dialog>

  </div>
</template>
<script>
// import commonFun from '@/common/js/func';
import { toolCaseMixin } from '../mixin';
import mineDialog from '@/modules/index/components/mine-dialog';
import addSn from './addSn';
import API from '@/modules/index/api/toolCase/index.js';
export default {
  mixins: [toolCaseMixin],
  components: {
    mineDialog,
    addSn
  },
  props: {
    flag: {
      type: Boolean
    }
  },
  data() {
    return {
      // 是否显示按钮
      showClose: true,
      modalFlag: false,
      title: '',
      addSnFlag: false,
      snList: [],
      envList: [
        {name: '国内DEV', id: 0},
        {name: '国内SIT', id: 1},
        {name: '国内PROD', id: 2}
      ],
      statusList: [
        {name: '离线', id: 0},
        {name: '在线', id: 1},
        {name: '不存在', id: 2}
      ],
      luaFormData: {
        sn: '',
        originalEnv: '',
        onlineStatus: '',
        wifiVersion: '',
        targetEnv: '',
        reason: ''
      },
      luaFormRules: {
        onlineStatus: [{ required: true, message: '请查询', trigger: 'change' }],
        wifiVersion: [{ required: false, message: '请查询', trigger: 'change' }],
        sn: [{ required: true, message: '请选择', trigger: 'change' }],
        originalEnv: [{ required: true, validator: this.checkEnv, trigger: 'change' }],
        targetEnv: [{ required: true, validator: this.checkTargetEnv, trigger: 'change' }],
        reason: { required: true, validator: this.checkFunctionDescription, trigger: 'blur' }
      }
    };
  },
  computed: {
    checkFlag () {
      return !(this.luaFormData.sn && (this.luaFormData.originalEnv || this.luaFormData.originalEnv === 0));
    },
    submitFlag () {
      if (this.luaFormData.onlineStatus === 1) {
        return false;
      } else {
        return true;
      }
    }
  },
  watch: {
    flag: {
      handler(nowVal, oldVal) {
        if (nowVal === true) {
          this.$refs['lua-form'] &&
          this.$refs['lua-form'].resetFields();
          this.getSnList();
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getSnList () {
      // this.snList = [{id: 1, name: '11111'}];
      API.getSnSelect({}).then(res => {
        if (res.code === 0) {
          this.snList = res.result;
        } else {
          this.snList = [];
        }
      });
    },
    envChange (val) {
      // debugger;
      this.luaFormData.onlineStatus = '';
      this.luaFormData.wifiVersion = '';
      if (this.luaFormData.targetEnv) {
        this.$refs['lua-form'].validateField('targetEnv', (phoneError) => {});
      }
    },
    targetEnvChange (val) {
      // debugger;
      this.$refs['lua-form'].validateField('originalEnv', (phoneError) => {});
    },
    snChange (val) {
      this.luaFormData.onlineStatus = '';
      this.luaFormData.wifiVersion = '';
    },
    // 查询
    checkInfo () {
      // 这里模拟调用后段接口
      // this.luaFormData.onlineStatus = 1;
      // this.luaFormData.wifiVersion = 1;
      let params = {
        sn: this.luaFormData.sn,
        originalEnv: this.luaFormData.originalEnv
      };
      API.snSwithchInfo(params).then(res => {
        if (res.code === 0) {
          this.luaFormData.onlineStatus = res.result.onlineStatus;
          this.luaFormData.wifiVersion = res.result.wifiVersion ? res.result.wifiVersion : '无版本号';
        }
      });
    },
    // 新增sn弹框
    addSn () {
      this.title = '新增SN';
      this.addSnFlag = true;
      this.modalFlag = true;
    },
    close (val) {
      this.addSnFlag = val;
    },
    // 新增提交
    addSubmit(publicStatus) {
      console.log('成功提交');
      // 翻译品类名称
    //   this.luaFormData.applianceType = commonFun.fetchWord(
    //       this.luaFormData.applianceTypeId,
    //       'id',
    //       this.applianceTypeOpts,
    //       'type'
    //     );
      let params = {
        ...this.luaFormData
      };
      // params;
      API.saveSnSwithch(params).then(res => {
        if (res.code === 0) {
            this.$message({
                type: 'success',
                message: res.message
            });
            this.$emit('handleSave', false);
        }
      });
    },
    // 提交
    handleSave() {
      this.$refs['lua-form'] &&
        this.$refs['lua-form'].validate(valid => {
          if (!valid) {
            return;
          }
          // 多一个校验必须设备在线才能提交
          if (this.luaFormData.onlineStatus !== 1) {
            this.$message({
              message: '在线状态为在线时才能提交',
              type: 'warning'
            });
            return;
          }
          this.addSubmit();
        });
    }
  }
};
</script>
<style lang="less" scoped>
#app {
  .el-button.el-button--text.is-disabled {
  color: #c0c4cc;
 }
}
#app {
  .el-button--primary.is-disabled{
    background-color: #c0c4cc;
    border-color: #c0c4cc;
  }
}
.title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 15px;
  color: black;
  // margin-left: 74px;
}
.dialog-footer {
  text-align: center;
  // display: flex;
  // -ms-flex-pack: center;
  // justify-content: flex-end;
  // margin-right: 30px;
}
@deep: ~">>>";
.upload-demo{
 @{deep} .el-upload{
    // width: 100%;
  }
}
.addlua-upload {
  width: 100%;
  @{deep}.el-upload-dragger {
    // width: 412px;
        width: 100%;
  }
}
</style>

