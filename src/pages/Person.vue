<template>
  <div class="header">
    <div v-if="user" class="user-info-wrap">
      <div class="user">
        <van-image
          width="100"
          height="100"
          src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg"
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
import { useStore } from 'vuex'
import User from '../components/User.vue';
const store = useStore()

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

