import request from '@/utils/http';
const {
    APPLICATION_NAME
  } = window.environment.iotserver;
const auditsManagementApi = {
  getApplianSelect: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/getApplianSelect`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  getSn8Select: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/getSn8Select`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  getExamineList: (query) => {
    return request({
      url: `${APPLICATION_NAME}/audit/ExamineList`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  getHardware: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/getHardware`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  examineHard: (query) => {
    return request({
      url: `${APPLICATION_NAME}/audit/ExamineHard`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  uploadSdkLib: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/uploadSdkLib`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  uploadProFile: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/uploadHardFile`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  distributionKey: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/distributionKey`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  getNetwork: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/getNetwork`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  getProtos: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/getProtos`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  // 芯片信息下载其它芯片资料
  downFileUp: (params) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/downFile`,
      params: params,
      method: 'get',
      responseType: 'blob'
    }).then(res => res);
  },
  // 下载lua文件
  downloadLuaFile: (params) => {
    return request({
      url: `${APPLICATION_NAME}/Agreement/downloadLua`,
      method: 'get',
      params: params,
      responseType: 'blob'
    }).then(res => res);
  }
};
export default auditsManagementApi;