<template>
  <div class="flex flex-row" @click="to">
    <van-image
        width="50vw"
        height="20vw"
        fit="contain"
        :src="video.cover"
    />
    <div class="flex flex-col justify-between">
      <div class="text-2xl">{{video.name}}</div>
      <div class="list-info">
        <div>
          <van-icon name="user-circle-o" />&ensp;{{video.user.name}}
        </div>
        <div>
          <van-icon name="tv-o" />&ensp;{{ video.view }}&ensp;
          <van-icon name="comment-o" />&ensp;{{ video.comment }}
        </div>
      </div>
    </div>
  </div>
  <van-divider :style="{ margin: '.5em' }" />
</template>

<script setup>
import {useRouter} from "vue-router";
let router = useRouter()
import { defineProps } from 'vue'
const props = defineProps({
  video: Object
})

function to() {
  router.push("/video/"+props.video.id)
}
</script>

<style lang="scss" scoped>
.item {
  //display: flex;
  //flex-direction: row;
  //flex-wrap: wrap;
  //justify-content: space-around;
  .img {
    margin: 1em;
    width: 40vw;
  }
  //.content {
  //  width: 50%;
  //  display: flex;
  //  flex-direction: column;
  //  flex-wrap: wrap;
  //  .title {
  //    font-size: 1.3em;
  //    margin-top: 0.8em;
  //    height: 30%;
  //  }
  //  .list-info {
  //    font-size: 1.1em;
  //    color: grey;
  //  }
  //}
}
</style>