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

  <!--  <div class="item" @click="to">-->
  <!--    <van-image-->
  <!--        width="100"-->
  <!--        height="100"-->
  <!--        src="https://unpkg.com/@vant/assets/cat.jpeg"-->
  <!--    />-->
  <!--&lt;!&ndash;    <div class="img">&ndash;&gt;-->

  <!--&lt;!&ndash;      <span class="mx-auto">&ndash;&gt;-->
  <!--&lt;!&ndash;        <i><van-icon name="tv-o" />&ensp;33</i>&ndash;&gt;-->
  <!--&lt;!&ndash;        <i><van-icon name="comment-o" />55</i>&ndash;&gt;-->
  <!--&lt;!&ndash;      </span>&ndash;&gt;-->
  <!--&lt;!&ndash;    </div>&ndash;&gt;-->
  <!--&lt;!&ndash;    <div class="content">&ndash;&gt;-->
  <!--&lt;!&ndash;      <div class="title">{{video.name}}</div>&ndash;&gt;-->

  <!--&lt;!&ndash;    </div>&ndash;&gt;-->
  <!--  </div>-->
  <!--&lt;!&ndash;  <van-divider :style="{ margin: '.5em' }" />&ndash;&gt;-->
</template>

<script setup>
import router from '@/routes'
import {defineProps} from 'vue'

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