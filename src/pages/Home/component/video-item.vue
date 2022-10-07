<template>
  <div class="item" @click="to">
    <van-image
        width="100"
        height="100"
        src="https://unpkg.com/@vant/assets/cat.jpeg"
    />
<!--    <div class="img">-->

<!--      <span class="mx-auto">-->
<!--        <i><van-icon name="tv-o" />&ensp;33</i>-->
<!--        <i><van-icon name="comment-o" />55</i>-->
<!--      </span>-->
<!--    </div>-->
<!--    <div class="content">-->
<!--      <div class="title">{{video.name}}</div>-->

<!--    </div>-->
  </div>
<!--  <van-divider :style="{ margin: '.5em' }" />-->
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
//.item {
//  padding: .2rem;
//  .img {
//    #image {
//      width: 5rem;
//    }
//  }
//  .content {
//    display: flex;
//    flex-direction: column;
//    flex-wrap: wrap;
//    .title {
//      font-size: 1.3em;
//      margin-top: 0.8em;
//      height: 30%;
//    }
//    .list-info {
//      font-size: 1.1em;
//      color: grey;
//    }
//  }
//}
</style>