import request from '@/utils/http';
const {
  APPLICATION_NAME,
  MJAPP_NAME
} = window.environment.iotserver;

// export const getUserManage = (params) => {
//   return request({
//     url: `${APPLICATION_NAME}/role/manage`,
//     method: 'post',
//     data: params
//   }).then(res => res);
// };
// 获取该用户的认证信息

export const getUserManage = (params) => {
  return request({
    url: `${APPLICATION_NAME}/mip/get`,
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

// 绑定手机号
export const bindMobile = (params) => {
  return request({
    url: `${MJAPP_NAME}/user/third/bind/mobiles`,
    method: 'post',
    data: params
  }).then(res => res);
};

// mip认证接口
export const mipAuth = (params) => {
  return request({
    url: `${APPLICATION_NAME}/mip/cas/auth`,
    method: 'post',
    data: params
  }).then(res => res);
};
