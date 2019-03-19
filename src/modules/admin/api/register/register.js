import request from '@/utils/http';
const {
  APPLICATION_NAME
} = window.environment.iotserver;

// 注册api
export const register = (params) => {
  return request({
    url: `${APPLICATION_NAME}/user/register`,
    method: 'post',
    data: params
  }).then(res => res);
};

// 手机获取验证码api
export const getSmsCode = (params) => {
  return request({
    url: `${APPLICATION_NAME}/user/getSmsCode`,
    method: 'post',
    data: params
  }).then(res => res);
};
// 验证手机号码
export const verify = (params) => {
  return request({
    url: `${APPLICATION_NAME}/user/verify`,
    method: 'post',
    data: params
  }).then(res => res);
};
// // 手机获取验证码api
// export const getSmsCode = (params) => {
//   return request({
//     url: `${APPLICATION_NAME}/user/getSmsCode`,
//     method: 'post',
//     data: params
//   }).then(res => res);
// };

// 重置密码接口api
export const resetPsw = (params) => {
  return request({
    url: `${APPLICATION_NAME}/user/resetPassword`,
    method: 'post',
    data: params
  }).then(res => res);
};
