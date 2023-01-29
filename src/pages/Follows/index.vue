<template>
  <van-nav-bar title="关注列表" fixed="true"  placeholder/>
  <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="follower in followers" :key="item" :title="item">
      <User :user="follower" :followed="followed" />
    </van-cell>
  </van-list>

</template>

<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import {newsfeeds} from "../../api/news";
import {followerListApi} from "../../api/user";
import User from "../../components/User.vue"
import {useStore} from 'vuex'

let props = defineProps({
  userId: Number
})

const userId = Number(props.userId)

let store = useStore()

let followed = ref(false)
if (userId === store.getters.user.id) {
  followed.value = true
}

let router = useRouter()
let lastId = 0
let finished = ref(false)
let loading = ref(false)
const followers = ref([])

// 列表加载
const onLoad = () => {
  followerListApi({userId: userId, lastId}).then(res => {
    let data = res.data
    console.log("data = ", res)
    if (data.length) {
      console.log("in length")
      data.forEach(element => {
        followers.value.push(element)
      });
      lastId = data[data.length - 1].id
    } else {
      console.log("finish")
      finished.value = true;
    }
    loading.value = false;
  })
};


</script>