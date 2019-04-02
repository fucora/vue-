export const backgroundAccountManagement = {
    methods: {
      // 邮箱校验 /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      checkEmail(rule, value, callback) {
        if (!value) {
          callback(new Error('请输入'));
        } else {
          if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
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
          if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
            callback(new Error('邮箱格式不正确'));
          } else {
            callback();
          }
        }
      }
    }
  };