<template>
  <div class="flex flex-row justify-between p-8">
    <div class="flex flex-col">
      <van-icon v-if="curState.userLike" size="30" :color="startColor" name="good-job" @click="likeVideo(false, true)"/>
      <van-icon v-else size="30" :color="cancelColor" name="good-job" @click="likeVideo(true, true)"/>
      <div class="mt-5 text-center">{{ likeCount }}</div>
    </div>
    <div class="flex flex-col">

      <i v-if="curState.userDisLike" class="icon iconfont icon-dislike text-4xl startColor"
         @click="likeVideo(false, false)"></i>
      <i v-else class="icon iconfont icon-dislike text-4xl cancelColor" @click="likeVideo(true, false)"></i>
      <div class="mt-5">不喜欢</div>
    </div>
    <div class="flex flex-col">
      <van-icon v-if="curState.userCollect" size="30" :color="startColor" name="star" @click="clickCollect(false)"/>
      <van-icon v-else size="30" :color="cancelColor" name="star" @click="clickCollect(true)"/>
      <div class="mt-5 text-center">{{ collectCount }}</div>
    </div>
    <div class="flex flex-col">
      <van-icon v-if="curState.userShared" size="30" :color="startColor" name="share"/>
      <van-icon v-else size="30" :color="cancelColor" name="share" @click="clickShow"/>
      <div class="mt-5 text-center">分享</div>
    </div>
  </div>

  <!--  <van-overlay :show="showShare" @click="showShare = false">-->
  <!--    <div class="flex justify-center items-center h-full">-->
  <!--      <div class="w-28 h-36 bg-gray-300 "></div>-->
  <!--    </div>-->
  <!--  </van-overlay>-->

</template>


<script setup>

import {like} from '@/api/like'
import {collect} from '@/api/collect'
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {Toast} from "vant";

let router = useRouter()

const startColor = "#60A5FA"
const cancelColor = "#9CA3AF"

let props = defineProps({
  states: Object,
  video: Object,
})

const video = props.video

let likeCount = ref(video.like)

let collectCount = ref(video.collect)

let curState = reactive(props.states)

// 点赞 or 取消点赞
const likeVideo = (likeType, likeValue) => { // like type true 添加； false 取消
  like({targetId: props.video.id, targetType: 1, likeType: likeType, like: likeValue}).then((res) => {
    if (likeValue) { // 喜欢
      if (likeType) { // 添加
        likeCount.value = likeCount.value + 1
        curState.userLike = true
        if (curState.userDisLike) {
          curState.userDisLike = false
        }
      } else {
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
      } else {
        curState.userDisLike = false
      }
    }

  }).catch((e) => {
    console.log(e)
  })
}

// 收藏
const clickCollect = (b) => {
  collect({targetId: video.id, collect: b}).then(() => {
    curState.userCollect = !curState.userCollect
    if (b) {
      Toast.success("收藏成功")
      collectCount.value += 1
    } else {
      Toast.success("取消收藏成功")
      collectCount.value -= 1
    }
  }).catch((e) => {

  })
}

// share
const clickShow = () => {
  router.push({
    name: "Share",
    params: {
      name: video.name,
      username: video.user.name,
      cover: video.cover,
      videoId: video.id,
      action: 1,
    }
  })
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