import Vue from 'vue'
import Vuex from 'vuex'

import messages from "./messages";
import user from "./user";
import rooms from "./rooms";
import utils from "./utils";

Vue.use(Vuex)

// to load an the initial function checkAuth()
const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    // checkAuth(context) {}
  },
  modules: {
    messages,
    user,
    rooms,
    utils
  }
})

export default store;

// inital load
store.dispatch("checkAuth");