<template>
  <div class="item" @click="to">
    <div class="img">
      <img
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F032120114622%2F200321114622-4-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649310081&t=34c7c1d033d6f36402d5494dbef95c1e"
        id="image"
      />
    </div>
    <div class="content">
      <div class="title">{{video.name}}</div>
      <div class="list-info">
        <div>
          <van-icon name="user-circle-o" />&ensp;{{video.user_name}}
        </div>
        <div>
          <van-icon name="tv-o" />&ensp;{{video.view_count}}
        </div>
      </div>
    </div>
  </div>
  <van-divider :style="{ margin: '.5em' }" />
</template>

<script setup>
import router from '@/routes'
import { defineProps } from 'vue'
const props = defineProps({
  video: Object
})

console.log("video = ", props.video)

function to() {
  router.push("/video/"+props.video.id)
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  .img {
    margin: 1em;
    width: 40%;
    #image {
      width: 100%;
    }
  }
  .content {
    width: 50%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    .title {
      font-size: 1.3em;
      margin-top: 0.8em;
      height: 30%;
    }
    .list-info {
      font-size: 1.1em;
      color: grey;
    }
  }
}
</style>