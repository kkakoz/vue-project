<template>
    <van-nav-bar title="登录" class="page-nav-bar" />
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                v-model="username"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">登录</van-button>
        </div>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">注册</van-button>
        </div>
    </van-form>
</template>

<script setup>
import { ref } from 'vue'
import router from '../routes'
import { login } from '../api/user.js'
import { Toast } from 'vant';
import { useStore } from 'vuex'

const store = useStore()
const username = ref('1');
const password = ref('1');
const onSubmit = (values) => {
    login({username: username.value, password: password.value})
    console.log('submit', values);

    store.commit("setUser", { username: username.value, password: password.value })
    console.log('user = ', store.state.user)
    Toast.success("登录成功")
    router.push("/")

};
</script>

<style scoped lang="scss">
.page-nav-bar {
    background-color: #3296fa;
    .van-nav-bar__title {
        color: #fff;
    }
}
</style>