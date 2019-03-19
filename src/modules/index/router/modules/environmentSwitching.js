const _import = require('./../_import_' + process.env.NODE_ENV);
// 工具箱
export const environmentSwitching =
{
  path: 'environment',
  name: '工具箱',
  component: _import('toolCase/index'),
  meta: { title: '工具箱', icon: 'dots' },
  redirect: '/product/environment/environmentSwitching',
  children: [
    // 数据统计
    {
      path: 'environmentSwitching',
      name: '环境切换',
      component: _import('toolCase/environmentSwitching/index'),
      meta: { title: '环境切换' }
    }
  ]
};
