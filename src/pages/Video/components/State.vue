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
      <div class="mt-5 text-center">{{ likeCount }}</div>
    </div>
    <div class="flex flex-col">

      <i v-if="curState.userDisLike" class="icon iconfont icon-dislike text-4xl startColor" @click="likeVideo(false, false)"></i>
      <i v-else class="icon iconfont icon-dislike text-4xl cancelColor" @click="likeVideo(true, false)"></i>
      <div class="mt-5">不喜欢</div>
    </div>
    <div class="flex flex-col">
      <van-icon size="30" color="#9CA3AF" name="star"/>
      <div class="mt-5 text-center">{{ collectCount }}</div>
    </div>
    <div class="flex flex-col">
      <van-icon size="30" color="#9CA3AF" name="share"/>
      <div class="mt-5 text-center">分享</div>
    </div>
  </div>
</template>


<script setup>

import {like} from '@/api/like'
import {collect} from '@/api/collect'
import {reactive, ref, toRefs} from "vue";

const startColor = "#60A5FA"
const cancelColor = "#9CA3AF"

let props = defineProps({
  states: Object,
  video: Object,
})

let likeCount = ref(props.video.like)

let collectCount = ref(props.video.collect)

let curState = reactive(props.states)

const likeVideo = (likeType, likeValue) => { // like type true 添加； false 取消
  like({targetId: props.video.id, targetType: 1, likeType: likeType, like: likeValue}).then((res) => {
    if (likeValue) { // 喜欢
      if (likeType) { // 添加
        likeCount.value = likeCount.value + 1
        curState.userLike = true
        if (curState.userDisLike) {
          curState.userDisLike = false
        }
      } else{
        likeCount.value = likeCount.value - 1
        curState.userLike = false
      }
    } else { // 不喜欢
      if (likeType) { // 添加
        curState.userDisLike = true
        if (curState.userLike) {
          curState.userLike = false
          likeCount.value = likeCount.value - 1
        }
      } else{
        curState.userDisLike = false
      }
    }

  }).catch((e) => {
    console.log(e)
  })
}

const collectVideo = () => {
  collect({videoId: props.video.id, })
}

</script>

<style>
.cancelColor {
  color: #9CA3AF;
  font-size: 9vw;
}

.startColor {
  color: #60A5FA;
  font-size: 9vw;
}
</style>