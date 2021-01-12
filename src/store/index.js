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
    isLoading: true
  },
  mutations: {
    setLoading(state, loading) {
      state.isLoading = loading;
    }
  },
  actions: {
    // checks to firebase if the user is still logged in
    // exxecutes on every user request
    checkAuth({ dispatch, commit }) {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          commit("user/setUser", user);
          dispatch("rooms/getRooms")
        } else {
          commit("user/setUser", null);
          commit("rooms/setRooms", [])
          // unsubscribe
          commit("rooms/setRoomsListener", () => {})
          commit("messages/setMessages", [])
          commit("messages/setMessagesListener", () => {})
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