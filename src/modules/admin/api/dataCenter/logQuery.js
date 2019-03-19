import request from '@/utils/http';
// import axios from 'axios';
// import { getToken } from '@/utils/auth';
const {
  APPLICATION_NAME
} = window.environment.iotserver;
const logQueryApi = {
    // 配网日志查询接口
    mouduleNetSearch: (query) => {
        return request({
          url: `${APPLICATION_NAME}/log/mouduleNetSearch`,
          data: query,
          method: 'post'
        }).then(res => res);
      },
      deviceSearch: (query) => {
        return request({
          url: `${APPLICATION_NAME}/log/deviceSearch`,
          data: query,
          method: 'post'
        }).then(res => res);
      }
};
export default logQueryApi;
