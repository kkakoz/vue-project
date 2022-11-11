<template>
  <van-nav-bar fixed="true"  placeholder left-arrow @click-left="onCancel">
    <template #title>
      <van-search
          v-model="search"
          shape="round"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"

      />
    </template>

  </van-nav-bar>

  <van-list v-if="show" v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="video in videoList" :key="item" :title="item">
      <VideoItem :video="video"/>
    </van-cell>
  </van-list>

</template>

<script setup>

import {ref} from "vue";
import {useRouter} from "vue-router";
import {getVideos} from "../../api/video";
import VideoItem from "../../components/VideoItem.vue";

const search = ref("")
let router = useRouter()
const show = ref(false)



const onCancel = () => {
  router.go(-1)
}

let lastId = 0
let finished = ref(false)
let loading = ref(false)
const videoList = ref([])

const onSearch = () => {
  videoList.value = []
  finished.value = false
  loading.value = false
  lastId = 0
  show.value = true
}

// 列表加载
const onLoad = () => {
  getVideos({lastId, search: search.value}).then(res => {
    let data = res.data
    console.log("data = ", data)
    if (data.length) {
      console.log("in length")
      data.forEach(element => {
        videoList.value.push(element)
      });
      lastId = data[data.length - 1].id
    } else {
      console.log("finish")
      finished.value = true;
    }
    loading.value = false;
  })
};


</script>