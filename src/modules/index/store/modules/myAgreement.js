import {getLuaDocList, deleteDoc, getSn8Select, addDoc} from '../../api/myAgreement';
const myAgreement = {
  state: {
    luaDocList: [],
    pageObj: {
      total: null
    }
  },
  mutations: {
    luaDocList(state, data) {
      // debugger;
      // state.dataList = data.params.result.data;
      // state.pageObj.total = data.params.result.total;
      // data.result.data[0].network = 2;
      // state.luaDocList = data.result.data;
      // state.pageObj.total = data.result.total;
    }
  },
  actions: {
    async getLuaDocList({ commit }, params) {
      return new Promise((resolve, reject) => {
        getLuaDocList(params)
          .then(res => {
            // console.log(res);
            // debugger;
            // commit('luaDocList', res);
            resolve(res);
          }).catch(err => {
            reject(err);
          });
      });
    },
    async deleteDoc({ commit }, params) {
      return new Promise((resolve, reject) => {
        deleteDoc(params)
          .then(res => {
            // console.log(res);
            // debugger;
            // commit('luaDocList', res);
            resolve(res);
          }).catch(err => {
            reject(err);
          });
      });
    },
    async getSn8Select({ commit }, params) {
      return new Promise((resolve, reject) => {
        getSn8Select(params)
          .then(res => {
            // console.log(res);
            // debugger;
            // commit('luaDocList', res);
            resolve(res);
          }).catch(err => {
            reject(err);
          });
      });
    },
    async addDoc({ commit }, params) {
      return new Promise((resolve, reject) => {
        addDoc(params)
          .then(res => {
            // console.log(res);
            // debugger;
            // commit('luaDocList', res);
            resolve(res);
          }).catch(err => {
            reject(err);
          });
      });
    }
  }
};
export default myAgreement;
