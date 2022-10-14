<template>
  <div class="flex flex-row justify-between p-8">

<!--    <VideoIcon name="点赞" iconName="good-job" :state="states.user_like"/>-->
<!--    <VideoIcon name="收藏" iconName="star" :state="states.user_collection"/>-->
<!--    <VideoIcon name="喜欢" iconName="like" state="states.user_collection"/>-->
<!--    <VideoIcon name="分享" iconName="share" :state="states.user_shared"/>-->
<!--    <VideoIcon name="点赞" iconName="good-job" :state="states.user_like"/>-->
    <div class="flex flex-col">
      <van-icon size="30" color="#60A5FA" name="good-job" />
      <div class="h-5"></div>
      <div>点赞</div>
    </div>
    <div class="flex flex-col">
      <van-icon size="30" color="#9CA3AF" name="star"/>
      <div class="h-5"></div>
      <div>收藏</div>
    </div>
    <div class="flex flex-col">
      <van-icon size="30" color="#9CA3AF" name="like"/>
      <div class="h-5"></div>
      <div>喜欢</div>
    </div>
    <div class="flex flex-col">
      <van-icon size="30" color="#9CA3AF" name="share"/>
      <div class="h-5"></div>
      <div>分享</div>
    </div>
  </div>
</template>



<script setup>

let props = defineProps({
  states: Object,
})
</script>
