<template>
  <van-nav-bar title="排行榜" fixed="true"  placeholder/>

  <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell>
      <div class="flex flex-row justify-between">
        <div>时间筛选</div>
        <div>热度</div>
      </div>
    </van-cell>
    <van-cell v-for="(video, index) in rankings" :key="item" :title="item">

      <div class="flex flex-row justify-between">
<!--      <VideoItem :video="video"/>-->
        <div class="flex flex-row">
          <div >{{index+1}}</div>

          <div class="text-1xl text-center flex pl-6 text-gray-400 pl-2">{{video.name}}</div>
        </div>
        <div class="">{{video.hot}}</div>
      </div>
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