import request from '@/utils/http';
const {
  APPLICATION_NAME
} = window.environment.iotserver;
const environmentSwitching = {
  // 新增sn
  addSn: (query) => {
    return request({
      url: `${APPLICATION_NAME}/sn/add`,
      data: query,
      method: 'post'
    }).then(res => res);
  },
  // sn下拉
  getSnSelect: (query) => {
    return request({
      url: `${APPLICATION_NAME}/sn/get`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  // 环境切换列表
  snSwithchList: (query) => {
    return request({
      url: `${APPLICATION_NAME}/snSwithch/list`,
      data: query,
      method: 'post'
    }).then(res => res);
  },
  // 查询
  snSwithchInfo: (query) => {
    return request({
      url: `${APPLICATION_NAME}/snSwithch/get`,
      data: query,
      method: 'post'
    }).then(res => res);
  },
  // 新增提交
  saveSnSwithch: (query) => {
    return request({
      url: `${APPLICATION_NAME}/snSwithch/save`,
      data: query,
      method: 'post'
    }).then(res => res);
  },
  // 重新提交
  saveSnSwithchAgain: (query) => {
    return request({
      url: `${APPLICATION_NAME}/snSwithch/resubmit`,
      data: query,
      method: 'post'
    }).then(res => res);
  },
  // 详情
  saveSnSwithchInfo: (query) => {
    return request({
      url: `${APPLICATION_NAME}/snSwithch/look`,
      data: query,
      method: 'post'
    }).then(res => res);
  }
};
export default environmentSwitching;
