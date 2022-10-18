<!--<template>-->
<!--  &lt;!&ndash; <vue3VideoPlay-->
<!--      v-bind="options"-->
<!--      :src="videoUrl"-->
<!--      poster="https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg"-->
<!--      @error="err"-->
<!--  />&ndash;&gt;-->
<!--  <div id="app">-->
<!--    <div id="my-player" class="abp" style="width:100%; background:#000;">-->
<!--      <div id="my-comment-stage" class="container"></div>-->
<!--      <div id="mui-player"></div>-->
<!--    </div>-->
<!--  </div>-->
<!--&lt;!&ndash;  <van-button square type="primary" @click="start">start</van-button>&ndash;&gt;-->
<!--&lt;!&ndash;  <van-button square type="primary" @click="load">load</van-button>&ndash;&gt;-->
<!--&lt;!&ndash;  <van-button square type="primary" @click="insert">insert</van-button>&ndash;&gt;-->
<!--</template>-->
<!--<script setup>-->
<!--import { reactive, onUpdated, onMounted, defineProps } from "vue";-->
<!--import MuiPlayer from 'mui-player'-->
<!--// import {CommentManager} from 'comment-core-library/dist/CommentCoreLibrary'-->

<!--let props = defineProps({-->
<!--  videoUrl: String,-->
<!--  showDanmu: Boolean,-->
<!--})-->

<!--var CM-->

<!--let iVal-->

<!--let start = () => {-->
<!--  var startTime = Date.now(); // 设定起始时间-->
<!--  if (iVal >= 0) {-->
<!--    clearInterval(iVal); // 如果之前就有定时器，把它停掉-->
<!--  }-->
<!--  //建立新的定时器-->
<!--  var iVal = setInterval(function () {-->
<!--    var playTime = Date.now() - startTime; // 用起始时间和现在时间的差模拟播放-->
<!--    CM.time(playTime); // 通报播放时间-->
<!--    // $('txPlayPos').textContent = playTime; // 显示播放时间-->
<!--    console.log("now", playTime)-->
<!--  }, 100); // 模拟播放器每 100ms 通报播放时间-->
<!--}-->

<!--let load = () => {-->
<!--  var danmakuTimeline = [-->
<!--    {-->
<!--      "mode": 1,-->
<!--      "text": "Hello World",-->
<!--      "stime": 0,-->
<!--      "size": 25,-->
<!--      "color": 0xffffff-->
<!--    }-->
<!--  ];-->
<!--  CM.load(danmakuTimeline);-->
<!--}-->
<!--let insert = () => {-->
<!--  var danmaku = {-->
<!--    "mode": 1,-->
<!--    "text": "Hello CommentCoreLibrary",-->
<!--    "stime": 1000,-->
<!--    "size": 30,-->
<!--    "color": 0xff0000-->
<!--  };-->
<!--  CM.insert(danmaku);-->
<!--}-->

<!--onMounted(() => {-->

<!--  CM = new CommentManager(document.getElementById('my-comment-stage'));-->
<!--  CM.init(); // 初始化-->
<!--  CM.start()-->

<!--  console.log('Component is mounted!')-->
<!--  const mp = new MuiPlayer({-->
<!--    container: '#mui-player',-->
<!--    title: '标题',-->
<!--    src: ""-->
<!--    // src: props.videoUrl-->
<!--  })-->

<!--  mp.on("duration-change", (event) => {-->
<!--    console.log(event)-->
<!--  })-->

<!--  mp.on("error", (event) => {-->
<!--    console.log(event)-->
<!--  })-->
<!--})-->

<!--</script>-->

<!--<style scoped>-->

<!--</style>-->

<template>
  <div>
    <div id="dplayer" class="play-root" ></div>
  </div>

</template>

<script setup>
// import '../../node_modules/dplayer/dist/DPlayer.min.js';
import DPlayer from 'dplayer';
import {onMounted} from "vue";

let props = defineProps({
  video: Object,
  resourceId: Number
})

let video = props.video

let resource = undefined

if (video.resources.length === 1) {
  resource = video.resources[0]
}
if (video.resources.length > 1) {
  if (props.resourceId) {
    props.video.resources.forEach((ele) => {
      if (ele.id === props.ResourceId) {
        resource = ele
      }
    })
  }
  resource = video.resources[0]
}


let dp = null

onMounted(() => {
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
      pic: video.cover,
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
})



const onPlay = ()=> {
  dp.play()
}

</script>

<style scoped>
.play-root {
  width: 100vw;
  /*height: 420px;*/
  background-color: coral;
  margin: 0 auto;
}

/* 在浏览器找到对应的class名称。然后通过穿透对样式进行更改 */

/* 禁止循环播放显示 */
/* .paly-root >>> .dplayer-setting-loop {
  background-color: cyan;
  display: none;
} */

/* 禁止出现快进多少秒提示 */
/* .play-root /deep/ .dplayer-notice {
  display: none;
} */

/* 禁止右键自定义列表 */
/* .play-root /deep/ .dplayer-menu-show{
   display: none;
} */

</style>
