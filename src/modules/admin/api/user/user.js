import request from '@/utils/http';
const {
  APPLICATION_NAME
} = window.environment.iotserver;
// debugger;
// export const loginByUsername = (params) => {
//   return request({
//     url: `${APPLICATION_NAME}/login`,
//     method: 'post',
//     data: params
//   }).then(res => res);
// };

const API = {
  // 登陆
  loginByUsername: (params) => {
    return request({
      url: `${APPLICATION_NAME}/login`,
      method: 'post',
      data: params
    });
  },
  // 获取登陆用户权限数组
  getAuthedList: (params) => {
    return request({
      url: `${APPLICATION_NAME}/user/findMenus`,
      method: 'post',
      data: params
    });
  },
  logout: () => {
    return request({
      url: `${APPLICATION_NAME}/logout`,
      method: 'post'
    });
  },
  // 个人用户更新
  update: (params) => {
    return request({
      url: `${APPLICATION_NAME}/user/update`,
      method: 'post',
      data: params
    });
  },
  departmentAll: (params) => {
    return request({
      url: `${APPLICATION_NAME}/department/all`,
      method: 'post',
      data: params
    });
  },
  mipAdd: (params) => {
    return request({
      url: `${APPLICATION_NAME}/mip/add`,
      method: 'post',
      data: params
    });
  },
  getUser: (params) => {
    return request({
      url: `${APPLICATION_NAME}/user/get`,
      method: 'post',
      data: params
    });
  }
  // /user/ update
  // // wifiSdk信息列表
  // wifiSdkGetList: (query) => {
  //   return request({
  //     url: `${APPLICATION_NAME}/hardware/wifiSdkGetList`,
  //     method: 'post',
  //     params: query
  //   });
  // },
  // // /硬件详情列表
  // getHardwareProductDetails: (query) => {
  //   return request({
  //     url: `${APPLICATION_NAME}/hardware/getHardware`,
  //     method: 'post',
  //     params: query
  //   });
  // }
};

export default API;
