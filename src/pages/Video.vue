<template>
  <h1>Video</h1>
  <!-- <Video></Video> -->
  <van-tabs v-model:active="active">
    <van-tab title="详情">
      <VideoDetail></VideoDetail>
    </van-tab>
    <van-tab title="评论">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="comment in comments" :key="item" :title="item">
          <Comment :comment="comment" @sub-comments="subComments" />
          <van-divider />
        </van-cell>
      </van-list>
      <van-action-sheet v-model:show="moreComment">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell v-for="comment in comments" :key="item" :title="item">
            <SubComment :comment="comment" @sub-comments="subComments" />
            <van-divider />
          </van-cell>
        </van-list>
      </van-action-sheet>
    </van-tab>
  </van-tabs>
</template>

<script setup>
import Video from '../components/Video.vue'
import VideoDetail from '../components/VideoDetail.vue'
import Comment from '../components/Comment.vue'

import { ref } from 'vue';
import SubComment from '../components/SubComment.vue';

const active = ref(1);

const comments = [
  {
    id: 1,
    username: "张三",
    avatar: "https://p9-passport.byteacctimg.com/img/user-avatar/8b472f29b528ad097a78d288ef895900~300x300.image",
    subComments: [
      { id: "1", name: "李四", content: "123456", targetId: 2, targetName: "王五" },
      { id: "2", name: "李四", content: "123456", targetId: 0, targetName: "" }],
    content: "我觉得不行我觉得不行我觉得不行我觉得不行我觉得不行我觉得不行我觉得不行"
  },
  {
    id: 1,
    username: "张三",
    avatar: "https://p9-passport.byteacctimg.com/img/user-avatar/8b472f29b528ad097a78d288ef895900~300x300.image",
    subComments: [
      { id: "1", name: "李四", content: "123456", targetId: 2, targetName: "王五" },
      { id: "2", name: "李四", content: "123456", targetId: 0, targetName: "" }],
    content: "我觉得不行我觉得不行我觉得不行我觉得不行我觉得不行我觉得不行我觉得不行"
  },
  {
    id: 1,
    username: "张三",
    avatar: "https://p9-passport.byteacctimg.com/img/user-avatar/8b472f29b528ad097a78d288ef895900~300x300.image",
    subComments: [
      { id: "1", name: "李四", content: "123456", targetId: 2, targetName: "王五" },
      { id: "2", name: "李四", content: "123456", targetId: 0, targetName: "" }],
    content: "我觉得不行我觉得不行我觉得不行我觉得不行我觉得不行我觉得不行我觉得不行"
  },
  {
    id: 1,
    username: "张三",
    avatar: "https://p9-passport.byteacctimg.com/img/user-avatar/8b472f29b528ad097a78d288ef895900~300x300.image",
    subComments: [
      { id: "1", name: "李四", content: "123456", targetId: 2, targetName: "王五" },
      { id: "2", name: "李四", content: "123456", targetId: 0, targetName: "" }],
    content: "我觉得不行我觉得不行我觉得不行我觉得不行我觉得不行我觉得不行我觉得不行"
  },
  {
    id: 1,
    username: "张三",
    avatar: "https://p9-passport.byteacctimg.com/img/user-avatar/8b472f29b528ad097a78d288ef895900~300x300.image",
    subComments: [
      { id: "1", name: "李四", content: "123456", targetId: 2, targetName: "王五" },
      { id: "2", name: "李四", content: "123456", targetId: 0, targetName: "" }],
    content: "我觉得不行我觉得不行我觉得不行我觉得不行我觉得不行我觉得不行我觉得不行"
  },
  {
    id: 1,
    username: "张三",
    avatar: "https://p9-passport.byteacctimg.com/img/user-avatar/8b472f29b528ad097a78d288ef895900~300x300.image",
    subComments: [
      { id: "1", name: "李四", content: "123456", targetId: 2, targetName: "王五" },
      { id: "2", name: "李四", content: "123456", targetId: 0, targetName: "" }],
    content: "我觉得不行我觉得不行我觉得不行我觉得不行我觉得不行我觉得不行我觉得不行"
  }
]

const moreComment = ref(false)

function subComments(id) {
  moreComment.value = true
}

</script>


<style scoped>
</style>