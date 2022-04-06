<template>
    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        immediate-check="false"
    >
        <VideoItem v-for="item in videoList.list" :video="item"></VideoItem>
    </van-list>
</template>

<script setup>
import VideoItem from './video-item.vue'
import { ref, reactive, defineProps } from 'vue';
import { getVideos } from '@/api/video';
import _default from 'vant';
const props = defineProps({
    categoryId: Number
})

let lastId = 0
let finished = ref(false)
let loading = ref(false)
const videoList = reactive({ list: [] })

const onLoad = () => {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    getVideos({ category_id: props.categoryId, last_value: lastId }).then(res => {
        res.forEach(element => {
            videoList.list.push(element)
        });
        console.log("length = ", res.length)
        if (res.length > 0) {
            console.log("is loading")
            loading.value = false;
            lastId = res[res.length - 1].id
        } else {
            console.log("is finshed")
            finished.value = true;
        }
    })
    // setTimeout(() => {
    //   for (let i = 0; i < 10; i++) {
    //     list.value.push(list.value.length + 1);
    //   }

    //   // 加载状态结束
    //   loading.value = false;

    //   // 数据全部加载完成
    //   if (list.value.length >= 40) {
    //     finished.value = true;
    //   }
    // }, 1000);
};


</script>

