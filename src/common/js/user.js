import request from '@/utils/http';
import cookie from 'js-cookie';
import ls from '@/utils/storage/local_storage';
import lang from '@/common/lang/index';

const {
  APPLICATION_NAME
} = window.environment.mframework;
const appId = window.environment.appId;

/**
 * 语言切换
 */
export function switchLang(langType) {
  return request({
    url: APPLICATION_NAME + '/sys/org/savePersonConf',
    method: 'post',
    data: {
      'langType': langType
    }
  }).then(res => {
    if (res.data) {
      return Promise.all([getUserInfo(), getMenus()]).then(response => {
        return response[0].code === '200' && response[1];
      });
    } else {
       return Promise((resolve, reject) => {
        resolve(res.data);
      });
    }
  });
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return request({
    url: APPLICATION_NAME + '/findCurrUser',
    method: 'get'
  }).then(res => {
    const user = res.data.user;
    if (res.success && user) {
      ls.addItem('user', user);
    }
    return res.data;
  });
};

/**
 * 获取用户菜单信息
 */
export function getMenus() {
  return request({
    url: APPLICATION_NAME + '/sys/authority/sysAuthResource/getResuorceBySysAuth?appId=' + appId,
    method: 'get',
    data: {}
  }).then(res => {
    if (res.success) {
      ls.addItem('menus', res.data);
    }
    return res.data;
  });
};

/**
 * 初始化语言信息
 */
export function initLang() {
  return lang.initLanguage();
}

/**
 * 系统初始化
 * 0.初始化语言
 * 1.获取用户信息
 * 2.获取当前用户菜单信息和权限
 */
export function initSystem() {
  let init = new Promise((resolve, reject) => {
    try {
      cookie.set('appId', appId);
      let i18n = initLang();
      resolve({
        i18n: i18n
      });
    } catch (ex) {
      reject(ex);
    }
  });
  let promiseList = [init];
  ls.getItem('user') || promiseList.push(getUserInfo());
  ls.getItem('menus') || promiseList.push(getMenus());
  return Promise.all(promiseList).then(res => {
    return {
      i18n: res[0].i18n,
      user: (res[1] && res[1].user) || ls.getItem('user'),
      menus: res[2] || ls.getItem('menus')
    };
  });
};

/**
 * 初始化快速导航
 */
export function getUserNav(formKey) {
  return request({
    url: APPLICATION_NAME + '/formconfig/sysFormConfig/findByFormKey?formKey=' + formKey,
    method: 'get'
  }).then(res => {
    return res;
  });
};

export function getUserNavSubmit(data) {
  return request({
    url: APPLICATION_NAME + '/formconfig/sysFormConfig/saveOrUpdate',
    method: 'post',
    data: data
  }).then(res => {
    return res;
  });
};