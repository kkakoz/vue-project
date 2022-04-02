
<script setup>
import { ref, reactive } from 'vue';
import VideoItem from '@/components/VideoItem.vue'
import Tabbar from '@/components/Tabbar.vue';
import router from '@/routes/index'
import {  getCategories } from '@/api/home.js'
import { current } from '@/api/user';
import { useStore } from 'vuex'
import VideoList from './component/video-list.vue'
const active = ref(0);

const list = ref([]);

let categoryId = 0

const categorieList = reactive([{ id: 0, name: "最新" }])

getCategories().then(res => {
  categoryId = res[res.length - 1].id
  res.forEach(element => {
    categorieList.push(element)
  });
}).catch((err) => {
  console.log(err)
})

function login() {
  router.push('/login')
}

</script>

<template>
  <van-nav-bar>
    <template #left>
      <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" />
    </template>
    <template #right>
      <van-button @click="login">登录</van-button>
    </template>
  </van-nav-bar>
  <van-tabs v-model:active="active" @click-tab="onClickTab">
    <van-tab :name="category.id" :title="category.name" v-for="category in categorieList">
      <VideoList :categoryId="category.id"></VideoList>
      <!-- <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <VideoItem v-for="item in videoList.arr" :video="item"></VideoItem>
      </van-list> -->
    </van-tab>
  </van-tabs>
  <Tabbar></Tabbar>
</template>

<style lang="scss" scoped>
</style>