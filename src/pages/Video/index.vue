<template>
  <div>
    <div id="dplayer" class="play-root" ></div>
  </div>

  <!--  <Video  :video="video" ></Video>-->
  <van-tabs v-model:active="active">
    <van-tab title="详情">
      <VideoDetail v-if="video" :videoId="video.id" :video="video"/>
    </van-tab>

    <van-tab title="评论">
      <CommentList v-if="video" :videoId="video.id"></CommentList>
<!--      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">-->
<!--        <van-cell v-for="comment in comments" :key="item" :title="item">-->
<!--          <Comment :comment="comment"/>-->
<!--        </van-cell>-->
<!--      </van-list>-->
<!--      <div class="reply-bottom">-->
<!--        <div class="flex flex-row min-w-full">-->
<!--          <van-field-->
<!--              v-model="commentMsg"-->
<!--              rows="1"-->
<!--              autosize-->
<!--              type="textarea"-->
<!--              placeholder="请输入评论"-->
<!--          />-->

<!--          <div class="p-3">-->
<!--            <i class="icon iconfont icon-fabu text-2xl" @click="sendVideoComment(video.id)"></i>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
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
import VideoDetail from './components/VideoDetail.vue'
import { ref, defineProps, reactive } from 'vue';
import { getVideo } from '@/api/video';
import DPlayer from 'dplayer';
import {onMounted} from "vue";
import CommentList from "./components/CommentList.vue";


const props = defineProps({
  videoId: Number,
  ResourceId: Number,
})

const video = ref(undefined)

getVideo({videoId: props.videoId}).then(res => {
  console.log("video res = ",res)
  video.value = res
  newPlayer()
})

const active = ref(0);

const sendDanmu = ref(false)

const sendDanmuClick = () => {
  sendDanmu.value = true
}

const sendDanmuFunc = () => {

}

const danmuMsg = ref("")

let dp = null

const newPlayer =() => {
  let resource = undefined
  let curVideo = video.value
  if (curVideo.resources.length === 1) {
    resource = curVideo.resources[0]
  }
  if (curVideo.resources.length > 1) {
    if (props.resourceId) {
      props.video.resources.forEach((ele) => {
        if (ele.id === props.ResourceId) {
          resource = ele
        }
      })
    }
    resource = curVideo.resources[0]
  }

  dp = new DPlayer({
    // 配置参数
    container: document.getElementById('dplayer'),
    autoplay: false,
    theme: '#FADFA3',
    loop: true,
    lang: 'zh-cn',
    preload: 'auto',
    // logo: 'logo.png',
    volume: 0.7,
    video: {
      url: resource.url,
      pic: curVideo.cover,
      type: 'auto',
    },
    danmaku: {

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
  dp.danmaku.send(
      {
        text: 'dplayer is amazing',
        color: '#b7daff',
        type: 'right', // should be `top` `bottom` or `right`
      },
      function () {
        console.log('success');
      }
  );
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