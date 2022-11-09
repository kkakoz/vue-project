<template>

  <div class="max-hight bg-gray-100">
    <div class="text-center text-3xl">
      关注动态
    </div>
  <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="newsfeed in newsfeedList" :key="item" :title="item">
      <Newsfeed :newsfeed="newsfeed"></Newsfeed>
<!--      <div class="flex flex-col rounded-xl shadow-md p-4 bg-white">-->
<!--        &lt;!&ndash;  头部&ndash;&gt;-->
<!--        <div class="flex flex-row justify-between" @click.stop="toUser(newsfeed.userId)">-->
<!--          <div class="flex flex-row">-->
<!--            <van-image :src="newsfeed.user.avatar" round fit="container" width="10vw" height="10vw"/>-->
<!--            <div class="flex flex-col ml-2 justify-between">-->
<!--              <div>{{ newsfeed.user.name }}</div>-->
<!--              <div class="text-gray-500 text-xs" v-if="newsfeed.action === 1">分享了视频</div>-->
<!--              <div class="text-gray-500 text-xs" v-if="newsfeed.action === 2">发表新的动态</div>-->
<!--              <div class="text-gray-500 text-xs" v-if="newsfeed.action === 3">投稿新的视频</div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div>-->
<!--            <van-icon name="ellipsis"/>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="flex flex-col mt-4">-->
<!--          <div>{{ newsfeed.content }}</div>-->
<!--        </div>-->
<!--        <div v-if="newsfeed.targetType === 1">-->
<!--          <div class="rounded-xl shadow-md p-4" @click.stop="toVideo(newsfeed.targetId)">-->
<!--            <van-image :src="newsfeed.target.cover" fit="conver"></van-image>-->
<!--            <div>{{newsfeed.target.name}}</div>-->
<!--          </div>-->

<!--        </div>-->
<!--      </div>-->
    </van-cell>
  </van-list>
  </div>
  <Tabbar></Tabbar>
</template>

<script setup>

import {ref} from "vue";
import {newsfeeds} from "../../api/news";
import Tabbar from "../../components/Tabbar.vue"
import {useRouter} from "vue-router";
import Newsfeed from "../../components/Newsfeed.vue";

let router = useRouter()
let lastId = 0
let finished = ref(false)
let loading = ref(false)
const newsfeedList = ref([])

// 列表加载
const onLoad = () => {
  newsfeeds({userId: 1, lastId}).then(res => {
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


const toVideo = (id)=> {
  router.push("/video/"+id)
}

const toUser = (userId) => {
  router.push(`/user/${userId}`)
}


</script>

<style lang="scss" scoped>
.van-cell {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity));
}
.max-hight {
  height:calc(100vh - 50px);
}

</style>