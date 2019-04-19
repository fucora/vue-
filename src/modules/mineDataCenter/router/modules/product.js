const _import = require('./../_import_' + process.env.NODE_ENV);
import { dataCenterRouter } from './dataCenter';
const productRouter = {
  path: '/product',
  name: '美的开放平台',
  component: _import('layout/index'),
  meta: { title: '美的开放平台' },
  redirect: '/product/dataCenter',
  children: [
    dataCenterRouter
  ]
};
export default productRouter;
