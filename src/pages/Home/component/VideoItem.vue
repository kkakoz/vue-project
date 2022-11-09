<template>
  <div class="video-item" @click="to">
    <div class="video-item-pic">
      <img
          :src="video.cover" />
      <span>
            <i><van-icon name="tv-o"/>{{ video.view }}</i>
            <i><van-icon name="comment-o"/>{{ video.comment }}</i>
          </span>
    </div>
    <h3 class="video-item-title">{{ video.name }}</h3>
  </div>
</template>

<script setup>
import {defineProps} from 'vue'
import {useRouter} from "vue-router";

let router = useRouter()
const props = defineProps({
  video: Object
})

function to() {
  router.push("/video/" + props.video.id)
}
</script>

<style lang="scss" scoped>
.video-item {
  width: 45vw;

  .video-item-title {
    font-size: 4vw;
    margin-top: 2vw;
    line-height: 4vw;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}

.video-item-pic {
  display: grid;
}

.video-item-pic {
  img {
    grid-area: 1/1/1/1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 3px;
  }

  span {
    grid-area: 1/1/1/1;
    align-self: end;
    width: 100%;
    object-fit: cover;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

    i {
      margin-right: 1.5vw;
    }

    padding: .5vw .5vw;
  }
}
</style>