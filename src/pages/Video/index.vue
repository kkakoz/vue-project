<template>
  <div>
    <div id="dplayer" class="play-root" ></div>
  </div>

  <van-tabs v-model:active="active">
    <van-tab title="详情">
      <VideoDetail v-if="video" :videoId="video.id" :video="video" @change-resource="initDp"/>
    </van-tab>


    <van-tab v-if="video" :title="`评论 ${videoComment}`">
      <CommentList v-if="video" :videoId="video.id" @add-comment="emitAddComment"></CommentList>
    </van-tab>
    <van-tab v-else :title="`评论`">
      <CommentList v-if="video" :videoId="video.id"></CommentList>
    </van-tab>
<!--    <van-tab disabled>-->
<!--      <template #title>-->
<!--        <span class="danmu">-->

<!--          <van-button round size="small" @click="sendDanmuClick">发送弹幕</van-button>-->
<!--          <i class="icon iconfont icon-danmu"></i>-->
<!--        </span>-->
<!--      </template>-->
<!--    </van-tab>-->

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
import VideoDetail from './components/VideoDetail.vue'
import { ref, defineProps, reactive } from 'vue';
import { getVideo } from '@/api/video';
import DPlayer from 'dplayer';
import CommentList from "./components/CommentList.vue";
import {addHistoryApi} from "../../api/history";

const props = defineProps({
  videoId: Number,
  resourceId: Number,
})

const videoId = Number(props.videoId)

const resourceId = Number(props.videoId)

const video = ref(undefined)

const videoComment = ref(0)

getVideo({videoId}).then(res => {
  console.log("video res = ",res)
  video.value = res
  videoComment.value = res.comment
  newPlayer()
})

const active = ref(0);


// 弹幕相关
const sendDanmu = ref(false)

const sendDanmuClick = () => {
  sendDanmu.value = true
}

const danmuMsg = ref("")

// 播放器
let dp = null

const newPlayer =() => {
  let resource = undefined
  let curVideo = video.value
  console.log("video = ", video)
  if (curVideo.resources.length === 1) {
    resource = curVideo.resources[0]
  }
  if (curVideo.resources.length > 1) {
    if (resourceId) {
      curVideo.resources.forEach((ele) => {
        if (ele.id === resourceId) {
          resource = ele
        }
      })
    }
    resource = curVideo.resources[0]
  }
  console.log("resource = ", resource)

  initDp(resource)
}

const initDp = (resource) => {
  dp = new DPlayer({
    // 配置参数
    container: document.getElementById('dplayer'),
    // autoplay: false,
    // theme: '#FADFA3',
    // loop: true,
    // lang: 'zh-cn',
    // preload: 'auto',
    // // logo: 'logo.png',
    // volume: 0.7,
    video: {
      url: "http://kkako-blog-bucket.oss-cn-beijing.aliyuncs.com/2-8%20%E7%AB%A0%E8%8A%82%E6%80%BB%E7%BB%93%5B%E5%A4%A9%E4%B8%8B%E6%97%A0%E9%B1%BC%5D%5Bshikey.com%5D.mp4",
      // url: resource.url,
      // pic: video.value.cover,
      // type: 'auto',
    }
  });


// 禁止右键下载视频
  document.oncontextmenu=new Function("event.returnValue=false;");
  document.onselectstart=new Function("event.returnValue=false;");

// 修改循环播放显示
  document.getElementsByClassName('dplayer-setting-item dplayer-setting-loop')[0].getElementsByClassName('dplayer-label')[0].innerText = "循环播放"
// 修改倍速播放显示
  document.getElementsByClassName('dplayer-setting-item dplayer-setting-speed')[0].getElementsByClassName('dplayer-label')[0].innerText = "播放倍速"
  console.log("dp = ", dp)
  // dp.danmaku.send(
  //     {
  //       text: 'dplayer is amazing',
  //       color: '#b7daff',
  //       type: 'right', // should be `top` `bottom` or `right`
  //     },
  //     function () {
  //       console.log('success');
  //     }
  // );
  addHistoryApi({duration: 0, videoId, resourceId: resource.id}).then((res)=> {
    console.log("add history suc")
  }).catch((e)=> {
    console.log("add history fail")
  })
}

const emitAddComment = () => {
  videoComment.value += 1
}

const onPlay = ()=> {
  dp.play()
}


</script>


<style scoped lang="scss">

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

.play-root {
  width: 100vw;
  /*height: 420px;*/
  background-color: coral;
  margin: 0 auto;
}
</style>