import Vue from 'vue';
import Vuex from 'vuex';
import applySdk from './modules/applySdk';
import hardwareList from './modules/hardwareList';
import hardwareProductDetails from './modules/hardwareProductDetails';
import user from './modules/user';
import myAgreement from './modules/myAgreement';
import app from './modules/app';
import getters from './getters';
// import products from './modules/products';
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    applySdk,
    hardwareList,
    hardwareProductDetails,
    user,
    myAgreement
    // products
  },
  getters
});

export default store;
