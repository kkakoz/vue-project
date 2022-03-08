<script setup>
import { ref } from 'vue';

const active = ref(0);
// import router from '../routes';

// const toAbout = () => {
//   router.push('./about');
// };
</script>

<template>
  <router-view name="login"/>
  <van-nav-bar>
    <template #left>
      <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" />
    </template>
  </van-nav-bar>
  <router-view />
  <van-tabbar route :placeholder="true">
    <van-tabbar-item to="/home" icon="home-o">主页</van-tabbar-item>
    <van-tabbar-item to="/about" icon="guide-o">动态</van-tabbar-item>
    <van-tabbar-item to="/about" icon="friends-o">私信</van-tabbar-item>
    <van-tabbar-item to="/about" icon="user-circle-o">我的</van-tabbar-item>
  </van-tabbar>
</template>
