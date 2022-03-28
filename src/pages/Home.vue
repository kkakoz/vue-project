
<script setup>
import { ref, reactive } from 'vue';
import VideoItem from '../components/VideoItem.vue'
import Tabbar from '../components/Tabbar.vue';
import router from '../routes/index'
import { categories } from '../api/home.js'
import { current } from '../api/user';

const active = ref(0);

const list = ref([]);
const loading = ref(false);
const finished = ref(false);

var categorieList = reactive([{ id: 0, name: "最新" }])
categories().then(res => {
  res.forEach(element => {
    console.log("loop", element)
    categorieList.push(element)
  });
  console.log("list", categorieList)
}).catch((err) => {
  console.log(err)
})

current().then(res => {
  console.log("user = ",res)
})

function onClickTab(index) {
  console.log("click index", index)
}


const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1);
    }

    // 加载状态结束
    loading.value = false;

    // 数据全部加载完成
    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 1000);
};

function login() {
  router.push('/login')
}

// import router from '../routes';

// const toAbout = () => {
//   router.push('./about');
// };
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
    <van-tab :title="category.name" v-for="category in categorieList">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
        <VideoItem></VideoItem>
        <VideoItem></VideoItem>
        <VideoItem></VideoItem>
        <VideoItem></VideoItem>
      </van-list>
    </van-tab>
    <!-- <van-tab title="标签 2">内容 2{{categorieList}}</van-tab>
    <van-tab title="标签 3">内容 3</van-tab>
    <van-tab title="标签 4">内容 4</van-tab>-->
  </van-tabs>
  <Tabbar></Tabbar>
</template>

<style lang="scss" scoped>
// .list {
//   margin-top: 20px;
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
//   justify-content: space-around;
//   .video-item {
//     width: 45%;
//     height: 100px;
//     border: 1px solid orange;
//     border-radius: 10px;
//   }
// }
</style>