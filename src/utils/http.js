import axios from 'axios';
import NProgress from 'nprogress';
// import { clearStorage } from '@/modules/index0/api/login';

import { getToken } from '@/utils/auth';
import store from '@/modules/index/store';
import { showFullScreenLoading, tryHideFullScreenLoading } from './loading';
import {
  Message
  // MessageBox
} from 'element-ui';

// 创建axios实例
const service = axios.create({
  timeout: 15000000, // 请求超时时间
  withCredentials: true,
  headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' }
});
console.log(window.location.href);
// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    console.log(store.getters.token);
    // debugger;
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['accessToken'] = getToken();
  }
  if (config.showLoading) {
    showFullScreenLoading();
  }
  NProgress.start();
  return config;
}, error => {
  NProgress.done();
  tryHideFullScreenLoading();
  console.log(error);
  Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
  response => {
    // debugger;
    NProgress.done();
    if (response.config.showLoading) {
      tryHideFullScreenLoading();
    }
    if (response.headers['content-disposition']) {
      return response;
    } else {
      const res = response.data;
      // 统一处理请求不成功的
      // debugger;
      if (res.code !== 0) {
        if (res.code === 12010003) {
          // MessageBox.confirm('您已被登出，请重新登录', {
          //   confirmButtonText: '重新登录',
          //   showCancelButton: false,
          //   type: 'warning',
          //   showClose: false
          // }).then(() => {
            store.dispatch('FedLogOut').then(() => {
              // debugger;
              location.reload(); // 为了重新实例化vue-router对象 避免bug
            });
          // });
        } else if (res.code === 10060025) {
          return response.data;
        } else if (!res.code) {
          return response.data;
        } else {
          Message({
            message: res.message,
            type: 'error',
            duration: 2 * 1000
          });
          return response.data;
        }
        // debugger;
        // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
        // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        //   // 请自行在引入 MessageBox
        //   // import {  } from 'element-ui'
        //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        //     confirmButtonText: '重新登录',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        //   }).then(() => {
        //     store.dispatch('FedLogOut').then(() => {
        //       // debugger;
        //       location.reload(); // 为了重新实例化vue-router对象 避免bug
        //     });
        //   });
        // }
        return Promise.reject('error');
      } else {
        return response.data;
      }
    }
    // return response.data;
  },
  error => {
    tryHideFullScreenLoading();
    NProgress.done();
    const response = error.response;
    if (response) {
      switch (response.status) {
        case 401:
          // clearStorage();
          localStorage.setItem('historyUrl', window.location.href);
          window.location.href = './login.html';
          break;
        case 500:
          Message.error('系统异常');
          break;
      }
    }
    console.log('异常:', error);
    return Promise.reject(error);
  }
);

export default service;
