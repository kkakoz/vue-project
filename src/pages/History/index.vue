<template>
  <van-nav-bar title="历史记录" fixed="true"  placeholder/>

  <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="history in histories" :key="item" :title="item">
      <VideoItem  :history="history"/>
    </van-cell>
  </van-list>

</template>


<script setup>
import VideoItem from "./components/VideoItem.vue";
import {ref} from "vue";
import {getHistoriesApi} from "../../api/history";

let lastId = 0
let finished = ref(false)
let loading = ref(false)
const histories = ref([])

// 列表加载
const onLoad = () => {
  getHistoriesApi({lastId}).then(res => {
    let data = res.data
    console.log("data = ", res)
    if (data.length) {
      console.log("in length")
      data.forEach(element => {
        histories.value.push(element)
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

