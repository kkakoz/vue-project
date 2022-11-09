<template>
  <div class="flex flex-row" @click="emitReplyComment">
    <div class="w-10 m-1">
      <van-image fit="cover" width="3.5rem" round :src="subComment.userAvatar"/>
    </div>
    <div class="flex flex-col ml-4">
      <div class="text-lg">
        <span>{{ subComment.username }}</span>
      </div>
      <div class="text-xs font-thin">{{ dateFormat(subComment.createdAt) }}</div>

      <div class="flex flex-row text-1xl pt-4 font-medium">
        <div v-if="subComment.toId">
          回复&nbsp;
          <span @click.stop="toUser(subComment.toId)" class="text-blue-200">
          {{ subComment.toName }}:&nbsp;
        </span>
        </div>
        {{ subComment.content }}
      </div>
<!--      <div class="actions">-->
<!--        <i class="icon iconfont icon-zantong" @click.stop="like(subComment.id)"></i>-->
<!--        <i class="icon iconfont icon-xinxi" @click.stop="like(subComment.id)"></i>-->
<!--      </div>-->
    </div>
  </div>

</template>

<script setup>

import {defineProps, defineEmits} from 'vue';
import { dateFormat } from "@/utils/date"
import {useRouter} from "vue-router";
let router = useRouter()

let props = defineProps({
  subComment: Object
})

const toUser = (userId) => {

  router.push(`/user/${userId}`)
}



let subComment = props.subComment

let emit = defineEmits(["reply-comment"])

const emitReplyComment = () => {
  emit('reply-comment', {
    commentId: subComment.commentId,
    toId: subComment.userId,
    rootId: subComment.rootSubCommentId ? subComment.id : subComment.rootSubCommentId,
    username: subComment.username
  })
}


</script>

<style scoped lang="scss">

</style>