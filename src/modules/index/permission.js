import router from './router';
// import store from './store';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条样式
// import { Message } from 'element-ui';
import { getToken } from '@/utils/auth'; // 验权
import commonFun from '@/common/js/func';

const whiteList = ['/login', '/platformIntroduction', '/register', '/forget', '/developGuideTop']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  console.log(getToken());
  // debugger;

  if (getToken()) {
    // debugger;
    if (to.path === '/login') {
      // debugger;
      next({ path: '/product' });
      NProgress.done(); // if current page is dashboard will not trigger afterEach hook, so manually handle it
    } else {
      // debugger;
      // if (store.getters.roles.length === 0) {
        // store.dispatch('GetInfo').then(res => { // 拉取用户信息
        // console.log(store.getters.roles, 'store.getters.rolesstore.getters.roles');
        next();
        // }).catch((err) => {
        // store.dispatch('FedLogOut').then(() => {
        //   Message.error(err || 'Verification failed, please login again');
        //   next({ path: '/' });
        // });
        // });
      // } else {
        // next();
      // }
    }
  } else {
    let rootPath = commonFun.getRootPath(to.path);
    console.log(rootPath);
    if (whiteList.indexOf(rootPath) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
