import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const _import = require('./_import_' + process.env.NODE_ENV);

import productRouter from './modules/product';
// import infoRouter from './modules/info';
// import platformIntroductionRouter from './modules/platformIntroduction';
// import systemRouter from './modules/system';

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/product',
    name: 'home',
    hidden: true
  },
  // platformIntroductionRouter,
  // infoRouter,
  productRouter,
  // systemRouter,
  // {
  //   path: '/downloadCenter',
  //   name: '下载页',
  //   component: _import('layout/index'),
  //   meta: { title: '下载页' },
  //   redirect: '/downloadCenter/download',
  //   children: [
  //     {
  //       path: 'download',
  //       component: _import('download/index'),
  //       name: '下载中心',
  //       meta: { title: '下载中心' },
  //       redirect: '/downloadCenter/download/hardwareSDK',
  //       children: [
  //         {
  //           path: 'hardwareSDK',
  //           name: '硬件SDK下载',
  //           component: _import('download/hardwareSDK/index'),
  //           meta: { title: '硬件SDK下载' }
  //         },
  //         {
  //           path: 'softwareSDK',
  //           name: '软件SDK下载',
  //           component: _import('download/softwareSDK/index'),
  //           meta: { title: '软件SDK下载' }
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   path: '/developGuideTop',
  //   name: '开发指引模块',
  //   component: _import('layout/index'),
  //   meta: { title: '开发指引模块' },
  //   redirect: '/developGuideTop/developGuide',
  //   children: [
  //     {
  //       path: 'developGuide',
  //       name: '开发指引',
  //       component: _import('developGuide/index'),
  //       meta: { title: '开发指引' },
  //       redirect: '/developGuideTop/developGuide/guide',
  //       children: [
  //         {
  //           path: 'guide',
  //           component: _import('developGuide/guide/index'),
  //           name: 'IOS SDK',
  //           meta: { title: 'IOS SDK', icon: 'dots' }
  //         }
  //         // {
  //         //   path: 'profileManagement',
  //         //   component: _import('myAgreement/profileManagement/index'),
  //         //   name: 'ProfileManagement',
  //         //   meta: { title: 'Profile文件管理', icon: 'dots' }
  //         // }
  //       ]
  //     }
  //   ]
  // },
  {
    path: '/login',
    component: _import('login/login'),
    name: '登陆',
    meta: { title: '登陆', icon: 'dots' }
  },
  // {
  //   path: '/register',
  //   name: 'Register',
  //   component: _import('register/register'),
  //   hidden: true
  // },
  {
    path: '/forget',
    name: '忘记密码',
    component: _import('forget/forget'),
    hidden: true
  },
  {
    path: '*',
    redirect: {
      path: '/'
    },
    hidden: true
  }
];
export default new Router({
  // mode: 'history', // require service support
  scrollBehavior(to, from, savedPosition) {
    // debugger;
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: constantRouterMap
});
// export default routes;
