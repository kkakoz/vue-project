<template>
  <div class="flex flex-row justify-between m-3" @click="toUser(user.id)">
    <div class="flex flex-row">
      <van-image
          width="11vw"
          height="11vw"
          round
          :src="user.avatar"
      />
      <div class="flex flex-col  pl-2">
        <div class="text-2xl">{{ user.name }}</div>
        <div>{{ brief }}</div>
      </div>
    </div>
    <div v-if="$store.getters.user && $store.getters.user.id != user.id" class="p-2">
      <van-button v-if="curFollowed &&curFollowed === true" color="#D1D5DB" size="small" @click.stop="unFollowUser">已关注</van-button>
      <van-button v-else color="#60A5FA" size="small" @click.stop="followUser">+ 关注</van-button>
    </div>

  </div>
</template>

<script setup>
import {defineProps, reactive, ref, toRefs, watch} from 'vue';
import {followApi} from '@/api/user'
import {useRouter} from "vue-router";


let router = useRouter()
import {
  Toast
} from 'vant';

const props = defineProps({
  user: Object,
  brief: String,
  followed: Boolean
})

const toUser = (userId) => {
  router.push(`/user/${userId}`)
}

let user = reactive(props.user)

let brief = ref(`${user.fansCount}粉丝`)

let curFollowed = ref(props.followed)

let emit = defineEmits(["follow", "unfollow"])

const followUser = () => {
  followApi({followed_user_id: props.user.id, type: 1}).then(() => {
    Toast.success("关注成功")
    curFollowed.value = true
    user.fansCount++
    brief.value = `${user.fansCount}粉丝`
    emit("follow")
  }).catch((e) => {
    Toast.fail("关注失败")
  })
}

const unFollowUser = () => {
  followApi({followed_user_id: props.user.id, type: 2}).then(() => {
    Toast.success("取关成功")
    curFollowed.value = false
    user.fansCount--
    brief.value = `${user.fansCount}粉丝`
    emit("unfollow")
  }).catch((e) => {
    Toast.fail("取关失败")
  })
}


</script>

