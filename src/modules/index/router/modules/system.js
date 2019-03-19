const _import = require('./../_import_' + process.env.NODE_ENV);

// liences管理
export const liencesRouter =
{
  path: 'licenseManagement',
  name: 'license管理',
  component: _import('mineSystem/licenseManagement/index'),
  meta: { title: '我的license', icon: '我的license' },
  redirect: '/product/licenseManagement/applicationManagement',
  children: [
    {
      path: 'preApplicationManagement',
      component: _import('mineSystem/licenseManagement/preApplicationManagement/index'),
      name: 'preApplicationManagement',
      meta: { title: '预申请列表' }
    },
    {
      path: 'applicationManagement',
      component: _import('mineSystem/licenseManagement/applicationManagement/index'),
      name: 'applicationManagement',
      meta: { title: '申请列表' }
    },
    {
      path: 'eidtApplication',
      component: _import('mineSystem/licenseManagement/applicationManagement/eidt'),
      name: 'eidtApplication',
      meta: { title: 'license申请' },
      hidden: true
    },
    {
      path: 'eidtPreApplication',
      component: _import('mineSystem/licenseManagement/preApplicationManagement/eidt'),
      name: 'eidtPreApplication',
      meta: { title: 'license预申请' },
      hidden: true
    },
    {
      path: 'preEidtPreApplication/:id',
      component: _import('mineSystem/licenseManagement/preApplicationManagement/preEid'),
      name: 'preEidtPreApplication',
      meta: { title: 'license预申请编辑' },
      hidden: true
    }
  ]
};
// export default systemRouter;
