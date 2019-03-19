/**
 * Created by CHENRC2 on 2017-8-2.
 */
// import Vue from 'vue';
import ls from '@/utils/storage/local_storage.js';
// import _ from 'lodash';

let filterSubNodes = (subNodes, authName) => {
  let isAuthority = false;
  subNodes.forEach(sub => {
    if (sub.fdKey === authName) {
      isAuthority = true;
    } else if (sub.subNodes.length > 1 && !isAuthority) {
      isAuthority = filterSubNodes(sub.subNodes, authName);
    }
  });
  return isAuthority;
};

/**
 * 用户鉴权 指令
 *  [*]不需要鉴权
 */
// Vue.directive('authority', {
//   bind(el, binding, vnode) {
//     debugger;
//     const menus = ls.getObject('menus');
//     const authName = binding.value.fdKey;
//     const styleDisplay = el.style.display;
//     menus.forEach(menu => {
//       let href = window.location.href;
//       if (href.indexOf(menu.fdFrontLink) > 0) {
//         if (filterSubNodes(menu.subNodes, authName)) {
//           el.style.display = styleDisplay;
//         } else {
//           el.style.display = 'none';
//         }
//       }
//     });
//   }
// });
export default (Vue) => {
  Vue.directive('authority', {
    bind(el, binding, vnode) {
      const buttonFlag = ls.getObject('buttonFlag');
      const authName = binding.value;
      const styleDisplay = el.style.display;
      // const arr = [];
      // buttonFlag.forEach(menu => {
      //   arr.push(menu.permissionTag);
      // });
      // debugger;
      if (buttonFlag) {
        if (buttonFlag.indexOf(authName) > -1) {
          el.style.display = styleDisplay;
        } else {
          el.style.display = 'none';
        }
      }
    }
  });
  Vue.prototype.isGoToRequest = function () {
   let isFlag = document.querySelector('#nprogress');
  //  debugger;
    return isFlag;
  };
};

