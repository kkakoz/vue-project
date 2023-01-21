<template>
  <div class="flex flex-row" @click.stop="toVideo">
    <van-image v-if="video"
        width="35vw"
        height="20vw"
        fit="fill"
        :src="video.cover"
    />
    <div class="pl-4 flex flex-col justify-between right-container">
      <div class="text-xl video-title">{{video.name}}</div>
      <div>
        <div class="text-gray-400">
          <van-icon name="user-circle-o" />&ensp;{{video.user.name}}
        </div>
        <div class="text-gray-400">
        <van-icon name="tv-o" />&ensp;{{ video.view }}&ensp;
        <van-icon name="comment-o" />&ensp;{{ video.comment }}
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import { defineProps } from 'vue'
const props = defineProps({
  video: Object
})

let router = useRouter()


function toVideo() {
  router.push("/video/"+props.video.id)
}
</script>

<style lang="scss" scoped>

.video-title {
  font-size: 4vw;
  margin-top: 2vw;
  line-height: 4vw;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  height: 8vw;
}


.right-container {
  width: 65vw;
}

</style>