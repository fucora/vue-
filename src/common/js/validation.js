// 个人信息模块
export const authMethodMixin = {
  methods: {
    checkEmail(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入'));
      } else {
        if (!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value)) {
          callback(new Error('请输入正确的邮箱'));
        } else {
          callback();
        }
      }
    },
    checkMobile(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入手机号'));
      } else {
        if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
          callback(new Error('请输入正确的手机号'));
        } else {
          callback();
        }
      }
    },
    checkName(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入昵称'));
      } else {
        if (value.length > 20) {
          callback(new Error('输入内容在20字以下'));
        } else if (!/^[\u4e00-\u9fa5A-Za-z0-9-_]*$/.test(value)) {
          callback(new Error('不能输入特殊字符'));
        } else {
          callback();
        }
      }
    },
    checkMip(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入mip账号'));
      } else {
        if (value.length > 20) {
          callback(new Error('输入内容在20字以下'));
        } else if (/[\u4e00-\u9fa5]/.test(value)) {
          callback(new Error('不能输入中文内容'));
        } else {
          callback();
        }
      }
    },
    checkCode(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入'));
      } else {
        if (value.length > 50) {
          callback(new Error('输入内容在50字以下'));
        } else if (!/^[0-9a-zA-Z]*$/.test(value)) {
          callback(new Error('输入内容必须是数字或字母'));
        } else {
          callback();
        }
      }
    },
    checkSn8(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入产品型号码'));
      } else {
        if (value.length > 8) {
          callback(new Error('输入内容在8字以下'));
        } else {
          callback();
        }
      }
    }
  }
};
// 我的产品
export const productsMixin = {
  methods: {
    checkModelNumber(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入model number'));
      } else {
        if (value.length > 20) {
          callback(new Error('输入内容在20字以下'));
        } else if (/^[0]/.test(value)) {
          callback(new Error('不能以0开头'));
        } else if (!/^[0-9]*$/.test(value)) {
          callback(new Error('只能是纯数字'));
        } else {
          callback();
        }
      }
    },
    checkSn8(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入产品型号码'));
      } else {
        if (value.length > 8) {
          callback(new Error('输入内容在8字以下'));
        } else if (!/^[\u4e00-\u9fa5A-Za-z0-9-_]*$/.test(value)) {
          callback(new Error('不能输入特殊字符'));
        } else {
          callback();
        }
      }
    },
    checkProductName(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入产品名称'));
      } else {
        if (value.length > 20) {
          callback(new Error('输入内容在20字以下'));
        } else if (!/^[\u4e00-\u9fa5A-Za-z0-9-_]*$/.test(value)) {
          callback(new Error('不能输入特殊字符'));
        } else {
          callback();
        }
      }
    },
    checkDiscription(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入产品描述'));
      } else {
        if (value.length > 200) {
          callback(new Error('输入内容在200字以下'));
        } else {
          callback();
        }
      }
    },
    // 新增产品的弹框
    productTool(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入芯片交叉编译工具包地址'));
      } else {
        if (value.length > 1024) {
          callback(new Error('输入内容在1024字以下'));
        } else {
          callback();
        }
      }
    },
    productParam(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入定制化编译参数'));
      } else {
        if (value.length > 1024) {
          callback(new Error('输入内容在1024字以下'));
        } else {
          callback();
        }
      }
    },
    productDiscription(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入功能说明'));
      } else {
        if (value.length > 1024) {
          callback(new Error('输入内容在1024字以下'));
        } else {
          callback();
        }
      }
    }
  }
};
// 日志
export const logQueryMixin = {
  methods: {
    checkSn(rule, value, callback) {
      if (!value) {
        callback();
      } else {
        if (value.length > 50) {
          callback(new Error('输入内容在50字以下'));
        } else if (/[^\w\.\/]/ig.test(value)) {
          callback(new Error('请输入正确的格式不允许输入特殊字符及中文'));
        } else {
          callback();
        }
      }
    },
    checkDeviceId(rule, value, callback) {
      if (!value) {
        callback();
      } else {
        if (value.length > 50) {
          callback(new Error('输入内容在50字以下'));
        } else if (/[^\w\.\/]/ig.test(value)) {
          callback(new Error('请输入正确的格式不允许输入特殊字符及中文'));
        } else {
          callback();
        }
      }
    }
  }
};
