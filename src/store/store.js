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
    mutations: {
        setUser(state, data) {
            state.user = data
        },
        add(state) {
            state.count++
        },
        setToken(state, data) {
            state.token = data
            localStorage.setItem("user:token", data)
        }
    },
    actions: {
    }
})

export default store