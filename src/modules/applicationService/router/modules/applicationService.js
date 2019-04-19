const _import = require('./../_import_' + process.env.NODE_ENV);
// 应用服务
export const applicationServiceRouter =
{
    path: 'applicationService',
    name: '应用服务',
    component: _import('applicationService/index'),
    meta: { title: '应用服务' },
    redirect: '/product/applicationService/home',
    children: [
      {
        path: 'home',
        name: '应用服务首页',
        component: _import('applicationService/home/index'),
        meta: { title: '应用服务首页' }
      }
    ]
  };
