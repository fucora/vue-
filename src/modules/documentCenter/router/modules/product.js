const _import = require('./../_import_' + process.env.NODE_ENV);
// import { dataCenterRouter } from './dataCenter';
// import { IntelligentHardwareRouter } from './IntelligentHardware';
// import { applicationServiceRouter } from './applicationService';
import { documentCenterRouter } from './documentCenter';
// import { operationCenterRouter } from './operationCenter';
// import { userInfoRouter } from './userInfo';
const productRouter = {
  path: '/product',
  name: '美的开放平台',
  component: _import('layout/index'),
  meta: { title: '美的开放平台' },
  redirect: '/product/documentCenter',
  children: [
    // {
    //   path: 'home',
    //   name: '登陆首页',
    //   component: _import('loginInHome/index'),
    //   meta: { title: '登陆首页' }
    // },
    // dataCenterRouter
    // IntelligentHardwareRouter,
    // applicationServiceRouter,
    documentCenterRouter
    // operationCenterRouter,
    // userInfoRouter
  ]
};
export default productRouter;
