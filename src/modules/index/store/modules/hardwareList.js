import API from '../../api/myProductsData';
import ls from '@/utils/storage/local_storage';
const hardwareList = {
  state: {
    dataList: [],
    pageObj: {
      total: null
    },
    network: [],
    proto: []
  },
  mutations: {
    HARDWARELIST(state, data) {
      // debugger;
      // state.dataList = data.params.result.data;
      // state.pageObj.total = data.params.result.total;
      // data.result.data[0].network = 2;
      state.dataList = data.result.data;
      state.pageObj.total = data.result.total;
    },
    NETWORK(state, data) {
      state.network = data.result;
      ls.addItem('network', data.result);
    },
    proto(state, data) {
      state.proto = data.result;
      ls.addItem('proto', data.result);
    }
  },
  actions: {
    async getHardwareList({ commit }, params) {
      return new Promise((resolve, reject) => {
        API.hardwreList(params)
          .then(res => {
            console.log(res);
            // debugger;
            commit('HARDWARELIST', res);
            resolve(res);
          }).catch(err => {
            reject(err);
          });
      });
    },
    // id获取详情
    async getHardware({ commit }, params) {
      return new Promise((resolve, reject) => {
        API.getHardware(params)
          .then(res => {
            console.log(res);
            resolve(res);
          }).catch(err => {
            reject(err);
          });
      });
    },
    async getNetwork({ commit }, params) {
      return new Promise((resolve, reject) => {
        API.getNetwork(params)
          .then(res => {
            commit('NETWORK', res);
            resolve(res);
          }).catch(err => {
            reject(err);
          });
      });
    },
    async getProtos({ commit }, params) {
      // debugger;
      return new Promise((resolve, reject) => {
        API.getProtos(params)
          .then(res => {
            // debugger;
            commit('proto', res);
            resolve(res);
          }).catch(err => {
            reject(err);
          });
      });
    },
    // 下拉0/1

    async getcategorySelect({ commit }, params) {
      // debugger;
      return new Promise((resolve, reject) => {
        API.getcategorySelect(params)
          .then(res => {
            // commit('NETWORK', res);
            resolve(res);
          }).catch(err => {
            reject(err);
          });
      });
    },
    async getApplianSelect({ commit }, params) {
      // debugger;
      return new Promise((resolve, reject) => {
        API.getApplianSelect(params)
          .then(res => {
            // commit('NETWORK', res);
            resolve(res);
          }).catch(err => {
            reject(err);
          });
      });
    },
    // 新增
    async addHardware({ commit }, params) {
      // debugger;
      return new Promise((resolve, reject) => {
        API.addHardware(params)
          .then(res => {
            // commit('NETWORK', res);
            resolve(res);
          }).catch(err => {
            reject(err);
          });
      });
    },
    // getWifiSdkLib
    async getWifiSdkLib({ commit }, params) {
      // debugger;
      return new Promise((resolve, reject) => {
        API.getWifiSdkLib(params)
          .then(res => {
            // commit('NETWORK', res);
            resolve(res);
          }).catch(err => {
            reject(err);
          });
      });
    },
    // getLuaList
    async getLuaList({ commit }, params) {
      // debugger;
      return new Promise((resolve, reject) => {
        API.getLuaList(params)
          .then(res => {
            // commit('NETWORK', res);
            resolve(res);
          }).catch(err => {
            reject(err);
          });
      });
    },
    // hardRelationLua
    async hardRelationLua({ commit }, params) {
      // debugger;
      return new Promise((resolve, reject) => {
        API.hardRelationLua(params)
          .then(res => {
            // commit('NETWORK', res);
            resolve(res);
          }).catch(err => {
            reject(err);
          });
      });
    },
    // getSdkLib
    async getSdkLib({ commit }, params) {
      // debugger;
      return new Promise((resolve, reject) => {
        API.getSdkLib(params)
          .then(res => {
            // commit('NETWORK', res);
            resolve(res);
          }).catch(err => {
            reject(err);
          });
      });
    },
    // updateHard
    async updateHard({ commit }, params) {
      // debugger;
      return new Promise((resolve, reject) => {
        API.updateHard(params)
          .then(res => {
            // commit('NETWORK', res);
            resolve(res);
          }).catch(err => {
            reject(err);
          });
      });
    },
    // 中止硬件stopProject
    async stopProject({ commit }, params) {
      // debugger;
      return new Promise((resolve, reject) => {
        API.stopProject(params)
          .then(res => {
            // commit('NETWORK', res);
            resolve(res);
          }).catch(err => {
            reject(err);
          });
      });
    }
  }
};
export default hardwareList;
