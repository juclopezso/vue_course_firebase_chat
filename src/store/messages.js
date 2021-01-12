import { db } from '../firebase.js'

const state = {
    messages: [],
    messagesListener: () => {}
}

const getters = {};

const mutations = {
    setMessages(state, messages) {
        state.messages = messages
    },
    setMessagesListener(state, listener) {
        if (listener) {
            state.listener = listener
        } else {
            // unsubscribe
            state.messagesListener();
        }
    }
};

const actions = {
    async getMessages({ commit }, roomId) {
        const query = db.collection("rooms").doc(roomId).collection("messages")
            .orderBy("createdAt", "desc")
            .onSnapshot(doSnapshot);

        commit("setMessagesListener", query)

        function doSnapshot(querySnapshot) {
            const messages = []
            querySnapshot.forEach(doc => {
                let message = doc.data()
                message.id = doc.id
                messages.unshift(message)
            })
            commit("setMessages", messages)
        }
    },
    async createMessage({ rootState }, { roomId, message }) {
        await db.collection("rooms").doc(roomId).collection("messages")
            .add({
                userId: rootState.user.user.uid,
                userName: rootState.user.user.displayName,
                message,
                createdAt: Date.now()
            })
    }
};

export default {
    // separar del todo los modulos vuex
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};