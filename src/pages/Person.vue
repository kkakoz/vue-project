<template>
  <div>person page</div>
  <van-uploader :after-read="afterRead" />
  <img :src="cur" />
  <Tabbar></Tabbar>
  <input type="file" />
</template>

<script setup>
import router from '../routes';
import Tabbar from '../components/Tabbar.vue';
import {ref} from 'vue'

let cur = ref("")

const afterRead = (file) => {
  // 此时可以自行将文件上传至服务器
  console.log(file.file);
  let url = URL.createObjectURL(file.file)
  console.log(url)
  cur.value = url
};

</script>

