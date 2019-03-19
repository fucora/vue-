export const toolCaseMixin = {
    methods: {
      // 当前环境校验
      checkEnv(rule, value, callback) {
        if (!value && value !== 0) {
          callback(new Error('请选择'));
        } else {
          if (value === this.luaFormData.targetEnv) {
            callback(new Error('当前环境和目标环境不能一样'));
            // this.$refs['lua-form'].validateField('targetEnv', (phoneError) => {});
          } else {
            callback();
          }
        }
      },
      // 目标环境校验
      checkTargetEnv(rule, value, callback) {
          if (!value && value !== 0) {
            callback(new Error('请选择'));
          } else {
            if (value === this.luaFormData.originalEnv) {
              callback(new Error('当前环境和目标环境不能一样'));
              // this.$refs['lua-form'].validateField('env', (phoneError) => {});
            } else {
              callback();
            }
          }
        },
      // 切换原因校验
      checkFunctionDescription(rule, value, callback) {
        if (!value) {
          callback(new Error('请输入'));
        } else {
          if (value.length > 60) {
            callback(new Error('输入文本长度不能超过60位'));
          } else {
            callback();
          }
        }
      },
      // sn校验
      checkSn(rule, value, callback) {
        if (!value) {
          callback(new Error('请输入'));
        } else {
          if (value.length !== 32) {
            callback(new Error('请输入正确的格式,SN为32位字符'));
          } else {
            debugger;
            if (!/^[0-9]*$/.test(value.substring(0, 4))) {
              callback(new Error('请输入正确的格式,SN前4位是数字组合'));
            } else if (!/^[0-9A-Z]*$/g.test(value.substring(4, 6))) {
              callback(new Error('请输入正确的格式,SN第5位-第6位是品类码后两位'));
            } else if (!/^[0-9a-zA-Z]*$/g.test(value.substring(6, 32))) {
              callback(new Error('请输入正确的格式,SN后26位只能输入字母，数字或字母数字组合'));
            } else {
              callback();
            }
          }
        }
      },
      // 用户uid校验
      checkUid(rule, value, callback) {
        if (!value) {
          callback();
        } else {
          // 不能输入中文以及特殊字符只能输入数字以及英文字母以及小数点/[^\w\.\/]/ig
          // 不能输入中文以及特殊字符只能输入数字以及英文字母不包含小数点/[^\w\/]/ig
          if (!/^[0-9a-zA-Z]+$/.test(value)) {
            callback(new Error('请输入正确的格式不允许输入特殊字符及中文'));
          } else {
            callback();
          }
        }
      },
      // 用户id校验
      checkId(rule, value, callback) {
        if (!value) {
          callback();
        } else {
          if (!/^[1-9]\d*$/.test(value)) {
            callback(new Error('请输入正确的设备ID只能输入正整数'));
          } else {
            callback();
          }
        }
      },
      checkUserId(rule, value, callback) {
        if (!value) {
          callback();
        } else {
          if (!/^[1-9]\d*$/.test(value)) {
            callback(new Error('请输入正确的用户id只能输入正整数'));
          } else {
            callback();
          }
        }
      },
      // 用户手机号校验
      checkMobile(rule, value, callback) {
        if (!value) {
          callback();
        } else {
          if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
            callback(new Error('请输入正确的手机号'));
          } else {
            callback();
          }
        }
      }
    }
  };