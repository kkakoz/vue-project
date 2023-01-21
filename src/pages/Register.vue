<template>
  <van-nav-bar left-arrow @click-left="onClickLeft" title="注册" class="page-nav-bar">
  <template #title>
    <div class="text-white">注册</div>
  </template>
  </van-nav-bar>

  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="email"
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
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit" :color="$store.state.baseColor">注册</van-button>
    </div>
  </van-form>
</template>

<script setup>
import {ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {register} from '../api/user.js'
import {Toast} from 'vant';

const route = useRoute()
const router = useRouter()

const email = ref('');
const name = ref("")
const password = ref('');
const onSubmit = (values) => {
  Toast.loading({
    message: '注册中...',
    forbidClick: true,
    loadingType: 'spinner',
  });


  register({
    email: email.value,
    name: name.value,
    password: password.value,
  }).then(res => {
    console.log("注册成功")
    Toast.success("注册成功")
    router.push("/login")
  })
  // try {
  //     const res = register({ identifier: identifier.value, credential: credential.value, identity_type: 1, })
  //     console.log("res=", res)
  //     Toast.success("注册成功")
  //     router.push("/login")
  // } catch (e) {
  //     console.log("e = ",e)
  // }

};
const onClickLeft = () => {
  router.push("/login")
}


</script>

<style scoped lang="scss">
.page-nav-bar {
  background-color: #fb7299;

  .van-nav-bar__title {
    color: white;
  }
}
</style>