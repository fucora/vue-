const _import = require('./../_import_' + process.env.NODE_ENV);
import { dataCenterRouter } from './dataCenter';
const productRouter = {
  path: '/product',
  name: '开发者平台系统管理',
  component: _import('layout/index'),
  meta: { title: '开发者平台系统管理' },
  redirect: '/product/dataCenter',
  children: [
    dataCenterRouter
  ]
};
export default productRouter;