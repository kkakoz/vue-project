<template>
    <van-nav-bar left-arrow @click-left="onClickLeft" title="注册" class="page-nav-bar" />
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
                v-model="name"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
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
            <van-button round block type="primary" native-type="submit">注册</van-button>
        </div>
    </van-form>
</template>

<script setup>
import { ref } from 'vue'
import router from '../routes'
import { register } from '../api/user.js'
import { Toast } from 'vant';
import { useStore } from 'vuex'

const store = useStore()
const identifier = ref('1234@qq.com');
const name = ref("李四")
const credential = ref('123456');
const onSubmit = (values) => {
    Toast.loading({
        message: '注册中...',
        forbidClick: true,
        loadingType: 'spinner',
    });


    register({
        identifier: identifier.value,
        credential: credential.value,
        identity_type: 1,
    }).then(res => {
        console.log("res", res)
        Toast.success("注册成功")
        router.push("/login")
    }).catch(err => {
        console.log("login err", err)
    })
    // try {
    //     const res = register({ identifier: identifier.value, credential: credential.value, identity_type: 1, })
    //     console.log("res=", res)
    //     Toast.success("注册成功")
    //     router.push("/login")
    // } catch (e) {
    //     console.log(e)
    // }



};
const onClickLeft = () => history.back()


</script>

<style scoped lang="scss">
.page-nav-bar {
    background-color: #3296fa;
    .van-nav-bar__title {
        color: #fff;
    }
}
</style>