
<template>
  <div>
    <div id="dplayer" class="play-root" ></div>
  </div>

</template>

<script setup>
// import '../../node_modules/dplayer/dist/DPlayer.min.js';
import DPlayer from 'dplayer';
import {onMounted} from "vue";


</script>

<style scoped>


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
