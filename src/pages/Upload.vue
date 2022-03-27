<template>
    <van-nav-bar left-arrow @click-left="onClickLeft">
        <template #right>
            <van-uploader :after-read="afterRead">
                <van-button round type="primary">上传视频</van-button>
            </van-uploader>
        </template>
    </van-nav-bar>
    <Video :videoUrl="url"></Video>
</template>

<script setup>
import router from '../routes';
import Tabbar from '../components/Tabbar.vue';
import Video from '../components/Video.vue'
import { ref } from 'vue'

let url = ref("")

const onClickLeft = () => history.back()

const afterRead = (file) => {
    // 此时可以自行将文件上传至服务器
    console.log(file.file);
    url.value = URL.createObjectURL(file.file)
    console.log(url)
};

</script>
