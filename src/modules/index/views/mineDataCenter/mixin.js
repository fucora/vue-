export const checkInfo = {
  methods: {
    // 邮箱校验
    checkEmailGet(rule, value, callback) {
      if (!value) {
        callback();
      } else {
        if (!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value)) {
          callback(new Error('邮箱格式不正确'));
        } else {
          callback();
        }
      }
    },
    // 用户id校验
    checkSn(rule, value, callback) {
      if (!value) {
        callback();
      } else {
        // 不能输入中文以及特殊字符只能输入数字以及英文字母以及小数点/[^\w\.\/]/ig
        // 不能输入中文以及特殊字符只能输入数字以及英文字母不包含小数点/[^\w\/]/ig
        if (/[^\w\.\/]/ig.test(value)) {
          callback(new Error('请输入正确的格式不允许输入特殊字符及中文'));
        } else {
          callback();
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
    // checkMobile (rule, value, callback) {
    //   if (!value) {
    //       callback();
    //     } else {
    //       if (!/^1\d{0,10}$/.test(value)) {
    //         callback(new Error('请输入不超过11位，且第一位是1的整数'));
    //       } else {
    //         callback();
    //       }
    //     }
    // }
  }
};
