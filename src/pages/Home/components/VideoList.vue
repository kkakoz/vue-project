<style lang="scss" scoped>
.max-hight {
  height:calc(100vh - 50px);
}

</style>


<template>
  <div class="max-hight ">
  <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      immediate-check="false"

  >
    <div class="grid grid-cols-2 bg-gray-100">
      <VideoItem v-for="item in videoList" :video="item"></VideoItem>
    </div>
<!--    <van-grid :border="false" :column-num="2">-->

<!--      <van-grid-item v-for="item in videoList.list">-->
<!--         <VideoItem  :video="item"></VideoItem>-->
<!--      </van-grid-item>-->
<!--    </van-grid>-->
  </van-list>
  </div>
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
const videoList = ref([])

const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  getVideos({categoryId: props.categoryId, lastId}).then(res => {
    var videos = res.data
    if (videos.length) {
      videos.forEach(element => {
        videoList.value.push(element)
      });
      lastId = videos[videos.length - 1].id
    } else {
      finished.value = true;
    }
    loading.value = false;
  })
  // console.log("videos = ", videoList.value)
};


</script>

