<template>
    <div class="flex flex-row">
        <div class="left">
            <van-image fit="cover" width="10vw" round :src="comment.avatar" />
        </div>
        <div class="flex flex-col pl-4 font-extralight">
            <div class="text-lg">
                <span>{{ comment.username }}</span>
            </div>
          <div class="text-xs font-thin">昨天</div>

            <div class="text-1xl pt-4 font-medium">{{ comment.content }}</div>
            <div class="actions">
                <i class="icon iconfont icon-zantong" @click="like(comment.id)"></i>
                <i class="icon iconfont icon-xinxi  pl-4" @click="like(comment.id)"></i>
            </div>
            <div class="bg-gray-100 p-4" v-if="comment.subComments.length > 0">
                <div v-for="comment in comment.subComments" class="flex flex-row">
                  <div class="text-blue-300">{{ comment.name }}</div>
                    <div v-if="comment.targetId">
                        &nbsp;回复&nbsp;
                      {{ comment.targetName }}
                    </div>
                    :&nbsp;{{ comment.content }}
                </div>
                <div class="last" @click="moreSubComments(comment.id)">
                    <span class="click_name">更多回复</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { defineProps, defineEmits } from 'vue';

let props = defineProps({
    comment: Object
})

let emits = defineEmits("sub-comments")

function moreSubComments (id) {
    emits('sub-comments', id)
}

function like (id) {
    console.log("like")
}





</script>

<style scoped lang="scss">
//.app {
//    display: flex;
//    .left {
//        width: 3.5em;
//        margin: 20px;
//    }
//    .right {
//        margin: 0.5rem;
//        width: 100%;
//        .user {
//            margin: 1rem 0 0.3rem 0;
//            font-size: 1.2rem;
//        }
//        .note {
//            color: #8a919f;
//        }
//        .content {
//            margin: 1em 0em;
//            font-size: 0.8em;
//            color: #515767;
//        }
//        .actions {
//            width: 20%;
//            display: flex;
//            font-size: 1.5em;
//            justify-content: space-between;
//        }
//        .sub_comments {
//            // background-color: #f4f5f5;
//            background-color: rgba(247, 248, 250, 0.7);
//            width: 90%;
//            margin-top: 0.3rem;
//            .sub {
//                padding: 0.5rem 0.5rem 0 0.5rem;
//            }
//            .last {
//                padding: 0.5rem 0.5rem 0.5rem 0.5rem;
//            }
//        }
//    }
//}
//
//.click_name {
//    color: #0681d0;
//}
//
//.iconfont- {
//    font-size: 30px;
//}


</style>