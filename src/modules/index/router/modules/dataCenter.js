const _import = require('./../_import_' + process.env.NODE_ENV);
// 数据中心
export const dataCenterRouter =
{
  path: 'dataCenter',
  name: '数据中心',
  component: _import('mineDataCenter/index'),
  meta: { title: '数据中心', icon: '数据中心' },
  redirect: '/product/dataCenter/mineDataCenterCheck',
  children: [
    {
      path: 'mineDataCenterCheck',
      name: '数据查询',
      component: _import('mineDataCenter/mineDataCenterCheck/index'),
      redirect: '/product/dataCenter/mineDataCenterCheck/userInfoCheck',
      // #/product/dataCenter/mineDataCenterCheck/distributionLog
      meta: { title: '数据查询', icon: '数据查询' },
      children: [
        {
          path: 'userInfoCheck',
          name: '用户信息查询',
          component: _import('mineDataCenter/mineDataCenterCheck/recordCheck/userInfomation'),
          meta: { title: '用户信息查询' }
        },
        {
          path: 'equipmentInfoCheck',
          component: _import('mineDataCenter/mineDataCenterCheck/recordCheck/equipmentInformation'),
          name: '设备信息查询',
          meta: { title: '设备信息查询' }
        },
        {
          path: 'equipmentStateCheck',
          component: _import('mineDataCenter/mineDataCenterCheck/recordCheck/equipmentState'),
          name: '设备状态查询',
          meta: { title: '设备状态查询' }
        }
      ]
    },
    {
      path: 'logQuery',
      name: '日志查询',
      component: _import('mineDataCenter/mineDataCenterCheck/index'),
      // redirect: '/product/dataCenter/mineDataCenterCheck/distributionLog',
      redirect: '/product/dataCenter/logQuery/distributionLog',
      meta: { title: '日志查询', icon: '日志查询' },
      children: [
        // {
        //   path: 'distributionLog',
        //   name: '配网日志',
        //   component: _import('mineDataCenter/mineDataCenterCheck/logQuery/distributionLog'),
        //   meta: { title: '配网日志' }
        // },
        {
          path: 'upperAndLowerLine',
          name: '上下线',
          component: _import('mineDataCenter/mineDataCenterCheck/logQuery/upperAndLowerLine'),
          meta: { title: '上下线' }
        },
        {
          path: 'instructionTransceiver',
          name: '指令收发',
          component: _import('mineDataCenter/mineDataCenterCheck/logQuery/instructionTransceiver'),
          meta: { title: '指令收发' }
        }
      ]
    }

  ]
};
