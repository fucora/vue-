const getters = {
  sdkList: state => state.applySdk.dataList,
  sdkListTotal: state => state.applySdk.pageObj.total,

  hardwareList: state => state.hardwareList.dataList,
  networkArr: state => state.hardwareList.network,
  protoArr: state => state.hardwareList.proto,
  applianceTypeArr: state => state.hardwareProductDetails.applianceTypeArr,
  hardwareDetail: state => state.hardwareProductDetails.hardwareProductDetail,
  tableLabel: state => state.hardwareProductDetails.tableLabel,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  saveGetUserInfo: state => state.user.saveGetUserInfo,
  roles: state => state.user.roles,
  // productsList: state => state.products.productsList
  myAgreemenLuaDocList: state => state.myAgreement.luaDocList,
  equipmentUserStatistics: state => state.user.equipmentUserStatistics,
  routerPath: state => state.user.routerPath // 前端路由记录
};
export default getters;
