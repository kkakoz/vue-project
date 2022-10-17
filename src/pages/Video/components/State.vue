<template>
  <div class="flex flex-row justify-between p-8">

<!--    <VideoIcon name="点赞" iconName="good-job" :state="states.user_like"/>-->
<!--    <VideoIcon name="收藏" iconName="star" :state="states.user_collection"/>-->
<!--    <VideoIcon name="喜欢" iconName="like" state="states.user_collection"/>-->
<!--    <VideoIcon name="分享" iconName="share" :state="states.user_shared"/>-->
<!--    <VideoIcon name="点赞" iconName="good-job" :state="states.user_like"/>-->
    <div class="flex flex-col">
      <van-icon v-if="curState.userLike" size="30" :color="startColor" name="good-job" @click="likeVideo(false, true)"/>
      <van-icon v-else size="30" :color="cancelColor" name="good-job" @click="likeVideo(true, true)"/>
      <div class="mt-5">点赞</div>
    </div>
    <div class="flex flex-col">

      <i class="icon iconfont icon-dislike text-4xl" @click="like(comment.id)"></i>
    </div>
    <div class="flex flex-col">
      <van-icon size="30" color="#9CA3AF" name="star"/>
      <div class="mt-5">收藏</div>
    </div>
    <div class="flex flex-col">
      <van-icon size="30" color="#9CA3AF" name="like"/>
      <div class="mt-5">喜欢</div>
    </div>
    <div class="flex flex-col">
      <van-icon size="30" color="#9CA3AF" name="share"/>
      <div class="mt-5">分享</div>
    </div>
  </div>
</template>



<script setup>

import {like} from '@/api/like'
import {reactive, ref} from "vue";

const startColor = "#60A5FA"
const cancelColor = "#9CA3AF"


let props = defineProps({
  states: Object,
  videoId: String,
})

let curState = reactive(props.states)

let likeVideo = (likeType, likeValue)=> { // like type true 添加； false 取消
  like({targetId: props.videoId, targetType: 1, likeType: likeType, like: likeValue}).then((res)=> {
    console.log(res)
  }).catch((e) => {
    console.log(e)
  })
}

</script>
