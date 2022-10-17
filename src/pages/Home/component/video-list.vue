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
import VideoItem from './video-item.vue'
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
    if (videos.length > 0) {
      console.log("is loading")
      loading.value = true;
      lastId = videos[videos.length - 1].id
      console.log(lastId)
    } else {
      console.log("is finshed")
      loading.value = false;
      finished.value = true;
    }
  })
  // setTimeout(() => {
  //   for (let i = 0; i < 10; i++) {
  //     list.value.push(list.value.length + 1);
  //   }

  //   // 加载状态结束
  //   loading.value = false;

  //   // 数据全部加载完成
  //   if (list.value.length >= 40) {
  //     finished.value = true;
  //   }
  // }, 1000);
};


</script>

