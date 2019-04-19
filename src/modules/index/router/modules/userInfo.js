const _import = require('./../_import_' + process.env.NODE_ENV);
// 用户下拉界面路由
export const userInfoRouter =
{
  path: 'userInfo',
  name: '用户信息',
  component: _import('userInfo/index'),
  meta: { title: '用户信息' },
  redirect: '/product/userInfo/home',
  children: [
    {
      path: 'home',
      name: '用户信息首页',
      component: _import('userInfo/home/index'),
      meta: { title: '用户信息首页' }
    }
  ]
};
