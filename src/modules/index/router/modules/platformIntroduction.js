const _import = require('./../_import_' + process.env.NODE_ENV);
const platformIntroductionRouter = {
  path: '/platformIntroduction',
  name: '首页',
  component: _import('layout/index'),
  meta: { title: '首页' },
  redirect: '/platformIntroduction/developerplatform',
  children: [
    {
      path: 'developerplatform',
      name: '首页中心',
      component: _import('developerplatform/index'),
      meta: { title: '首页中心' },
      redirect: '/platformIntroduction/developerplatform/home',
      children: [
        {
          path: 'home',
          name: 'test',
          component: _import('developerplatform/home/home'),
          meta: { title: 'test' }
        }
      ]
    }
  ]
};
export default platformIntroductionRouter;
