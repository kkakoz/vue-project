<template>
  <div class="p-10">
    <div v-if="$store.getters.user" class="text-center">
      <div class="flex flex-row mb-4">
        <van-uploader :after-read="uploadAvatar">
          <van-image
              width="10vw"
              height="10vw"
              round
              :src="$store.getters.user.avatar"
          />
        </van-uploader>

        <div class="flex flex-col pl-2 ">
          <div class="text-2xl flex">{{ $store.getters.user.name }}</div>
          <div v-if="$store.getters.user.brief" class="text-1xl text-center pt-2 flex pl-6 text-gray-400">
            {{$store.getters.user.brief}}
          </div>
          <div v-else class="text-1xl text-center flex text-gray-400">
            这个人很懒,什么也没留下
          </div>
        </div>
      </div>
      <van-grid class="grid-nav mb-9" :column-num="3" clickable>
        <van-grid-item class="grid-item" @click="toCollectPage">
          <i slot="icon" class="toutiao toutiao-shoucang"></i>
          <span slot="text" class="text">收藏</span>
        </van-grid-item>
        <van-grid-item class="grid-item" @click="toHistoryPage">
          <i slot="icon" class="toutiao toutiao-lishi"></i>
          <span slot="text" class="text">历史</span>
        </van-grid-item>
        <van-grid-item class="grid-item" @click="toFollowPage($store.getters.user.id)">
          <i slot="icon" class="toutiao toutiao-lishi"></i>
          <span slot="text" class="text">关注</span>
        </van-grid-item>
<!--        <van-grid-item class="grid-item">-->
<!--          <i slot="icon" class="toutiao toutiao-lishi"></i>-->
<!--          <span slot="text" class="text">作品</span>-->
<!--        </van-grid-item>-->
      </van-grid>
      <!-- 退出 -->
      <van-cell-group>
<!--        <van-cell title="消息通知"/>-->
<!--        <van-cell title="上传视频" @click="upload"/>-->
        <van-cell v-if="$store.getters.user" title="退出" @click="logout"></van-cell>
      </van-cell-group>
    </div>
    <!-- /已登录：用户信息 -->

    <!-- 未登录 -->
    <div v-else class="w-full" @click="$router.push('/login')">
      <div class="flex flex-row mb-4">
        <van-image
            width="10vw"
            height="10vw"
            round
            src="http://kkako-blog-bucket.oss-cn-beijing.aliyuncs.com/1_avatar"
        />

        <div class="flex flex-col pl-2 ">
          <div class="text-2xl flex">注册/登录</div>
          <div></div>
        </div>
      </div>
    </div>
    <!-- /未登录 -->
  </div>


  <Tabbar></Tabbar>
</template>

<script setup>
import Tabbar from '../../components/Tabbar.vue';
import {ref, reactive, onMounted} from 'vue'
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {oss, put} from '@/api/oss';
import {Toast} from "vant";
import {updateAvatar} from "../../api/user";


let router = useRouter()

const store = useStore()

const logout = () => {
  store.commit("logout")
  router.go(-1)
}

// 上传头像
const uploadAvatar = async (file) => {
  try {
    let conf = await oss()
    console.log("conf = ", conf)
    let res = await put(`${store.getters.user.id}_avatar`, file.file, conf)
    console.log(res)
    await updateAvatar({url: res.url})
    store.commit("setAvatar", res.url)
    router.go(0)
  } catch (e) {
    console.log("err = ", e)
  }
}

// 去关注页面
const toFollowPage = (userId) => {
  router.push("/follower/" + userId)
}

// 历史记录
const toHistoryPage = () => {
  router.push("/history")
}

const toCollectPage = () => {
  router.push("/collect")
}

</script>

<style scoped lang="scss">

</style>

