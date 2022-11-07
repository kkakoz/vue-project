<template>
  <van-nav-bar
      left-arrow
      right-text="发布"
      @click-right="clickRight"
  />
  <van-cell-group inset>
    <van-field
        v-model="msg"
        rows="6"
        autosize
        type="textarea"
        placeholder="分享至动态"
    />
  </van-cell-group>

  <div class="m-4 bg-gray-100 h-40">
    <div class="flex flex-col">
      <div v-if="user">
        {{ username }}
      </div>
      <div v-if="title || url" class="flex flex-row">
        <div>
          {{url}}
        </div>
        <div>
          {{title}}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {ref} from "vue";
import {useRoute} from "vue-router";

let route = useRoute()
// const video = route.params.video
console.log("route = ", route)
const {username, title, cover } = route.params
const msg = ref("")



const clickRight = () => {

}

</script>