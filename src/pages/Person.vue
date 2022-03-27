<template>
    <div>person page</div>
    <button @click="upload">上传视频</button>
    <Tabbar></Tabbar>
</template>

<script setup>
import router from '../routes';
import Tabbar from '../components/Tabbar.vue';
import { ref } from 'vue'

function upload () {
    router.push('/upload')
}

</script>

