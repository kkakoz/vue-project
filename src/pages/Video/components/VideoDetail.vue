<template>
  <User v-if="states" :user="video.user" :brief="brief" :followed="states.followed_creator" />
  <div class="p-4">
    <div class="text-2xl">{{ video.name }}</div>
    <div class="mt-2">{{ video.brief }}</div>
    <State v-if="states" :states="states"/>
    <div class="eps_list">
      <div class="eps" v-for="eps in video.resources">{{ eps.name }}</div>
      <div class="eps">第二季</div>
      <div class="eps">第二季</div>
      <div class="eps">第二季</div>
      <div class="eps">第二季</div>
      <div class="eps">第二季</div>
      <div class="eps">第二季</div>
      <div class="eps">第二季</div>
    </div>
  </div>
</template>

<script setup>
import {ref, defineProps, toRefs, computed} from 'vue';
import State from "./State.vue";
import User from "@/components/User.vue";
import {useStore} from "vuex";
import { videoUserState } from '@/api/video';
const store = useStore()

const props = defineProps({
  videoId: Number,
  video: Object
})

let brief = ref(`${props.video.user.fans_count}粉丝`)

const states = ref(undefined)

if (store.getters.user) {
  videoUserState({video_id: props.videoId}).then(res => {
    console.log("state res = ", res)
    states.value = res
  }).catch((e) => {
    console.log(e)
  })
} else {
  states.value = {followed_creator:false,user_like:false,user_dis_like:false,user_collection:false,user_shared:false}
}

</script>

<style scoped lang="scss">
.eps_list {
  display: flex; //flex布局
  flex-shrink: 0; // 收缩比例
  white-space: nowrap; // 规定段落中的文本不进行换行
  overflow-x: auto; // 横向溢出元素的内容区域添加滚动
  margin: 0 1rem;
  bottom: -10rem;

  &::-webkit-scrollbar {
    width: 0 !important
  }

  .eps {
    margin-right: 4vw;
    // border: 3px solid white;
    border-radius: 5px;
    padding: 10px;
    outline: .1rem solid #ccc;
    outline-offset: -1px;

    &:hover {
      outline: .2rem solid #5aa5d3;
      color: #5aa5d3;
    }

  }
}

</style>