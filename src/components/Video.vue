<template>
  <!-- <vue3VideoPlay
      v-bind="options"
      :src="videoUrl"
      poster="https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg"
      @error="err"
  />-->
  <div id="app">
    <div id="my-player" class="abp" style="width:100%; background:#000;">
      <div id="my-comment-stage" class="container"></div>
      <div id="mui-player"></div>
    </div>
  </div>
<!--  <van-button square type="primary" @click="start">start</van-button>-->
<!--  <van-button square type="primary" @click="load">load</van-button>-->
<!--  <van-button square type="primary" @click="insert">insert</van-button>-->
</template>
<script setup>
import { reactive, onUpdated, onMounted, defineProps } from "vue";
import MuiPlayer from 'mui-player'
// import {CommentManager} from 'comment-core-library/dist/CommentCoreLibrary'

let props = defineProps({
  videoUrl: String,
  showDanmu: Boolean,
})

var CM

let iVal

let start = () => {
  var startTime = Date.now(); // 设定起始时间
  if (iVal >= 0) {
    clearInterval(iVal); // 如果之前就有定时器，把它停掉
  }
  //建立新的定时器
  var iVal = setInterval(function () {
    var playTime = Date.now() - startTime; // 用起始时间和现在时间的差模拟播放
    CM.time(playTime); // 通报播放时间
    // $('txPlayPos').textContent = playTime; // 显示播放时间
    console.log("now", playTime)
  }, 100); // 模拟播放器每 100ms 通报播放时间
}

let load = () => {
  var danmakuTimeline = [
    {
      "mode": 1,
      "text": "Hello World",
      "stime": 0,
      "size": 25,
      "color": 0xffffff
    }
  ];
  CM.load(danmakuTimeline);
}
let insert = () => {
  var danmaku = {
    "mode": 1,
    "text": "Hello CommentCoreLibrary",
    "stime": 1000,
    "size": 30,
    "color": 0xff0000
  };
  CM.insert(danmaku);
}

onMounted(() => {

  CM = new CommentManager(document.getElementById('my-comment-stage'));
  CM.init(); // 初始化
  CM.start()

  console.log('Component is mounted!')
  const mp = new MuiPlayer({
    container: '#mui-player',
    title: '标题',
    src: ""
    // src: props.videoUrl
  })

  mp.on("duration-change", (event) => {
    console.log(event)
  })

  mp.on("error", (event) => {
    console.log(event)
  })
})

</script>

<style scoped>

</style>