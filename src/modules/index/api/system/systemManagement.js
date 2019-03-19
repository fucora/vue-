import request from '@/utils/http';
const {
  APPLICATION_NAME
} = window.environment.iotserver;
const systemManagementApi = {
  // 用户mip认证api
  mipList: (query) => {
    return request({
        url: `${APPLICATION_NAME}/mip/list`,
        method: 'post',
        data: query
    }).then(res => res);
  },
  mipAudit: (query) => {
    return request({
        url: `${APPLICATION_NAME}/mip/audit`,
        method: 'post',
        data: query
    }).then(res => res);
  },
  // 角色管理相关api
  roleList: (query) => {
      return request({
          url: `${APPLICATION_NAME}/role/list`,
          method: 'post',
          data: query
      }).then(res => res);
    },
    roleInfoList: (query) => {
      return request({
          url: `${APPLICATION_NAME}/role/allUsers`,
          method: 'post',
          data: query
      }).then(res => res);
    },
    addRole: (query) => {
      return request({
        url: `${APPLICATION_NAME}/role/add`,
        method: 'post',
        data: query
      }).then(res => res);
    },
    delRole: (query) => {
      return request({
        url: `${APPLICATION_NAME}/role/delete`,
        method: 'post',
        data: query
      }).then(res => res);
    },
    // 菜单管理API
    allRole: (query) => {
      return request({
          url: `${APPLICATION_NAME}/role/get`,
          method: 'post',
          data: query
      }).then(res => res);
    },
    permission: (query) => {
      return request({
        url: `${APPLICATION_NAME}/role/permission/get`,
        method: 'post',
        data: query
      }).then(res => res);
    },
    allAuthed: () => {
      return request({
        url: `${APPLICATION_NAME}/user/findMenus`,
        method: 'post'
      }).then(res => res);
    },
    updateAuth: (query) => {
      return request({
        url: `${APPLICATION_NAME}/role/auth`,
        method: 'post',
        data: query
      }).then(res => res);
    },
    // 账户管理API
    getUserList: (query) => {
      return request({
        url: `${APPLICATION_NAME}/user/list`,
        method: 'post',
        data: query
      }).then(res => res);
    },
    getAllRoll: () => {
      return request({
        url: `${APPLICATION_NAME}/role/all`,
        method: 'post'
      }).then(res => res);
    },
    deleteUser: (query) => {
      return request({
        url: `${APPLICATION_NAME}/user/delete`,
        method: 'post',
        data: query
      }).then(res => res);
    },
    recoverUser: (query) => {
      return request({
        url: `${APPLICATION_NAME}/user/recover`,
        method: 'post',
        data: query
      }).then(res => res);
    },
    authChange: (query) => {
      return request({
        url: `${APPLICATION_NAME}/user/auth`,
        method: 'post',
        data: query
      }).then(res => res);
    },
    addUser: (query) => {
      return request({
        url: `${APPLICATION_NAME}/user/add`,
        method: 'post',
        data: query
      }).then(res => res);
    },
    forbidUser: (query) => {
      return request({
        url: `${APPLICATION_NAME}/user/forbid`,
        method: 'post',
        data: query
      }).then(res => res);
    }
};
export default systemManagementApi;