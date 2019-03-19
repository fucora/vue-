<template>
    <div>
        <el-form label-position="left" label-width="100px" :model="form" ref="form" :rules="rules">
            <el-form-item label="设备SN" prop="sn">
                <el-input v-model="form.sn"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
           <el-button type="primary" @click="handleSave">提 交</el-button>
        </div>
    </div>
</template>
<script>
import { toolCaseMixin } from '../mixin';
import API from '@/modules/index/api/toolCase/index.js';
export default {
  mixins: [toolCaseMixin],
  props: {
    flag: {
      type: Boolean
    }
  },
  watch: {
    flag: {
      handler(nowVal, oldVal) {
        if (nowVal === true) {
          this.$refs['form'] &&
          this.$refs['form'].resetFields();
        }
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      form: {
        sn: ''
      },
      rules: {
        sn: [{ required: true, validator: this.checkSn, trigger: 'blur' }]
      }
    };
  },
  methods: {
    handleSave() {
      this.$refs['form'] &&
        this.$refs['form'].validate(valid => {
          if (!valid) {
            return;
          }
          this.addSubmit();
        });
    },
    addSubmit () {
      let params = {
        ...this.form
      };
      // params;
      API.addSn(params).then(res => {
        if (res.code === 0) {
            this.$message({
                type: 'success',
                message: '提交成功，待后台审核通过，即可进行SN切换。'
            });
            this.$emit('close', false);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.dialog-footer {
  text-align: center;
}
</style>
