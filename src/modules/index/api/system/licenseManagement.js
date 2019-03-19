import request from '@/utils/http';
const {
    APPLICATION_NAME
  } = window.environment.iotserver;
const licenseManagementApi = {
  /*
    申请（页面）
  */
  getLicApplyList: (query) => {
    return request({
      url: `${APPLICATION_NAME}/licApply/list`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  addLicApply: (query) => {
    return request({
      url: `${APPLICATION_NAME}/licApply/apply`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  // 打样
  addLicProofingApply: (query) => {
    return request({
      url: `${APPLICATION_NAME}/licApply/proofingApply`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  getLicApplyInfo: (query) => {
    return request({
      url: `${APPLICATION_NAME}/licApply/get`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  auditLicApplyInfo: (query) => {
    return request({
      url: `${APPLICATION_NAME}/licApply/audit`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  // 预测单请求
  findListBySupplyId: (query) => {
    return request({
      url: `${APPLICATION_NAME}/licPreApply/findListBySupplyId `,
      method: 'post',
      data: query
    }).then(res => res);
  },
  /*
    预申请（页面）
  */
  getLicPreApplyList: (query) => {
    return request({
      url: `${APPLICATION_NAME}/licPreApply/list`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  addLicPreApply: (query) => {
    return request({
      url: `${APPLICATION_NAME}/licPreApply/apply`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  getLicPreApplyInfo: (query) => {
    return request({
      url: `${APPLICATION_NAME}/licPreApply/get`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  // 预申请的编辑/licPreApply/
  getLicPreUpdateApply: (query) => {
    return request({
      url: `${APPLICATION_NAME}/licPreApply/updateApply`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  auditLicPreApplyInfo: (query) => {
    return request({
      url: `${APPLICATION_NAME}/licPreApply/audit`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  // 获取模组厂商下拉
  getSupplyList: () => {
    return request({
      url: `${APPLICATION_NAME}/supply/all`,
      method: 'post'
    }).then(res => res);
  },
  // 下载Lic
  downloadLic: (query) => {
    return request({
      url: `${APPLICATION_NAME}/licApply/downloadLic`,
      method: 'post',
      data: query,
      showLoading: true
      // responseType: 'blob'
    }).then(res => res);
  },
  getHardInfoForLicApply: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/getHardInfoForLicApply`,
      method: 'post',
      data: query
    }).then(res => res);
  }
};
export default licenseManagementApi;
