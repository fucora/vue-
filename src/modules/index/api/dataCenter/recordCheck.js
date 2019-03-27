import request from '@/utils/http';
// import axios from 'axios';
// import { getToken } from '@/utils/auth';
const {
  APPLICATION_NAME
} = window.environment.iotserver;
const recordCheckApi = {
    // 用户信息查询API
    getSmartUserInfo: (query) => {
        return request({
          url: `${APPLICATION_NAME}/front/smartUser`,
          data: query,
          method: 'post'
        }).then(res => res);
      },
    // 设备信息查询API
    getSmartApplianceInfo: (query) => {
      return request({
        url: `${APPLICATION_NAME}/front/smartAppliance`,
        data: query,
        method: 'post'
      }).then(res => res);
    },
    // 设备状态查询API
    getSmartStateInfo: (query) => {
      // return axios.post(`${APPLICATION_NAME}/smartAppliance/getState`, query, {
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //     'accessToken': getToken()
      //   }
      //   }).then(response => response.data);
        return request({
          url: `${APPLICATION_NAME}/front/smartAppliance/getState`,
          data: query,
          method: 'post'
        }).then(res => res);
    }
};
export default recordCheckApi;