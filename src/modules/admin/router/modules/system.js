const _import = require('./../_import_' + process.env.NODE_ENV);

// 配置管理
export const backgroundAccountManagement =
{
  path: 'accountManagement',
  component: _import('backgroundAccountManagement/index'),
  redirect: '/product/accountManagement/account',
  name: '后台账户管理',
  meta: { title: '后台账户管理', icon: '我的协议' },
  children: [
    // 后台账户管理
    {
      path: 'account',
      component: _import('backgroundAccountManagement/acountManagement/index'),
      name: '账户管理',
      meta: { title: '账户管理' }
    }
  ]
};
