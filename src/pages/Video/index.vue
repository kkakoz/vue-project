<template>
  <div :class="isWebfullscreen">
      <div id="dplayer" class="play-root" ></div>

  </div>

  <van-tabs v-model:active="active">
    <van-tab title="详情">
      <VideoDetail v-if="video && resourceId" :resourceId="resourceId" :video="video" @change-resource="initDp"/>
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
import {ref, defineProps, reactive, onUnmounted, onMounted} from 'vue';
import { getVideo } from '@/api/video';
import DPlayer from 'dplayer';
import CommentList from "./components/CommentList.vue";
import {addHistoryApi, getHistoryApi} from "../../api/history";
import {useStore} from "vuex";


const props = defineProps({
  videoId: Number,
})
let store = useStore()

const videoId = Number(props.videoId)

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

var resourceId = ref(undefined)

const isWebfullscreen = ref("")

// 播放器
let dp = null

const newPlayer =() => {

  let resource = undefined
  let curVideo = video.value


  if (store.getters.user) {
    getHistoryApi({videoId}).then((res) => {
      if (res && res.duration) {
        curVideo.resources.forEach((ele) => {
          if (ele.id === res.resourceId) {
            resource = ele
            resourceId.value = resource.id
          }
        })
      } else {
        if (curVideo.resources.length >= 1) {
          resource = curVideo.resources[0]
          resourceId.value = resource.id
        }
        addHistoryApi({duration: 0, videoId, resourceId: resource.id}).then((res)=> {
          console.log("add history suc")
        }).catch((e)=> {
          console.log("add history fail")
        })
      }
      initDp(resource)
      dp.seek(res.duration)
      dp.notice("从上次播放位置开始播放")
    }).catch((e) => {
      if (curVideo.resources.length >= 1) {
        resource = curVideo.resources[0]
        resourceId.value = resource.id
      }
      addHistoryApi({duration: 0, videoId, resourceId: resource.id}).then((res)=> {
        console.log("add history suc")
      }).catch((e)=> {
        console.log("add history fail")
      })
    })
  } else {
    if (curVideo.resources.length >= 1) {
      resource = curVideo.resources[0]
      resourceId.value = resource.id
    }
    initDp(resource)
  }


}

onMounted(()=> {
  if (store.getters.user) {
    var timer = setInterval(() => {
      if (dp != null && !dp.video.paused) {
        console.log("timer", dp.video.currentTime)
        addHistoryApi({duration: parseInt(dp.video.currentTime), videoId, resourceId: resourceId.value}).then((res)=> {
          console.log("add history suc")
        }).catch((e)=> {
          console.log("add history fail")
        })
      }

    }, 10000);
  }

})


const initDp = (resource) => {

  resourceId.value = resource.id

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
      pic: video.value.cover,
      type: 'auto',
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

  dp.on("seeked", async () => {
    if (store.getters.user) {
      await addHistoryApi({duration: parseInt(dp.video.currentTime), videoId, resourceId: resource.id})
    }
  })

}

const emitAddComment = () => {
  videoComment.value += 1
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

.is-webfullscreen {
  .dplayer {
    .dplayer-video-wrap {
      .dplayer-video-current {
        transform: rotate(90deg);
      }
      .dplayer-controller {
        left: 30px !important;
        top: 350px !important;
        transform: translate(-50%, -50%) rotate(90deg);
        width: 600px !important;
        transition: unset;
      }
      .dplayer-mobile-play {
        transform: rotate(90deg);
      }
      .dplayer-notice {
        transform: rotate(90deg);
      }
    }
  }


}

</style>