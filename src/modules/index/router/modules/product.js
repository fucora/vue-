const _import = require('./../_import_' + process.env.NODE_ENV);
import { userInfoRouter } from './userInfo';
const productRouter = {
  path: '/product',
  name: '美的开放平台',
  component: _import('layout/index'),
  meta: { title: '美的开放平台' },
  redirect: '/product/home',
  children: [
    {
      path: 'home',
      name: '登陆首页',
      component: _import('loginInHome/index'),
      meta: { title: '登陆首页' }
    },
    userInfoRouter
  ]
};
export default productRouter;
