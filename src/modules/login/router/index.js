import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const _import = require('./_import_' + process.env.NODE_ENV);

// import productRouter from './modules/product';

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/mideaHome',
    name: 'home',
    hidden: true
  },
  // productRouter,
  {
    path: '/mideaHome',
    component: _import('mideaHome/index'),
    name: '登陆前首页',
    meta: { title: '登陆前首页', icon: 'dots' }
  },
  {
    path: '/login',
    component: _import('login/login'),
    name: '登陆',
    meta: { title: '登陆', icon: 'dots' }
  },
  // 登陆后的ifrem页面
  {
    path: '/enter',
    component: _import('layout/index'),
    name: '入口页面',
    meta: { title: '入口页面', icon: 'dots' }
  },
  {
    path: '/register',
    component: _import('register/register'),
    name: '注册',
    meta: { title: '注册', icon: 'dots' }
  },
  // {
  //   path: '/forget',
  //   name: '忘记密码',
  //   component: _import('forget/forget'),
  //   hidden: true
  // },
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
