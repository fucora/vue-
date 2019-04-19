import Cookies from 'js-cookie';
// import { imgDoUpLoad, luaDoUpLoad } from '../../api/myAgreement';
const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop'
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1);
      } else {
        Cookies.set('sidebarStatus', 0);
      }
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1);
      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = withoutAnimation;
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR');
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation);
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device);
    }
    // 公用的上传
    // async imgDoUpLoad({ commit }, params) {
    //   let paramFormData = new FormData();
    //   // debugger;
    //   for (const key in params) {
    //     // key;
    //     paramFormData.append(key, params[key]);
    //     // debugger;
    //   }

    //   // param.append('uploadFile', params.item.file);
    //   return new Promise((resolve, reject) => {
    //     imgDoUpLoad(paramFormData)
    //       .then(res => {
    //         // console.log(res);
    //         debugger;
    //         // commit('luaDocList', res);
    //         resolve(res);
    //       }).catch(err => {
    //         reject(err);
    //       });
    //   });
    // },
    // // lua上传
    // async luaDoUpLoad({ commit }, params) {
    //   let paramFormData = new FormData();
    //   for (const key in params) {
    //     paramFormData.append(key, params[key]);
    //   }
    //   return new Promise((resolve, reject) => {
    //     luaDoUpLoad(paramFormData)
    //       .then(res => {
    //         debugger;
    //         resolve(res);
    //       }).catch(err => {
    //         reject(err);
    //       });
    //   });
    // }
  }
};

export default app;
