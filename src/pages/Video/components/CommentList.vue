<template>
  <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="comment in comments" :key="item" :title="item">
      <Comment :comment="comment" @reply-comment="clickComment" @sub-comments="clickMoreComment"/>
    </van-cell>
  </van-list>
  <div class="reply-bottom">
    <div class="flex flex-row min-w-full">
      <van-field
          v-model="commentMsg"
          rows="1"
          autosize
          type="textarea"
          placeholder="请输入评论"
      />

      <div class="p-3">
        <i class="icon iconfont icon-fabu text-2xl" @click="sendVideoComment"></i>
      </div>
    </div>
  </div>
  <van-popup v-model:show="showReply" position="bottom">
      <div class="flex flex-row min-w-full">
        <van-field ref="commentInput"
                   v-model="replyContent"
                   rows="1"
                   autosize
                   type="textarea"
                   :placeholder="`回复${replyComment.username}:`"
        />

        <div class="p-3">
          <i class="icon iconfont icon-fabu text-2xl" @click="sendSubComment"></i>
        </div>
      </div>
  </van-popup>

  <van-action-sheet v-if="moreComment" v-model:show="moreComment"  :style="{ height: '60%' }">
    <van-list
        v-model:loading="subLoading"
        :finished="subFinished"
        finished-text="没有更多了"
        @load="subOnLoad"
    >
      <van-cell v-for="subComment in subComments" :key="item" :title="item">
        <SubComment :subComment="subComment" @reply-comment="clickComment"/>
      </van-cell>
    </van-list>
  </van-action-sheet>

</template>

<script setup>
import {defineProps, nextTick, reactive, ref} from "vue";
import {getComments, addComment, addSubComment, getSubComments} from '@/api/comment';
import {Toast} from "vant";
import SubComment from "./SubComment.vue"
import Comment from "./Comment.vue"
import {useRouter} from "vue-router";


const props = defineProps({
  videoId: Number,
})

// comment list
let lastId = 0
let finished = ref(false)
let loading = ref(false)
const comments = ref([])

const onLoad = () => {
  // 异步更新数据
  getComments({videoId: props.videoId, lastId}).then(res => {
    let data = res.data
    data.forEach(element => {
      comments.value.push(element)
    });
    loading.value = false;
    if (data.length > 0) {
      lastId = data[data.length - 1].id
    } else {
      finished.value = true;
    }
  })
};

let commentMsg = ref("")

const sendVideoComment = () => {
  console.log("videoId = ", props.videoId)
  console.log("videoId = ", typeof props.videoId)
  addComment({targetId: props.videoId, content: commentMsg.value}).then((res) => {
    if (commentMsg.value === "") {
      Toast.fail("评论不能为空")
      return
    }
    commentMsg.value = ""
    Toast.success("评论成功")
  }).catch((e) => {
    Toast.fail("评论失败")
  })
}

// reply comment
const replyComment = ref(undefined)
const showReply = ref(false)
const replyContent = ref("")

const commentInput = ref()

const clickComment = ((value) => {
  console.log("value = ", value)
  replyComment.value = value
  showReply.value = true
  nextTick(() => {
    commentInput.value?.focus();
  })
})

const sendSubComment = () => {
  addSubComment({commentId: replyComment.value.commentId, content: replyContent.value, rootId: replyComment.value.rootId, toId: replyComment.value.toId}).then((res) => {
    Toast.success("评论成功")
    showReply.value = false
    refreshSubComment()
  }).catch((e) => {
    Toast.success("评论失败" + e)
  })
}

// more subcomment
const moreComment = ref(false)
const commentIdSubs = ref()

let subLastId = 0
let subFinished = ref(false)
let subLoading = ref(false)
const subComments = ref([])

const refreshSubComment = () => {
  subLastId = 0
  subComments.value = []
  subFinished.value = false
  subLoading.value = false
  replyContent.value = ""
}

const clickMoreComment = (commentId) => {
  console.log("enter more comment id = ", commentId)
  commentIdSubs.value = commentId
  moreComment.value = true
  refreshSubComment()
}

const subOnLoad = () => {
  // 异步更新数据
  getSubComments({commentId: commentIdSubs.value, lastId: subLastId}).then(res => {
    let data = res.data
    data.forEach(element => {
      subComments.value.push(element)
    });
    if (data.length > 0) {
      console.log("is loading")
      subLastId = data[data.length - 1].id
      subLoading.value = false;
    } else {
      console.log("is finshed")
      subLoading.value = false;
      subFinished.value = true;
    }
  })
};


</script>

<style scoped lang="scss">
.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  // height: 3rem;
  max-height: 10rem;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;

  .write-btn {
    width: 60%;
  }
}
</style>