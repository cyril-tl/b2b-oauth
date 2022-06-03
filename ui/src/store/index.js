import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions';
import getters from './getters.js';
import mutations from './mutations.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: null,
    cart: null,
    cartStatus: null,
    countries: null,
    linesCart: [],
    linesCartLength: 0,
    gammes: null,
    headerTitle: null,
    token: null,
    user: null,
    auth_base64: null,
  },
  actions,
  getters,
  mutations
})
