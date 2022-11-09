<style lang="scss" scoped>

</style>


<template>
  <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      immediate-check="false"
  >
    <van-grid :border="false" :column-num="2">

      <van-grid-item v-for="item in videoList.list">
        <VideoItem  :video="item"></VideoItem>
      </van-grid-item>
    </van-grid>
  </van-list>
</template>

<script setup>
import VideoItem from './VideoItem.vue'
import {ref, reactive, defineProps} from 'vue';
import {getVideos} from '@/api/video';

const props = defineProps({
  categoryId: Number
})

let lastId = 0
let finished = ref(false)
let loading = ref(false)
const videoList = reactive({list: []})



const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  getVideos({categoryId: props.categoryId, lastValue: lastId}).then(res => {
    var videos = res.data
    videos.forEach(element => {
      videoList.list.push(element)
    });
    loading.value = false;
    if (videos.length > 0) {
      lastId = videos[videos.length - 1].id
    } else {
      finished.value = true;
    }
  })
};


</script>

