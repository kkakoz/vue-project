<template>
  <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      right-text="发布"
      @click-right="clickRight"
  />
  <van-cell-group inset>
    <van-field
        v-model="content"
        rows="6"
        autosize
        type="textarea"
        placeholder="分享至动态"
    />
  </van-cell-group>

  <div class="m-4 bg-gray-100 h-40">
    <div class="flex flex-col">
      <div>
        <span class="text-blue-200 text-xs">@{{ username }}</span>
      </div>
      <div class="flex flex-row">
        <div>
          <van-image fit="cover" width="30vw" :src="cover"/>
        </div>
        <div class="text-2xl pl-2">
          {{ name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {newsfeedAdd} from "../../api/news";
import {Toast} from 'vant';

let route = useRoute()
let router = useRouter()
const {username, name, cover, videoId} = route.params
const content = ref("")

const onClickLeft = () => {
  router.back()
}

const clickRight = () => {
  newsfeedAdd({targetType: 1, targetId: Number(videoId), content: content.value, action: 1}).then(() => {
    Toast.success("分享成功")
    router.back()
  }).catch((err) => {
    console.log("err:", err)
  })
}

</script>