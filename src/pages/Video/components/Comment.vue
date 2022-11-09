<template>
  <div class="flex flex-row" @click="emitReplyComment">
    <div class="left">
      <van-image fit="contain" width="10vw" round :src="comment.avatar" @click.stop="toUser(comment.userId)"/>
    </div>
    <div class="flex flex-col pl-4 font-extralight w-full">
      <div class="text-lg">
        <span>{{ comment.username }}</span>
      </div>
      <div class="text-xs font-thin">{{ dateFormat(comment.createdAt) }}</div>

      <div class="text-1xl pt-4 font-medium">{{ comment.content }}</div>
      <div class="actions">
        <i class="icon iconfont icon-zantong" @click="like(comment.id)"></i>
        <i class="icon iconfont icon-xinxi  pl-4" @click="like(comment.id)"></i>
      </div>
      <div class="bg-gray-100 p-2 w-full" v-if="comment.subComments && comment.subComments.length > 0">
        <div v-for="subComment in comment.subComments" class="flex flex-row"
             @click.stop="$emit('sub-comments', comment.id)">
          <div class="text-blue-300" @click.stop="toUser(subComment.userId)">{{ subComment.username }}</div>
          &nbsp;
          <div v-if="subComment.targetId">
            &nbsp;回复&nbsp;
            <div @click.stop="toUser(subComment.targetId)" class="text-blue-200">
              {{ subComment.targetName }}
            </div>
          </div>
          :&nbsp;{{ subComment.content }}
        </div>
        <div class="last">
          <span class="text-blue-300" @click.stop="$emit('sub-comments', comment.id)">更多回复</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {defineProps, defineEmits} from 'vue';
import moment from "moment";
import {useRouter} from "vue-router";
import { dateFormat } from "@/utils/date"


let router = useRouter()

let props = defineProps({
  comment: Object
})

let comment = props.comment
let emit = defineEmits(["sub-comments", "reply-comment"])

const emitReplyComment = () => {
  emit('reply-comment', {commentId: comment.id, toId: comment.fromId, rootId: 0, username: comment.username})
}

function like(id) {
  console.log("like")
}

const toUser = (userId) => {
  router.push(`/user/${userId}`)
}


</script>

<style scoped lang="scss">

</style>