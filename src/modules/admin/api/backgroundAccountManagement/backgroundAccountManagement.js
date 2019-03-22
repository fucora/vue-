import request from '@/utils/http';
// const {
//   APPLICATION_NAME
// } = window.environment.iotserver;
const APPLICATION_NAME = 'http://devadmin-dev.msmartlife.com/ucenterAdminWeb/v1/iotserver';
const backgroundAccountManagement = {
  // SN白名单管理
  getSnList: (query) => {
    return request({
      url: `${APPLICATION_NAME}/sn/list`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  recoverSn: (query) => {
    return request({
      url: `${APPLICATION_NAME}/sn/recover`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  forbidSn: (query) => {
    return request({
      url: `${APPLICATION_NAME}/sn/forbid`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  // 这是海外项目账户管理api
  addAccount: (query) => {
    return request({
      url: `${APPLICATION_NAME}/behind/admin/add`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  getAccountList: (query) => {
    return request({
      url: `${APPLICATION_NAME}/behind/admin/list`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  forbidAccount: (query) => {
    return request({
      url: `${APPLICATION_NAME}/behind/admin/forbid`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  recoverAccount: (query) => {
    return request({
      url: `${APPLICATION_NAME}/behind/admin/recover`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  updateUserAccount: (query) => {
    return request({
      url: `${APPLICATION_NAME}/behind/admin/updateUser`,
      method: 'post',
      data: query
    }).then(res => res);
  }
};
export default backgroundAccountManagement;