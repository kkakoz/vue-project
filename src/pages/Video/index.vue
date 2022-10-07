<template>
  <Video></Video>
  <van-tabs v-model:active="active">
    <van-tab title="详情">
    
      <VideoDetail :videoId="videoId" :video="video"></VideoDetail>
    </van-tab>
    <van-tab title="评论">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="comment in comments" :key="item" :title="item">
          <Comment :comment="comment" @sub-comments="subComments" />
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
          </van-cell>
        </van-list>
      </van-action-sheet>
      <div class="reply-bottom">
        <van-field
          class="post-field"
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          show-word-limit
        />
        <i class="icon iconfont icon-fabu" @click="like(comment.id)"></i>
      </div>
      <!-- <van-field 
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          placeholder="请输入留言"
        />
      <van-button class="post-btn">发布</van-button>-->

       <van-popup v-model:show="show">
        <van-field
          class="post-field"
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="500"
          placeholder="请输入留言"
          show-word-limit
        />
      <van-button class="post-btn">发布</van-button>
       </van-popup>
    </van-tab>
    <van-tab disabled>
      <template #title>
        <span class="danmu">
          <van-button round size="small">发送弹幕</van-button>
          <i class="icon iconfont icon-danmu"></i>
        </span>
      </template>
    </van-tab>
  </van-tabs>
</template>

<script setup>
import Video from '@/components/Video.vue'
import VideoDetail from './components/VideoDetail.vue'
import Comment from './components/Comment.vue'

import { ref, defineProps, reactive } from 'vue';
import SubComment from './components/SubComment.vue';
import { getVideo } from '@/api/video';


const video = ref({})

getVideo({videoId: props.videoId}).then(res => {
  video.value = res
})
const props = defineProps({
  videoId: Number
})

const active = ref(0);

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
    subComments: [],
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

]

const moreComment = ref(false)

function subComments(id) {
  moreComment.value = true
}

</script>


<style scoped lang="scss">
.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  // height: 3rem;
  max-height: 10rem;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}

.icon-danmu {
  font-size: 2.3rem;
  margin-top: .4rem;
  margin-left: .3rem;
}

.danmu {
  margin: 2.2rem 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>