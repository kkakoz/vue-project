import {
    createStore
} from "vuex";

const TOKEN_KEY = "TOKEN_KEY"

const store = createStore({
    state() {
        return {
            user: null,
            token: "",
            baseColor: "#fb7299",

            ws: null, //建立的连接
            lockReconnect: false, //是否真正建立连接
            timeout: 15000, //15秒一次心跳
            timeoutObj: null, //心跳心跳倒计时
            serverTimeoutObj: null, //心跳倒计时
            timeoutnum: null, //断开 重连倒计时
            msg: null //接收到的信息
        }
    },
    getters: {
        user(state) {
            if (state.user) {
                return state.user
            }
            let user = localStorage.getItem("user")
            if (user) {
                return JSON.parse(user)
            }
            return null
        },
        token(state) {
            if (state.token) {
                return state.token
            }
            let token = localStorage.getItem("user:token")
            if (token) {
                return token
            }
            return null
        },
        // 获取接收的信息
        socketMsgs: state => {
            return state.msg
        }
    },
    mutations: {
        setUser(state, data) {
            state.user = data
            localStorage.setItem("user", JSON.stringify(data))
        },
        setAvatar(state, data) {
            if (state.user) {
                return state.user
            }
            let user = localStorage.getItem("user")
            if (user) {
                user = JSON.parse(user)
            }
            user.avatar = data
            localStorage.setItem("user", JSON.stringify(user))
            state.user = user
        },
        logout(state) {
            localStorage.removeItem("user")
            localStorage.removeItem("user:token")
            state.user = null
            state.token = null
        },
        //初始化ws 用户登录后调用
        webSocketInit(state) {
            let that = this
            //this 创建一个state.ws对象【发送、接收、关闭socket都由这个对象操作】
            state.ws = new WebSocket(import.meta.env.VITE_WS_API);
            console.log(state.ws)
            state.ws.binaryType = "arraybuffer"
            state.ws.onopen = function (res) {
                state.ws.send("111")
                state.ws.send("222")
                console.log("Connection success...");
                /**
                 * 启动心跳检测
                 */
                that.commit("start");
            }
            state.ws.onmessage = function (res) {
                console.log("recv = ", res)
                var array = new Int16Array(res.data, 0, 1)
                // let command = res.data.readInt16BE(0)
                // let len = res.data.readInt32BE(2)
                console.log("command = ", array)
                // console.log("len = ", len)
                if (res.data === "heartCheck") {
                    // 收到服务器信息，心跳重置
                    that.commit("reset");
                    console.log("socket-heartCheck");
                } else {

                    state.msg = res;
                }

            }
            state.ws.onclose = function (res) {
                console.log("Connection closed...");
                //重连
                that.commit('reconnect');
            }
            state.ws.onerror = function (res) {
                console.log("Connection error...");
                //重连
                that.commit('reconnect');
            }
        },
        reconnect(state) {
            //重新连接
            let that = this;
            if (state.lockReconnect) {
                return;
            }
            state.lockReconnect = true;
            //没连接上会一直重连,30秒重试请求重连，设置延迟避免请求过多
            state.timeoutnum &&
            clearTimeout(state.timeoutnum);
            state.timeoutnum = setTimeout(() => {
                //新连接
                that.commit('webSocketInit')
                state.lockReconnect = false;
            }, 5000);
        },
        reset(state) {
            //重置心跳
            let that = this;
            //清除时间
            clearTimeout(state.timeoutObj);
            clearTimeout(state.serverTimeoutObj);
            //重启心跳
            that.commit('start')
        },
        start(state) {
            //开启心跳
            var self = this;
            state.timeoutObj &&
            clearTimeout(state.timeoutObj);
            state.serverTimeoutObj &&
            clearTimeout(state.serverTimeoutObj);
            state.timeoutObj = setTimeout(() => {
                //这里发送一个心跳，后端收到后，返回一个心跳消息，
                if (state.ws.readyState === 1) {
                    //如果连接正常
                    state.ws.send("heartCheck");
                } else {
                    //否则重连
                    self.commit('reconnect');
                }
                state.serverTimeoutObj = setTimeout(function () {
                    //超时关闭
                    state.ws.close();
                }, state.timeout);
            }, state.timeout);
        },
    },
    actions: {
        webSocketInit({
                          commit
                      }, url) {
            commit('webSocketInit', url)
        },
        webSocketSend({
                          commit
                      }, p) {
            commit('webSocketSend', p)
        }
    }
})

export default store