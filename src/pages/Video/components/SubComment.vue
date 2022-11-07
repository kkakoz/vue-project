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
import moment from "moment";
import {useRouter} from "vue-router";
let router = useRouter()

let props = defineProps({
  subComment: Object
})

const toUser = (userId) => {

  router.push(`/user/${userId}`)
}

function dateFormat(unix) {
  let date = new Date(unix)
  return moment(date).format("YYYY-MM-DD HH:mm");
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
.app {
  display: flex;

  .left {
    width: 2.5rem;
    margin: 1.5rem 2rem 2rem 0;
  }

  .right {
    margin: 0.2rem;

    .user {
      margin: 1rem 0 0.3rem 0;
      font-size: 1.2rem;
    }

    .time {
      font-size: 0.5rem;
      color: #8a919f;
    }

    .content {
      margin: .5rem 0rem .5rem 0;
      font-size: 0.8em;
      color: #515767;
    }

    .actions {
      width: 20%;
      display: flex;
      font-size: 1.5em;
      justify-content: space-between;
    }

    .sub_comments {
      // background-color: #f4f5f5;
      background-color: rgba(247, 248, 250, 0.7);
      margin-left: 0.5rem;
      width: 90%;

      .sub {
        padding: 0.5rem 0.5rem 0 0.5rem;
      }

      .last {
        padding: 0.5rem 0.5rem 0.5rem 0.5rem;
      }
    }
  }
}


.van-divider--hairline {
  margin: 4px 0;
}
</style>