<template>
<div v-if="user" class="user-info-wrap">
  <img :src="user.avatar">
  <div>{{user.name}}</div>
</div>
<!-- /已登录：用户信息 -->

<!-- 未登录 -->
<div v-else class="not-login" @click="$router.push('/login')">
    not login
</div>
<!-- /未登录 -->

<!-- 退出 -->
<van-cell-group v-if="user">
  退出
</van-cell-group>
<!-- /退出 -->
    
    <button @click="upload">上传视频</button>
    <Tabbar></Tabbar>
</template>

<script setup>
import router from '../routes';
import Tabbar from '../components/Tabbar.vue';
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const user = store.state.user

console.log("user = ", user)
function upload () {
    router.push('/upload')
}

</script>

<style scoped lang="scss">

</style>

