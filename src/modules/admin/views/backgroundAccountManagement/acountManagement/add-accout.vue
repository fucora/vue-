<template>
    <div>
        <el-form label-position="left" label-width="70px" :model="form" ref="form" :rules="rules">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
           <el-button type="primary" @click="handleSave">提 交</el-button>
        </div>
    </div>
</template>
<script>
import { backgroundAccountManagement } from '../mixin';
import API from '@/modules/admin/api/backgroundAccountManagement/index.js';
export default {
  mixins: [backgroundAccountManagement],
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
        email: ''
      },
      rules: {
        email: [{ required: true, validator: this.checkEmail, trigger: 'blur' }]
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
      console.log(params);
      API.addAccount(params).then(res => {
        if (res.code === 0) {
            this.$message({
                type: 'success',
                message: res.message
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