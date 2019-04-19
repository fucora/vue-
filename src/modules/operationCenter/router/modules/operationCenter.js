const _import = require('./../_import_' + process.env.NODE_ENV);
// 运营中心
export const operationCenterRouter =
{
  path: 'operationCenter',
  name: '运营中心',
  component: _import('operationCenter/index'),
  meta: { title: '运营中心' },
  redirect: '/product/operationCenter/home',
  children: [
    {
      path: 'home',
      name: '运营中心首页',
      component: _import('operationCenter/home/index'),
      meta: { title: '运营中心首页' }
    }
  ]
};
