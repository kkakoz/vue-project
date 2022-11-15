<template>
  <van-nav-bar title="收藏列表" fixed="true"  placeholder/>

  <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="video in videos" :key="item" :title="item">
      <VideoItem  :video="video.video"/>
    </van-cell>
  </van-list>

</template>


<script setup>
import VideoItem from "@/components/VideoItem.vue";
import {ref} from "vue";
import {getCollectListApi} from "../../api/collect";

let lastId = 0
let finished = ref(false)
let loading = ref(false)
const videos = ref([])

// 列表加载
const onLoad = () => {
  getCollectListApi({lastId}).then(res => {
    let data = res.data
    console.log("data = ", res)
    if (data.length) {
      console.log("in length")
      data.forEach(element => {
        videos.value.push(element)
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

