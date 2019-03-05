// Store

import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'UHZ',
  storage: localStorage,
})

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [vuexPersist.plugin],
});
