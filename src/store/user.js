import { auth } from "../firebase"

const state = {
    user: null
};

const getters = {};

const mutations = {
    setUser(state, user) {
        state.user = user;
    }
};

const actions = {
    async doLogin({ commit }, { email, password }) {
        await auth.signInWithEmailAndPassword(email, password);
        commit("setUser", auth.currentUser);
    },
    async doRegister({ commit }, { email, password }) {
        await auth.createUserWithEmailAndPassword(email, password);
        const user = auth.currentUser;
        // firestore update user
        await user.updateProfile({
            displayName: name
        });
        commit("setUser", user);
    },
    async doLogout({ commit }) {
        await auth.signOut();
        commit("setUser", null);
    }

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};