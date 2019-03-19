import request from '@/utils/http';
const {
  APPLICATION_NAME
} = window.environment.iotserver;

const API = {
  // 开发者或事业部下的硬件列表
  hardwreList: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/getHardwareList`,
      method: 'post',
      data: query
    });
  },
  // 获取联网方式
  getNetwork: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/getNetwork`,
      method: 'post',
      data: query
    });
  },
  // 获取支持协议
  getProtos: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/getProtos`,
      method: 'post',
      data: query
    });
  },
  // 新增硬件列表的下拉三级联动接口前俩个
  getcategorySelect: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/getcategorySelect`,
      method: 'post',
      data: query
    });
  },
  // 新增硬件列表的下拉三级联动接口最后一个
  getApplianSelect: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/getApplianSelect`,
      method: 'post',
      data: query
    });
  },
  addHardware: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/addHardware`,
      method: 'post',
      data: query,
      showLoading: true
    });
  },
  // wifiSdk信息列表
  wifiSdkGetList: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/wifiSdkGetList`,
      method: 'post',
      data: query
    });
  },
  // /硬件详情列表
  getHardwareProductDetails: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/getHardware`,
      method: 'post',
      data: query
    });
  },
  // /硬件详情列表
  getWifiSdkLib: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/getWifiSdkLib`,
      method: 'post',
      data: query
    });
  },
  // Agreement/getLuaList
  // Agreement/getHardLuaList
  getLuaList: (query) => {
    return request({
      url: `${APPLICATION_NAME}/Agreement/getHardLuaList`,
      method: 'post',
      data: query
    });
  },
  // 关联lua
  hardRelationLua: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/hardRelationLua`,
      method: 'post',
      data: query
    });
  },
  // sdkLib库
  getSdkLib: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/getSdkLib`,
      method: 'post',
      data: query
    });
  },
  // updateHard编辑
  updateHard: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/updateHard`,
      method: 'post',
      data: query
    });
  },
  // 中止硬件 hardware/stopProject
  stopProject: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/stopProject`,
      method: 'post',
      data: query
    });
  },
  // getHardware 根据id获取硬件详情
  getHardware: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/getHardware`,
      method: 'post',
      data: query
    });
  },
  // downloadSdkLib下载
  downloadSdkLib: (params) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/downloadSdkLib`,
      method: 'get',
      params: params,
      responseType: 'blob'
    }).then(res => res);
  },
  // 详细芯片下拉本地
  getCpuJson: (query) => {
    return request({
      url: `./../../../../../static/staticData/cpu.json`,
      method: 'get',
      data: query
    });
  },
  // 芯片型号
  getChipModelJson: (query) => {
    return request({
      url: `./../../../../../static/staticData/chipModel.json`,
      method: 'get',
      data: query
    });
  },
  // 芯片品牌
  getChipBrandJson: (query) => {
    return request({
      url: `./../../../../../static/staticData/chipBrand.json`,
      method: 'get',
      data: query
    });
  },
  // 操作系统
  getOperatingSystem: (query) => {
    return request({
      url: `./../../../../../static/staticData/operatingSystem.json`,
      method: 'get',
      data: query
    });
  },
  // hardware / getSdkSelect smart SDK下拉
  getSdkSelect: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/getSdkSelect`,
      method: 'post',
      data: query
    });
  },
  // 申请试产
  againExamine: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/againExamine`,
      method: 'post',
      data: query
    });
  },
  // 申请上线ApplyLine
  applyLine: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/ApplyLine`,
      method: 'post',
      data: query
    });
  },

  // 删除硬件详情的lua协议文件
  delHardRelationLua: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/delHardRelationLua`,
      method: 'post',
      data: query
    });
  },
  // 删除硬件详情的lua协议文件
  delFile: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/delFile`,
      method: 'post',
      data: query
    });
  },
  checkModelType: (query) => {
    return request({
      url: `${APPLICATION_NAME}/hardware/checkModelType`,
      method: 'post',
      data: query,
      showLoading: true
    });
  },
  // 下载中心接口sdkdown/getall
  downloadGetall: (query) => {
    return request({
      url: `${APPLICATION_NAME}/doc/sdkDoc`,
      method: 'post',
      data: query
    });
  },
    // 1.4sdk下载中心接口
  moduleSDKReleaseList: (query) => {
      return request({
        url: `${APPLICATION_NAME}/moduleSDKRelease/list`,
        method: 'post',
        data: query
      });
    },
  // 开发指引 1获取文档目录结构
  docAllMenu: (query) => {
    return request({
      url: `${APPLICATION_NAME}/doc/allMenu`,
      method: 'post',
      data: query
    });
  },
  // 获取内容/doc/detail
  docDetail: (query) => {
    return request({
      url: `${APPLICATION_NAME}/doc/detail`,
      method: 'post',
      data: query
    });
  },
  // lice下拉 /licApply/getChipSelect
  getChipSelect: (query) => {
    return request({
      url: `${APPLICATION_NAME}/licApply/getChipSelect`,
      method: 'post',
      data: query
    });
  }
};

export default API;
