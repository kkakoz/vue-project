<template>
  <van-nav-bar  class="page-nav-bar" left-arrow @click-left="goBack">
    <template #title>
      <div class="text-white">登录</div>
    </template>
  </van-nav-bar>
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
    <van-button round block type="primary" native-type="submit" :color="$store.state.baseColor">登录</van-button>
  </van-form>
  <div class="mt-2">
    <van-button round block type="primary" :color="$store.state.baseColor" @click="toRegister">注册</van-button>
  </div>
</template>

<script setup>
import {ref} from 'vue'

import {login} from '../api/user.js'
import {Toast} from 'vant';
import {useStore} from 'vuex'
import {current} from '../api/user';
import {useRoute, useRouter} from 'vue-router'
import {onMounted} from "vue";

const store = useStore()
const name = ref('');
const password = ref('');

let route = useRoute()
let router = useRouter()

onMounted(() => {
  if (window.history && window.history.pushState) {
    // 向历史记录中插入了当前页
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', goBack, false);
  }
})

const goBack = () => {
  // console.log("点击了浏览器的返回按钮");
  sessionStorage.clear();
  window.history.back();
}



const onSubmit = async (values) => {
  Toast.loading({
    message: '登录中...',
    forbidClick: true,
    loadingType: 'spinner',
  });

  try {
    let res = await login({
      name: name.value,
      password: password.value,
    })
    console.log("res=",res)
    localStorage.setItem("user:token", res.token)
    let cur = await current()
    store.commit("setUser", cur)
    Toast.success("登录成功")
    // await store.dispatch("webSocketInit")
    if (route.query.back) {
      await router.push(route.query.back)
    } else {
      await router.push("/")
    }
  } catch (e) {
    console.log("e = ", e)
    // Toast.fail("登录失败" + e.msg)
  }


};
const toRegister = () => {
  router.push({
    path: "/register",
    query: {
      back: route.query.back
    }
  })
}
</script>

<style scoped lang="scss">
.page-nav-bar {
  background-color: #fb7299;

}
</style>