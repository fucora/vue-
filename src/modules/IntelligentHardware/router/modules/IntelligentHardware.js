const _import = require('./../_import_' + process.env.NODE_ENV);
// 智能硬件
export const IntelligentHardwareRouter =
{
  path: 'hardware',
  name: '智能硬件',
  component: _import('IntelligentHardware/index'),
  meta: { title: '智能硬件' },
  redirect: '/product/hardware/home',
  children: [
    {
      path: 'home',
      name: '智能硬件首页',
      component: _import('IntelligentHardware/home/index'),
      meta: { title: '智能硬件首页' }
    }
  ]
};
