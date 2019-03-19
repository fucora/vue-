import request from '@/utils/http';

const {
  APPLICATION_NAME
} = window.environment.iotserver;

// 退出登陆
export const logout = () => {
  return request({
    url: `${APPLICATION_NAME}/user/logout`,
    method: 'post'
  }).then(res => res);
};