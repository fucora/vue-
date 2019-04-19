import 'babel-polyfill';
import '../../styles/base.less';
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import directives from '@/common/js/directive/authority_directive';

import store from './store/index';
// import VueRouter from 'vue-router';
// import routes from './router/index';
import router from './router';
// 模拟数据
// import './mock';
// const router = new VueRouter({
//   routes
// });

import '@/icons';
import './permission'; // permission control
Vue.use(ElementUI);
Vue.use(directives);
// Vue.use(VueRouter);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
