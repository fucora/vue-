import request from '@/utils/http';
// import axios from 'axios';
const {
  APPLICATION_NAME
} = window.environment.iotserver;

// 批量下载协议文档
export const downloadDoc = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/downloadDoc`,
    method: 'get',
    params: params,
    responseType: 'blob'
  }).then(res => res);
};
// 获取电控协议列表api
export const getLuaDocList = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/getLuaDocList`,
    method: 'post',
    data: params
  }).then(res => res);
};

// 查询电控协议详情
export const getElecDoc = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/getDoc`,
    method: 'post',
    data: params
  }).then(res => res);
};
// 新增电控协议
export const addDoc = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/addDoc`,
    method: 'post',
    data: params
  }).then(res => res);
};
// 编辑电控协议
export const docUpdate = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/docUpdate`,
    method: 'post',
    data: params
  }).then(res => res);
};
// 删除电控协议
export const deleteDoc = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/delDoc`,
    method: 'post',
    data: params
  }).then(res => res);
};

// 获取Lua脚本列表
export const getLuaList = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/getLuaList`,
    method: 'post',
    data: params
  }).then(res => res);
};

// 新增Lua脚本列表
export const addLua = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/luaAdd`,
    method: 'post',
    data: params,
    showLoading: true
  }).then(res => res);
};
// 新增Lua脚本列表(新的)
export const addLuaSubmit = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/luaAdd`,
    method: 'post',
    data: params,
    showLoading: true
  }).then(res => res);
};
// Agreement/ProfileSelect
export const ProfileSelect = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/ProfileSelect`,
    method: 'post',
    data: params
  }).then(res => res);
};
// luaUpdate 编辑Lua脚本
export const luaUpdate = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/updateLua`,
    method: 'post',
    data: params,
    showLoading: true
  }).then(res => res);
};
// 获取profile列表
export const getProfileList = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/getProfileList`,
    method: 'post',
    data: params
  }).then(res => res);
};
// 获取getSn8Select表
export const getSn8Select = (params) => {
  return request({
    url: `${APPLICATION_NAME}/hardware/getSn8Select`,
    method: 'post',
    data: params
  }).then(res => res);
};
// Agreement/DocSelect
export const DocSelect = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/DocSelect`,
    method: 'post',
    data: params
  }).then(res => res);
};
// 获取profile详情
export const getProfile = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/getProfile`,
    method: 'post',
    data: params
  }).then(res => res);
};
// Lua脚本详情
export const getLua = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/getLua`,
    method: 'post',
    data: params
  }).then(res => res);
};
// lua提交发布
export const testReportSubmit = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/uploadTestReport`,
    method: 'post',
    data: params,
    showLoading: true
  }).then(res => res);
};
// 后去profile文件功能列表
export const getCurrencyProperty = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/currencyProperty`,
    method: 'post',
    data: params
  }).then(res => res);
};
// 穿梭框接口
export const profeilInfoList = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/profeilInfoList`,
    method: 'post',
    data: params
  }).then(res => res);
};
// addProfile新增
export const addProfile = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/addProfile`,
    method: 'post',
    data: params
  }).then(res => res);
};
// 编辑profile保存
export const updateProperty = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/updateProperty`,
    method: 'post',
    data: params
  }).then(res => res);
};
// 修改profile状态编辑v1/iotserver/Agreement/updateProStatus
export const updateProStatus = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/updateProStatus`,
    method: 'post',
    data: params
  }).then(res => res);
};
// delPropertys 删除
export const delPropertys = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/delPropertys`,
    method: 'post',
    data: params
  }).then(res => res);
};
// 更新profile名称updateProfile

export const updateProfile = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/updateProfile`,
    method: 'post',
    data: params
  }).then(res => res);
};
// 此接口为新增profile文件页面中新增可选功能对话框前端界面自定义模拟的接口,后台暂时未提供真实接口
// export const getOptionalFeatures = (params) => {
//   return request({
//     url: `${APPLICATION_NAME}/Agreement/optionalFeatures`,
//     method: 'post',
//     data: params
//   }).then(res => res);
// };

// 同一的上传接口
export const imgDoUpLoad = (params) => {
  return request({
    url: `${APPLICATION_NAME}/fileUpload/doUploadOriginal`,
    method: 'post',
    showLoading: true,
    data: params
  }).then(res => res);
};
export const luaDoUpLoad = (params) => {
  return request({
    url: `${APPLICATION_NAME}/fileUpload/doLuaUpload`,
    method: 'post',
    data: params
  }).then(res => res);
};
// 下载lua
export const downloadLua = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/downloadLua`,
    params: params,
    method: 'get',
    responseType: 'blob',
    showLoading: true
  }).then(res => res);
};
// 下载自测文件
export const downloadTest = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/downloadTestFile`,
    params: params,
    method: 'get',
    responseType: 'blob',
    showLoading: true
  }).then(res => res);
};
// 下载测试报告
export const downloadTestReport = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/downloadTestReport`,
    params: params,
    method: 'get',
    responseType: 'blob',
    showLoading: true
  }).then(res => res);
};
// 芯片信息下载其它芯片资料
export const downloadOtherInfo = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/downloadLibDoc`,
    params: params,
    method: 'get',
    responseType: 'blob'
  }).then(res => res);
};
// /Agreement/checkDoc检查是否重复
export const checkDoc = (params) => {
  return request({
    url: `${APPLICATION_NAME}/Agreement/checkDoc`,
    method: 'post',
    data: params
  }).then(res => res);
};
