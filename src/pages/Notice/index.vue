<template>
  <van-nav-bar left-arrow fixed="true" @click-left="goBack" placeholder>
    <template #right>
     <div>一键已读</div>
    </template>
  </van-nav-bar>
  <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="notice in notices" :key="item" :title="item">
      <Notice :notice="notice"/>
    </van-cell>
  </van-list>

</template>

<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import {noticeListApi} from "@/api/notice";
import Notice from "./components/Notice.vue";

let router = useRouter()
let lastId = 0
let finished = ref(false)
let loading = ref(false)
const notices = ref([])

// 列表加载
const onLoad = () => {
  noticeListApi({lastId}).then(res => {
    let data = res.data
    console.log("data = ", res)
    if (data.length) {
      console.log("in length")
      data.forEach(element => {
        notices.value.push(element)
      });
      lastId = data[data.length - 1].id
    } else {
      console.log("finish")
      finished.value = true;
    }
    loading.value = false;
  })
};

const goBack = () => {
  router.go(-1)
}


</script>