import request from '@/utils/admin-http';
const {
  APPLICATION_NAME
} = window.environment.iotserver;
const backgroundAccountManagement = {
  // 这是海外项目账户管理api
  addAccount: (query) => {
    return request({
      url: `${APPLICATION_NAME}/behind/admin/addUser`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  getAccountList: (query) => {
    return request({
      url: `${APPLICATION_NAME}/behind/admin/userList`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  forbidAccount: (query) => {
    return request({
      url: `${APPLICATION_NAME}/behind/admin/forbidUser`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  recoverAccount: (query) => {
    return request({
      url: `${APPLICATION_NAME}/behind/admin/recoverUser`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  updateUserAccount: (query) => {
    return request({
      url: `${APPLICATION_NAME}/behind/admin/updateUserPassword`,
      method: 'post',
      data: query
    }).then(res => res);
  }
};
export default backgroundAccountManagement;