<template>
  <div class="p-10">
    <div v-if="user" class="text-center">
      <div class="user">
        <van-image
          width="100"
          height="100"
          round
          :src="user.avatar"
        />
        <div class="username">{{ user.name }}</div>
      </div>
      <van-grid class="grid-nav mb-9" :column-num="3" clickable>
        <van-grid-item class="grid-item">
          <i slot="icon" class="toutiao toutiao-shoucang"></i>
          <span slot="text" class="text">收藏</span>
        </van-grid-item>
        <van-grid-item class="grid-item">
          <i slot="icon" class="toutiao toutiao-lishi"></i>
          <span slot="text" class="text">历史</span>
        </van-grid-item>
        <van-grid-item class="grid-item">
          <i slot="icon" class="toutiao toutiao-lishi"></i>
          <span slot="text" class="text">作品</span>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- /已登录：用户信息 -->

    <!-- 未登录 -->
    <div v-else class="not-login" @click="$router.push('/login')">
      <div class="my-container">
        <div class="header">
          <img class="mobile-img" src="../assets/mobile.png" @click="$router.push('/login')" />
        </div>
      </div>
    </div>
    <!-- /未登录 -->
  </div>
  <!-- 退出 -->
  <van-cell-group>
    <van-cell title="消息通知" />
    <van-cell title="上传视频" @click="upload" />
    <van-cell v-if="user" title="退出"></van-cell>
  </van-cell-group>

  <Tabbar></Tabbar>
</template>

<script setup>
import router from '../routes';
import Tabbar from '../components/Tabbar.vue';
import { ref, reactive, onMounted } from 'vue'

const user = JSON.parse(localStorage.getItem("user"))

console.log("user = ",user)

function upload() {
  router.push('/upload')
}

</script>

<style scoped lang="scss">
.header {
  .user-info-wrap {
    text-align: center;
  }
}
</style>

