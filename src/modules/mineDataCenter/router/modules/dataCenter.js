const _import = require('./../_import_' + process.env.NODE_ENV);
// 数据中心
export const dataCenterRouter =
{
  path: 'dataCenter',
  name: '数据中心',
  component: _import('mineDataCenter/index'),
  meta: { title: '数据中心', icon: '数据中心' },
  redirect: '/product/dataCenter/home',
  children: [
    {
      path: 'home',
      name: '数据中心首页',
      component: _import('mineDataCenter/home/index'),
      meta: { title: '数据中心首页' }
    }
  ]
};
