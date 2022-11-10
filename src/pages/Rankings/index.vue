<template>
  <div class="text-center text-3xl">
    排行榜
  </div>

  <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="video in rankings" :key="item" :title="item">
      <VideoItem :video="video"/>
    </van-cell>
  </van-list>

  <Tabbar/>

</template>
<script setup>
import Tabbar from "../../components/Tabbar.vue";
import {ref} from "vue";
import {getRankingsApi} from "../../api/video";
import VideoItem from "../../components/VideoItem.vue";

let lastId = 0
let finished = ref(false)
let loading = ref(false)
const rankings = ref([])

// 列表加载
const onLoad = () => {
  getRankingsApi({lastId}).then(res => {
    let data = res.data
    if (data.length) {
      data.forEach(element => {
        rankings.value.push(element)
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