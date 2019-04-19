import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
// const _import = require('./_import_' + process.env.NODE_ENV);

import productRouter from './modules/product';

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/product',
    name: 'home',
    hidden: true
  },
  productRouter,
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
