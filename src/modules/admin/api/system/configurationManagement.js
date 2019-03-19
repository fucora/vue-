import request from '@/utils/http';
const {
  APPLICATION_NAME
} = window.environment.iotserver;
const configurationManagementApi = {
  // 文档管理api
  getDocList: () => {
    return request({
      url: `${APPLICATION_NAME}/doc/allMenu`,
      method: 'post'
    }).then(res => res);
  },
  // getDocList: (query) => {
  //   return request({
  //     url: `${APPLICATION_NAME}/doc/allMenu`,
  //     method: 'post',
  //     data: query
  //   }).then(res => res);
  // },
  // mac地址管理api
  validMacList: (query) => {
    return request({
      url: `${APPLICATION_NAME}/mac/list`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  allocatedMacList: (query) => {
    return request({
      url: `${APPLICATION_NAME}/macAllocated/list`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  getNumber: () => {
    return request({
      url: `${APPLICATION_NAME}/mac/get`,
      method: 'post'
    }).then(res => res);
  },
  addValidMac: (query) => {
    return request({
      url: `${APPLICATION_NAME}/mac/add`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  // 品类与事业部管理API
  applianList: (query) => {
    return request({
      url: `${APPLICATION_NAME}/applian/list`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  deleteApplian: (query) => {
    return request({
      url: `${APPLICATION_NAME}/applian/delete`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  updateApplian: (query) => {
    return request({
      url: `${APPLICATION_NAME}/applian/update`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  addApplian: (query) => {
    return request({
      url: `${APPLICATION_NAME}/applian/add`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  getDepartment: (query) => {
    return request({
      url: `${APPLICATION_NAME}/department/all`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  // 模组厂商管理API
  getSupplyListIndex: (query) => {
    return request({
      url: `${APPLICATION_NAME}/supply/list`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  getSupplyInfo: (query) => {
    return request({
      url: `${APPLICATION_NAME}/supply/get`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  supplyAdd: (query) => {
    return request({
      url: `${APPLICATION_NAME}/supply/add`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  updateContact: (query) => {
    return request({
      url: `${APPLICATION_NAME}/supply/updateContact`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  getAllusers: () => {
    return request({
      url: `${APPLICATION_NAME}/user/getContacts`,
      method: 'post'
    }).then(res => res);
  }
};
export default configurationManagementApi;