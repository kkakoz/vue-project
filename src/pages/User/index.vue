<template>
  <div v-if="user" class="flex flex-row pl-6 pr-6 pt-6 justify-between">

    <van-image round :src="user.avatar" fit="cover" width="20vw" height="20vw"/>
    <div class="flex flex-col">
      <div class="flex flex-row mb-2">
        <div class="flex-col text-center w-24">
          <div>{{ user.fans_count }}</div>
          <div class="text-gray-400">粉丝</div>
        </div>
        <span class="align-middle w-0.5 bg-gray-300 h-6 inline-block mt-2"></span>
        <div class="flex-col text-center w-24">
          <div>{{ user.follow_count }}</div>
          <div class="text-gray-400">关注</div>
        </div>
        <span class="align-middle w-0.5 bg-gray-300 h-6 inline-block mt-2"></span>
        <div class="flex-col text-center w-24">
          <div>{{ user.like_count }}</div>
          <div class="text-gray-400">获赞</div>
        </div>
      </div>
      <van-button round :color="$store.state.baseColor">关注</van-button>

      <!--      <div class="text-center pt-4 bg-blue-400 w-full" ></div>-->
    </div>
  </div>
  <div v-if="user" class="text-4xl text-center pt-2 flex pl-6 text-gray-700">
    {{ user.name }}
  </div>
  <div v-if="user && user.brief" class="text-1xl text-center pt-2 flex pl-6 text-gray-400">
    {{ user.brief }}
  </div>
  <div v-else class="text-1xl text-center pt-2 flex pl-6 text-gray-400">
    这个人很懒,什么也没留下
  </div>

  <van-tabs v-model:active="active">
    <van-tab title="动态">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="newsfeed in newsfeedList" :key="item" :title="item">
          <Newsfeed :newsfeed="newsfeed"/>
        </van-cell>
      </van-list>
    </van-tab>
    <van-tab title="投稿">

      <van-list v-model:loading="videoLoading" :finished="videoFinished" finished-text="没有更多了" @load="videoOnLoad">
        <van-cell v-for="video in videoList" :key="item" :title="item">
          <video-item :video="video"/>
        </van-cell>
      </van-list>
    </van-tab>
  </van-tabs>


</template>


<script setup>
import {reactive, ref} from "vue";
import {getUser} from "@/api/user";
import Newsfeed from "@/components/Newsfeed.vue";
import {useRouter} from "vue-router";
import {newsfeeds} from "../../api/news";
import {getVideos} from "../../api/video";
import VideoItem from "@/components/VideoItem.vue"

let props = defineProps({
  userId: Number
})


// init user
const userId = Number(props.userId)

const user = ref(null)

getUser({userId: userId}).then((res) => {
  user.value = res
})

// newsfeed list
let lastId = 0
let finished = ref(false)
let loading = ref(false)
const newsfeedList = ref([])

// 列表加载
const onLoad = () => {
  newsfeeds({userId: 1, lastId}).then(res => {
    let data = res.data
    if (data.length) {
      data.forEach(element => {
        newsfeedList.value.push(element)
      });
      lastId = data[data.length - 1].id
    } else {
      finished.value = true;
    }
    loading.value = false;
  })
};

// 投稿列表加载
let videoLastId = 0
let videoFinished = ref(false)
let videoLoading = ref(false)
const videoList = ref([])

// 列表加载
const videoOnLoad = () => {
  getVideos({userId: userId, lastId: videoLastId}).then((res) => {
    let data = res.data
    if (data.length) {
      data.forEach(element => {
        videoList.value.push(element)
      });
      videoLastId = data[data.length - 1].id
    } else {
      console.log("finish")
      videoFinished.value = true;
    }
    videoLoading.value = false;
  }).catch((e) => {
    console.log(e)
  })

};


</script>

<style>


</style>