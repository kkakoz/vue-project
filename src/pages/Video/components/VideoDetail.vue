<template>
  <User v-if="states" :user="video.user" :followed="states.followedCreator" />
  <div class="p-4">
    <div class="text-2xl">{{ video.name }}</div>
    <div class="mt-2">{{ video.brief }}</div>
    <State v-if="states" :states="states" :video="video"/>
    <div v-if="video.resources.length >1" class="pl-4 text-2xl">选集</div>
    <div v-if="video.resources.length >1" class="eps_list">

      <div class="eps shadow-md " v-for="resource in video.resources" @click.stop="$emit('change-resource', resource)">
        {{ resource.name }}
      </div>

    </div>
  </div>

  <van-list>
    <VideoItem v-for="video in recommendVideos" :video="video"/>
  </van-list>
</template>

<script setup>
import {ref, defineProps, toRefs, computed} from 'vue';
import State from "./State.vue";
import User from "@/components/User.vue";
import {useStore} from "vuex";
import { videoUserState, getRecommendVideos } from '@/api/video';
import VideoItem from "@/components/VideoItem.vue";


const store = useStore()

const props = defineProps({
  video: Object
})

const changeResource =(resource) => {

}


const states = ref(undefined)

if (store.getters.user) {
  videoUserState({videoId: props.video.id}).then(res => {
    states.value = res
  }).catch((e) => {
    console.log(e)
  })
} else {
  states.value = {followed_creator:false,user_like:false,user_dis_like:false,user_collection:false,user_shared:false}
}

let recommendVideos = ref([])

getRecommendVideos({videoId: props.video.id}).then((res) => {

  res.forEach((ele) => {
    recommendVideos.value.push(ele)
  })
}).catch((e) => {
  console.log(e)
})

</script>

<style scoped lang="scss">
.eps_list {
  display: flex; //flex布局
  flex-shrink: 0; // 收缩比例
  white-space: nowrap; // 规定段落中的文本不进行换行
  overflow-x: auto; // 横向溢出元素的内容区域添加滚动
  margin: 2rem 1rem;
  bottom: -10rem;

  &::-webkit-scrollbar {
    width: 0 !important
  }

  .eps {
    margin-right: 4vw;
    // border: 3px solid white;
    border-radius: 2vw;
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