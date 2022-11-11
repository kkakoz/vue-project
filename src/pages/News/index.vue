<template>
  <div class="max-hight bg-gray-100">
  <van-nav-bar fixed="true"  placeholder
      title="关注动态"
  >
    <template #right>
      <van-icon name="add-o" @click="toShare" />
    </template>
  </van-nav-bar>


    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="newsfeed in newsfeedList" :key="item" :title="item">
        <Newsfeed :newsfeed="newsfeed"></Newsfeed>
      </van-cell>
    </van-list>
  </div>
  <Tabbar></Tabbar>
</template>

<script setup>

import {ref} from "vue";
import {followedNewsfeedsApi} from "../../api/news";
import Tabbar from "@/components/Tabbar.vue"
import {useRouter} from "vue-router";
import Newsfeed from "@/components/Newsfeed.vue";

let router = useRouter()
let lastId = 0
let finished = ref(false)
let loading = ref(false)
const newsfeedList = ref([])

// 列表加载
const onLoad = () => {
  followedNewsfeedsApi({lastId}).then(res => {
    let data = res.data
    console.log("data = ", data)
    if (data.length) {
      console.log("in length")
      data.forEach(element => {
        newsfeedList.value.push(element)
      });
      lastId = data[data.length - 1].id
    } else {
      console.log("finish")
      finished.value = true;
    }
    loading.value = false;
  })
};

// share
const toShare = () => {
  router.push({
    name: "Share",
    params: {
      action: 2,
    }
  })
}

</script>

<style lang="scss" scoped>
.van-cell {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity));
}

.max-hight {
  height: calc(100vh - 50px);
}

</style>