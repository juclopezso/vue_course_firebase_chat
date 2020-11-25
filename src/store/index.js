import Vue from 'vue'
import Vuex from 'vuex'

import messages from "./messages";
import user from "./user";
import rooms from "./rooms";
import utils from "./utils";

import { auth } from "../firebase"

Vue.use(Vuex)

// to load an the initial function checkAuth()
const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    // checks to firebase if the user is still logged in
    checkAuth({ commit }) {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          commit("user/setUser", user);
        } else {
          commit("user/setUser", null);
        }
      })
    }
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