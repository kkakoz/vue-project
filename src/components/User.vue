<template>
  <div class="flex flex-row justify-between p-4">
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
    <div class="p-2">
      <van-button v-if="curFollowed" color="#D1D5DB" size="small" @click="unFollowUser">已关注</van-button>
      <van-button v-else color="#60A5FA" size="small" @click="followUser">+ 关注</van-button>
    </div>

  </div>
</template>

<script setup>
import {defineProps, ref, toRefs, watch} from 'vue';
import {follow} from '@/api/user'
import {
  Toast
} from 'vant';

const props = defineProps({
  user: Object,
  brief: String,
  followed: Boolean
})

let curFollowed = ref(props.followed)


const followUser = () => {
  follow({followed_user_id: props.user.id, type: 1}).then(() => {
    Toast.success("关注成功")
    curFollowed.value = true
  }).catch((e) => {
    Toast.fail("关注失败")
  })
}

const unFollowUser = () => {
  follow({followed_user_id: props.user.id, type: 2}).then(() => {
    Toast.success("取关成功")
    curFollowed.value = false
  }).catch((e) => {
    Toast.fail("取关失败")
  })
}


</script>

