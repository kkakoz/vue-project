<script setup>
import { ref, reactive } from 'vue';
import VideoItem from '@/components/VideoItem.vue'
import Tabbar from '@/components/Tabbar.vue';
import router from '@/routes/index'
import {  getCategories } from '@/api/home.js'
import VideoList from './component/video-list.vue'

const active = ref(0);

let categoryId = 0

const categoryList = ref([{ id: 0, name: "最新" }])

getCategories().then(res => {
  let data = res.data
  console.log("res = ",res)
  data.forEach(element => {
    categoryList.value.push(element)
  });
}).catch((err) => {
  throw err
})

console.log("list = ",categoryList)

function login() {
  router.push('/login')
}

</script>

<template>
  <van-nav-bar>
    <template #left>
      <van-image v-if="$store.getters.user"
          round
          width="10vw"
          height="10vw"
          :src="$store.getters.user.avatar"
      />
<!--      https://unpkg.com/@vant/assets/cat.jpeg-->
      <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" />
    </template>
    <template #right>

      <div v-if="!$store.getters.user" class="login text-blue-400" @click="login">
        登录
      </div>
    </template>
  </van-nav-bar>
  <van-tabs v-model:active="active" @click-tab="onClickTab">
    <van-tab :name="category.id" :title="category.name" v-for="category in categoryList">
      <VideoList :categoryId="category.id"></VideoList>
      <!-- <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <VideoItem v-for="item in videoList.arr" :video="item"></VideoItem>
      </van-list> -->
    </van-tab>
  </van-tabs>
  <Tabbar></Tabbar>
</template>

<style lang="scss" scoped>

.login {
  padding: .05rem;

  border-radius: 50%;
}


</style>