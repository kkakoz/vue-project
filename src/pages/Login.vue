<template>
    <van-nav-bar title="登录" class="page-nav-bar" />
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                v-model="identifier"
                name="邮箱"
                label="邮箱"
                placeholder="邮箱"
                :rules="[{ required: true, message: '请填写邮箱' }]"
            />
            <van-field
                v-model="credential"
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
    </van-form>
    <div style="margin: 16px;">
        <van-button round block type="primary" @click="toRegister">注册</van-button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '../routes'
import { login } from '../api/user.js'
import { Toast } from 'vant';
import { useStore } from 'vuex'

const store = useStore()
const identifier = ref('123@qq.com');
const credential = ref('123456');
const onSubmit = (values) => {
    Toast.loading({
        message: '登录中...',
        forbidClick: true,
        loadingType: 'spinner',
    });

    login({
        identifier: identifier.value,
        credential: credential.value,
        identity_type: 1,
    }).then(res => {
        store.commit("setUser", { username: identifier.value, token: res })
        store.commit("setToken", res)
        
        console.log('user = ', store.state.user)
        Toast.success("登录成功")
        router.push("/")
    })

};
const toRegister = () => {
    router.push('/register')
}
</script>

<style scoped lang="scss">
.page-nav-bar {
    background-color: #3296fa;
    .van-nav-bar__title {
        color: #fff;
    }
}
</style>