<template>
    <h1>Video</h1>
    <!-- <Video></Video> -->
    <van-tabs v-model:active="active">
  <van-tab title="详情"><VideoDetail></VideoDetail></van-tab>
  <van-tab title="评论"><Common></Common></van-tab>
</van-tabs>
</template>
<script setup>
import Video from '../components/Video.vue'
import VideoDetail from '../components/VideoDetail.vue'
import Common from '../components/Common.vue'

import { ref } from 'vue';

const active = ref(0);

</script>

<style scoped></style>