const _import = require('./../_import_' + process.env.NODE_ENV);
// 文档中心
export const documentCenterRouter =
{
  path: 'documentCenter',
  name: '文档中心',
  component: _import('documentCenter/index'),
  meta: { title: '文档中心' },
  redirect: '/product/documentCenter/home',
  children: [
    {
      path: 'home',
      name: '文档中心首页',
      component: _import('documentCenter/home/index'),
      meta: { title: '文档中心首页' }
    }
  ]
};
