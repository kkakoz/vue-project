<template>
  <div class="flex flex-col rounded-xl shadow-md p-4 bg-white">
    <!--  头部-->
    <div class="flex flex-row justify-between" @click.stop="toUser(newsfeed.userId)">
      <div class="flex flex-row">
        <van-image :src="newsfeed.user.avatar" round fit="container" width="10vw" height="10vw"/>
        <div class="flex flex-col ml-2 justify-between">
          <div>{{ newsfeed.user.name }}</div>
          <div class="text-gray-500 text-xs" v-if="newsfeed.action === 1">分享了视频</div>
          <div class="text-gray-500 text-xs" v-if="newsfeed.action === 2">发表新的动态</div>
          <div class="text-gray-500 text-xs" v-if="newsfeed.action === 3">投稿新的视频</div>
        </div>
      </div>
      <div>
        <van-icon name="ellipsis"/>
      </div>
    </div>
    <div class="flex flex-col mt-4">
      <div>{{ newsfeed.content }}</div>
    </div>
    <div v-if="newsfeed.targetType === 1">
      <div class="rounded-xl shadow-md p-4" @click.stop="toVideo(newsfeed.targetId)">
        <van-image :src="newsfeed.target.cover" fit="conver"></van-image>
        <div>{{newsfeed.target.name}}</div>
      </div>

    </div>
  </div>
</template>

<script setup>

let props = defineProps({
  newsfeed: Object,
})

</script>