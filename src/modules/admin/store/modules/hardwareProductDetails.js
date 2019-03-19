// import API from './../../api/myProductsData';
// import ls from '@/utils/storage/local_storage';
const hardwareProductDetails = {
  state: {
    hardwareProductDetail: {},
    tableLabel: {
      // verifyStatus: '状态',
      applianceType: '产品分类',
      sn8: '产品型号码',
      name: '产品名称',
      // proto: '支持协议',
      webNetworkDiscription: '联网方式',
      webProtosDiscription: '支持协议',
      // network: '联网方式',
      wifisdkName: '接入SDK',
      testKey: '测试key',
      productKey: '正式key',
      // publicStatis: '', // 新建状态
      // 批产lisence
      luaName: '型号码0xAC0100lua脚本',
      sdkLibName: 'SDKlib库',
      other: '其他要求'
    },
    applianceTypeArr: {},
    variable: {}
  },
  mutations: {
    HARDWAREPRODUCTDETAIL(state, data) {
      // debugger;
      if (data.detail) {
        for (const detailKey in data.detail) {
          if (detailKey === 'subCategoryName' || detailKey === 'cateGoryName' || detailKey === 'applianceType') {
            state.applianceTypeArr[detailKey] = data.detail[detailKey];
          }
        }
        // debugger;
        for (const key in state.tableLabel) {
          if (key === 'applianceType') {
            state.variable[key] = state.applianceTypeArr;
          } else {
            state.variable[key] = data.detail[key];
          }
        }
        // debugger;
        state.hardwareProductDetail = state.variable;
        // ls.addItem('hardwareProductDetail', state.hardwareProductDetail);
      } else {
        // state.hardwareProductDetail = ls.getObject('hardwareProductDetail');
      }
    }
  },
  actions: {
    async getHardwareProductDetail({ commit, state }, params) {
      // debugger;
      //     for (const key in state.tableLabel) {
      //       state.variable[key] = params.detail[key];
      //     }
      //     debugger;
      //     console.log(state.variable);
      // return new Promise((resolve, reject) => {
      //   API.getHardwareProductDetails(params).then((result) => {
      //     for (const key in state.tableLabel) {
      //       state.variable[key] = result.result[key];
      //     }
      //     console.log(state.variable);
      //     resolve(result);
      //     commit('HARDWAREPRODUCTDETAIL', state.variable);
      //   }).catch((err) => {
      //     reject(err);
      //   });
      // });
    }
  }
};
export default hardwareProductDetails;
