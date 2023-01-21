<script setup>
import {ref, reactive, onMounted} from 'vue';
import Tabbar from '@/components/Tabbar.vue';
import {  getCategories } from '@/api/home'
import VideoList from './components/VideoList.vue'
import {useRouter} from "vue-router";
import { unReadCountApi } from '@/api/notice'
import {useStore} from "vuex";

let router = useRouter()
const active = ref(0);

let categoryId = 0

const categoryList = ref([{ id: 0, name: "最新" }])

getCategories().then(res => {
  console.log("res = ",res)
  res.data.forEach(element => {
    categoryList.value.push(element)
  });
}).catch((err) => {
  throw err
})

const unReadCount = ref(0)

const store = useStore()
if (store.getters.user) {
  unReadCountApi().then(res => {
    console.log("notice count = ", res)
    unReadCount.value = res.count
  })

}


function login() {
  router.push('/login')
}

const toSearch =() => {
  router.push("/search")
}

const toNoticePage =() => {
  router.push("/notice")
}



</script>

<template>
  <van-nav-bar >
    <template #left>
      <van-image v-if="$store.getters.user"
          round
          width="10vw"
          height="10vw"
          :src="$store.getters.user.avatar"
      />
<!--      https://unpkg.com/@vant/assets/cat.jpeg-->
      <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" @click="toSearch"/>
    </template>
    <template #right>

      <div v-if="!$store.getters.user" class="login text-blue-400" @click="login">
        登录
      </div>
      <div v-else class="alarm" @click="toNoticePage">
        <i class="iconfont icon-email text-3xl"></i>

        <div v-if="unReadCount>0" class="divright">
          {{ unReadCount }}
        </div>
      </div>
    </template>
  </van-nav-bar>
  <van-tabs v-model:active="active" @click-tab="onClickTab">
    <van-tab :name="category.id" :title="category.name" v-for="category in categoryList">
      <VideoList :categoryId="category.id"></VideoList>
      <!-- <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <VideoItem v-for="item in videoList.arr" :video="item"></VideoItem>
      </van-list> -->
    </van-tab>
  </van-tabs>
  <Tabbar></Tabbar>
</template>


<style lang="scss" scoped>

.login {
  padding: .05rem;

  border-radius: 50%;
}

.divright {
  position: absolute;
  color: white;
  font-size: .2rem;
  background-color: #fb7299;
  height: 1.5rem;
  min-width: 1.5rem;
  line-height: 20px;
  left: 60%;
  top: -8px;
  text-align: center;
  -webkit-border-radius: 1.5rem;
  border-radius: 1.5rem;
}

.alarm {
  position: relative;
  height: 1.5rem;
  margin-right: .5rem;
}

</style>