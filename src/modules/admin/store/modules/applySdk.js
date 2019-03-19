import API from '../../api/myProductsData';
const applySdk = {
  state: {
    dataList: [],
    pageObj: {
      total: null
    }
  },
  mutations: {
    SDKLIST(state, data) {
      state.dataList = data.reulst;
      state.pageObj.total = data.Pagetotal;
    }
  },
  actions: {
    getSdkList({ commit }, params) {
      return new Promise((resolve, reject) => {
        API.wifiSdkGetList(params)
          .then(res => {
            console.log(res);
            commit('SDKLIST', res);
            resolve(res);
          }).catch(err => {
            reject(err);
          });
      });
    }
  }
};
export default applySdk;
