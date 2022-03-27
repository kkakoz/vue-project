<template>
    <!-- <vue3VideoPlay
        v-bind="options"
        :src="videoUrl"
        poster="https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg"
        @error="err"
    />-->

    <div id="mui-player"></div>
</template>
<script setup>
import { reactive, onUpdated, } from "vue";
import { defineProps } from 'vue';
import MuiPlayer from 'mui-player'
let props = defineProps({
    videoUrl: String
})

function err (e) {
    console.log("err=", e)
}


onUpdated(() => {
    console.log('Component is mounted!')
    const mp = new MuiPlayer({
        container: '#mui-player',
        title: '标题',
        src: props.videoUrl
    })
})

// const options = reactive({
//     width: "100%",
//     height: "220px", //播放器高度
//     color: "#409eff", //主题色
//     title: "", //视频名称
//     // src: props.videoUrl, //视频源
//     muted: false, //静音
//     webFullScreen: false,
//     speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
//     autoPlay: false, //自动播放
//     loop: false, //循环播放
//     mirror: false, //镜像画面
//     ligthOff: false, //关灯模式
//     volume: 0.3, //默认音量大小
//     control: false, //是否显示控制
//     controlBtns: [
//         "audioTrack",
//         "quality",
//         "speedRate",
//         "volume",
//         "setting",
//         "pip",
//         "pageFullScreen",
//         "fullScreen",
//     ], //显示所有按钮,
// });
</script>

<style scoped></style>