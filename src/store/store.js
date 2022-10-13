import {
    createStore
} from "vuex";

const TOKEN_KEY = "TOKEN_KEY"

const store = createStore({
    state() {
        return {
            count: 666,
            user: null,
            token: "",
        }
    },
    getters: {
        user(state) {
            return state.user
        }
    },
    mutations: {
        setUser(state, data) {
            state.user = data
            localStorage.setItem("user", JSON.stringify(data))
        },
        add(state) {
            state.count++
        },
        setToken(state, data) {
            state.token = data
            localStorage.setItem("user:token", data)
        }
    },
    actions: {}
})

export default store