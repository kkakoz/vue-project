<template>
  <div class="p-10">
    <div v-if="$store.getters.user" class="text-center">
      <div class="user">
        <van-uploader :after-read="uploadAvatar">
          <van-image
              width="100"
              height="100"
              round
              :src="$store.getters.user.avatar"
          />
        </van-uploader>

        <div class="username">{{ $store.getters.user.name }}</div>
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
    <van-cell v-if="$store.getters.user" title="退出" @click="logout"></van-cell>
  </van-cell-group>

  <Tabbar></Tabbar>
</template>

<script setup>
import Tabbar from '../components/Tabbar.vue';
import { ref, reactive, onMounted } from 'vue'
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {oss, put} from '@/api/oss';
import {Toast} from "vant";
import {updateAvatar} from "../api/user";


let router = useRouter()

const store = useStore()

const logout = () => {
  store.commit("logout")
  router.go(0)
}

// 上传头像
const uploadAvatar = async (file) => {
  // console.log(file)
  try {
    let conf = await oss()
    console.log(conf)
    let res = await put(file.file.name, file.file, conf)
    console.log(res)
    await updateAvatar({url: res.url})
    store.commit("setAvatar", res.url)
  }catch (e) {
    console.log("err = ",e)
  }
  // oss().then((conf) => {
  //   console.log("res = ", conf)
  //   put(file.file.name, file.file, conf).then((putRes) => {
  //     Toast.success("上传成功")
  //     console.log(putRes)
  //     store.commit("setAvatar", putRes.url)
  //   }).catch((e) => {
  //     console.log(e)
  //     Toast.fail("上传失败")
  //   })
  // }).catch((e) => {
  //   console.log(e)
  // })
}

</script>

<style scoped lang="scss">
.header {
  .user-info-wrap {
    text-align: center;
  }
}
</style>

