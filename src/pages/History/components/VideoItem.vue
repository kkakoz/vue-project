<template>
  <div class="flex flex-row" @click.stop="toVideo">
    <van-image
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
        <div class="text-xs pt-2 text-gray-400">
          {{dateFormat(history.updatedAt)}}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {defineProps, ref} from 'vue'
import {dateFormat} from "@/utils/date";

const props = defineProps({
  history: Object
})

let router = useRouter()

console.log("vidoe = ", props.history)
const video = props.history.video

function toVideo() {
  router.push("/video/"+video.id)
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