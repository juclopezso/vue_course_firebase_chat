import { db } from "../firebase"

const state = {
    rooms: [],
    // empty functions to load o save things inside
    // used on mutationss
    roomsListener: () => {}
}

const getters = {
    // function inside fucntion, id is a parameter
    // get the room from vuex
    getRoom: state => id => {
        return state.rooms.find(room => room.id === id)
    }
}

const mutations = {
    setRoomsListener(state, listener) {
        if (listener) {
            state.roomsListener = listener
        } else {
            // unsubscribe the listener
            state.roomsListener()
        }
    },
    setRooms(state, rooms) {
        state.rooms = rooms;
    },
    // mutations for docChanges types
    // used on actions / getRooms
    createRoom(state, {roomData, id}) {
        roomData.id = id
        state.rooms.unshift(roomData)
    },
    updateRoom(state, { index, roomData, id }) {
        roomData.id = id
        state.rooms[index] = roomData
    },
    removeRoom(state, index) {
        state.rooms.splice(index, 1)
    }
};

const actions = {
    // rootState for connect other modules
    async createRoom({ rootState }, { name, description }) {
        await db.collection('rooms').add({
            name,
            description,
            createdAt: Date.now(),
            // rootState.module.property.id
            adminUid: rootState.user.user.uid,
            adminName: rootState.user.user.displayName
        })
    },
    async getRooms({ commit }) {
        const query = db.collection('rooms').orderBy('createdAt', 'desc').onSnapshot(doSnapshot)
        commit("setRoomsListener", query)

        function doSnapshot(querySnapshot) {
            querySnapshot.docChanges().forEach(change => {
                if (change.type == "added") {
                    commit("createRoom", {
                        roomData: change.doc.data(),
                        id: change.doc.id
                    })
                }
                if (change.type == "modified") {
                    commit("updateRoom", {
                        index: change.newIndex,
                        roomData: change.doc.data(),
                        id: change.doc.id
                    })
                }
                if (change.type == "removed") {
                    commit("removeRoom", change.oldIndex)
                }
            })
        commit('setLoading', false, { root: true })
        }
    },
    // get the room from firestore
    async getRoom(context, roomId) {
        return await db.collection("rooms").doc(roomId).get()
    },
    async updateRoom(context, {roomId, name, description}) {
        const roomData = {}
        if (name) roomData.name = name;
        if (description) roomData.description = description;
        await db.collection("rooms").doc(roomId).update(roomData)
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