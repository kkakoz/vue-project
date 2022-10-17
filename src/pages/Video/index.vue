<template>
  <Video ></Video>
  <van-tabs v-model:active="active">
    <van-tab title="详情">
      <VideoDetail v-if="video" :videoId="videoId" :video="video"/>
    </van-tab>
    <van-tab title="评论">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="comment in comments" :key="item" :title="item">
          <Comment :comment="comment"/>
        </van-cell>
      </van-list>
<!--      <van-action-sheet v-model:show="moreComment">-->
<!--        <van-list-->
<!--          v-model:loading="loading"-->
<!--          :finished="finished"-->
<!--          finished-text="没有更多了"-->
<!--          @load="onLoad"-->
<!--        >-->
<!--          <van-cell v-for="comment in comments" :key="item" :title="item">-->
<!--            <SubComment :comment="comment" @sub-comments="subComments" />-->
<!--          </van-cell>-->
<!--        </van-list>-->
<!--      </van-action-sheet>-->
      <div class="reply-bottom">
        <div class="flex flex-row">
          <van-field
              v-model="commentMsg"
              rows="1"
              autosize
              type="textarea"
              placeholder="请输入评论"
          />

          <div class="p-3">
            <i class="icon iconfont icon-fabu text-2xl" @click="like(comment.id)"></i>
          </div>
        </div>
      </div>
<!--       <van-popup >-->
<!--         <div class="flex flex-row">-->
<!--           <van-field-->
<!--               v-model="commentMsg"-->
<!--               rows="1"-->
<!--               autosize-->
<!--               type="textarea"-->
<!--               placeholder="请输入评论"-->
<!--           />-->

<!--           <div class="p-3">-->
<!--             <i class="icon iconfont icon-fabu text-2xl" @click="like(comment.id)"></i>-->
<!--           </div>-->
<!--         </div>-->
<!--       </van-popup>-->
    </van-tab>
    <van-tab disabled>
      <template #title>
        <span class="danmu">

          <van-button round size="small" @click="sendDanmuClick">发送弹幕</van-button>
          <i class="icon iconfont icon-danmu"></i>
        </span>
      </template>
    </van-tab>

    <van-popup
        v-model:show="sendDanmu"
        position="bottom"
    >
      <div class="flex flex-row">
      <van-field
          v-model="danmuMsg"
          rows="1"
          autosize
          type="textarea"
          placeholder="请输入弹幕"
      />

        <div class="p-3">
        <i class="icon iconfont icon-fabu text-2xl" @click="like(comment.id)"></i>
        </div>
      </div>
    </van-popup>
  </van-tabs>
</template>

<script setup>
import Video from '@/components/Video.vue'
import VideoDetail from './components/VideoDetail.vue'
import Comment from './components/Comment.vue'
import { ref, defineProps, reactive } from 'vue';
import SubComment from './components/SubComment.vue';
import { getVideo } from '@/api/video';


const props = defineProps({
  videoId: Number
})

let video = ref(undefined)

getVideo({video_id: props.videoId}).then(res => {
  console.log("video res = ",res)
  video.value = res
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
]

var commentMsg = ref("")


const sendDanmu = ref(false)

const sendDanmuClick = () => {
  sendDanmu.value = true
}

const sendDanmuFunc = () => {

}

const danmuMsg = ref("")

</script>


<style scoped lang="scss">
.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
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