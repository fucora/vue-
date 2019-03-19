const _import = require('./../_import_' + process.env.NODE_ENV);
const infoRouter = {
  path: '/info',
  component: _import('layout/index'),
  name: 'Info',
  meta: { title: 'Info' },
  redirect: '/info/developInfo',
  children: [
    {
      path: 'developInfo',
      component: _import('developInfo/index'),
      name: 'DevelopInfo',
      meta: { title: '开发者信息' },
      redirect: '/info/developInfo/personInfo',
      children: [
        {
          path: 'personInfo',
          name: 'PersonInfo',
          component: _import('developInfo/personInfo/personInfo'),
          meta: { title: '个人信息', icon: 'dots' }
        },
        {
          path: 'authenInfo',
          name: 'AuthenInfo',
          component: _import('developInfo/authenInfo/authenInfo'),
          meta: { title: '企业认证信息', icon: 'dots' }
        },
        {
          path: 'bindTel',
          name: 'BindTel',
          component: _import('developInfo/bindTel/bindTel'),
          meta: { title: '绑定手机号' },
          hidden: true
        },
        {
          path: 'authMethod',
          name: 'AuthMethod',
          component: _import('developInfo/authMethod/authMethod'),
          meta: { title: '企业认证' },
          hidden: true
        }
      ]
    }
  ]
};
export default infoRouter;
