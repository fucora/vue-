export const backgroundAccountManagement = {
    methods: {
      // 邮箱校验
      checkEmail(rule, value, callback) {
        if (!value) {
          callback(new Error('请选择'));
        } else {
          if (!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value)) {
            callback(new Error('邮箱格式不正确'));
          } else {
            callback();
          }
        }
      },
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
      }
    }
  };