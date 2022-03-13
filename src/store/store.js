import {
    createStore
} from "vuex";

const TOKEN_KEY = "TOKEN_KEY"

const store = createStore({
    state() {
        return {
            count: 666,
            user: null
        }
    },
    mutations: {
        setUser(state, data) {
            state.user = data
        },
        add(state) {
            state.count++
        }
    },
    actions: {
        asyncAdd({
            commit
        }) {
            setTimeout(() => {
                commit('add')
            }, 1000)
        }
    }
})

export default store