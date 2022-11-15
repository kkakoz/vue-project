<template>
  <div class="video-item rounded-xl shadow-md" @click="toVideo">
    <div class="video-item-pic">
      <div class="cover">
        <van-image height="30vw" width="100%" fit="cover"
                   :src="video.cover"/>
      </div>

      <span>
            <i><van-icon name="tv-o"/>{{ video.view }}</i>
            <i><van-icon name="comment-o"/>{{ video.comment }}</i>
          </span>
    </div>
    <div class="flex flex-col justify-between">
      <div class="video-item-title pl-2">{{ video.name }}</div>
      <div class="text-xl text-gray-400 pl-2">{{ video.user.name }}</div>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from 'vue'
import {useRouter} from "vue-router";

let router = useRouter()
const props = defineProps({
  video: Object
})

function toVideo() {
  router.push("/video/"+props.video.id)
}
</script>

<style lang="scss" scoped>
.video-item {
  margin: 2vw;

  .video-item-title {
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
}

.video-item-pic {
  display: grid;
}

.video-item-pic {
  .cover {
    grid-area: 1/1/1/1;
    width: 100%;
    height: 30vw;
    object-fit: contain;
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