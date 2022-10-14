<template>
    <van-nav-bar title="登录" class="page-nav-bar" />
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                v-model="name"
                name="邮箱"
                label="邮箱"
                placeholder="邮箱"
                :rules="[{ required: true, message: '请填写邮箱' }]"
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
import { current } from '../api/user';
localStorage.clear()
const store = useStore()
const name = ref('a@b.com');
const password = ref('ttt');
const onSubmit = (values) => {
    Toast.loading({
        message: '登录中...',
        forbidClick: true,
        loadingType: 'spinner',
    });

    login({
      name: name.value,
      password: password.value,
        identity_type: 1,
    }).then(res => {
        store.commit("setToken", res.token)
        current().then(res => {
            store.commit("setUser", res)
        })
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