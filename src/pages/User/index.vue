<template>
  <div v-if="user" class="flex flex-row pl-6 pr-6 pt-6 justify-between">

    <van-image round :src="user.avatar" fit="contain" width="20vw" height="20vw"/>
    <div class="flex flex-col">
      <div class="flex flex-row mb-2">
        <div class="flex-col text-center w-24">
          <div>{{ user.fans_count }}</div>
          <div class="text-gray-400">粉丝</div>
        </div>
        <span class="align-middle w-0.5 bg-gray-300 h-6 inline-block mt-2"></span>
        <div class="flex-col text-center w-24">
          <div>{{ user.follow_count }}</div>
          <div class="text-gray-400">关注</div>
        </div>
        <span class="align-middle w-0.5 bg-gray-300 h-6 inline-block mt-2"></span>
        <div class="flex-col text-center w-24">
          <div>{{ user.like_count }}</div>
          <div class="text-gray-400">获赞</div>
        </div>
      </div>
      <van-button round  :color="$store.state.baseColor">关注</van-button>

<!--      <div class="text-center pt-4 bg-blue-400 w-full" ></div>-->
    </div>
  </div>
  <div v-if="user" class="text-2xl text-center pt-2 flex pl-6">
    {{ user.name }}
  </div>
  <div v-if="user" class="text-2xl text-center pt-2 flex pl-6">
    {{ user.brief }}
  </div>

  <van-tabs  v-model:active="active">
  <van-tab title="动态">

  </van-tab>
    <van-tab title="投稿">

    </van-tab>
  </van-tabs>


</template>


<script setup>

import {ref} from "vue";
import {getUser} from "@/api/user";


let props = defineProps({
  userId: Number
})

const userId = Number(props.userId)

console.log("user id = ", userId)

const user = ref(null)
console.log("userId = ", userId, typeof userId)

getUser({userId: userId}).then((res)=> {
  user.value = res
})




</script>

<style>


</style>