<template>
    <div class="app">
        <div class="left">
            <van-image fit="cover" width="3.5rem" round :src="comment.avatar" />
        </div>
        <div class="right">
            <div class="user">
                <span>{{ comment.username }}</span>
            </div>
            <div class="time">
                <span class="note">昨天</span>
            </div>

            <div class="content">{{ content }}</div>
            <div class="actions">
                <i class="icon iconfont icon-zantong" @click="like(comment.id)"></i>
                <i class="icon iconfont icon-xinxi" @click="like(comment.id)"></i>
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
function moreSubComments(id) {
    emits('sub-comments', id)
}

console.log(props.comment)

const avatar = "https://p9-passport.byteacctimg.com/img/user-avatar/8b472f29b528ad097a78d288ef895900~300x300.image"

const content = "我觉得不行我觉得不行我觉得不行我觉得不行我觉得不行我觉得不行我觉得不行"

const subComments = [
    { id: "1", name: "李四", content: "123456", targetId: 2, targetName: "王五" },
    { id: "2", name: "李四", content: "123456", targetId: 0, targetName: "" }]
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

.click_name {
    color: #0681d0;
}

.van-divider--hairline {
    margin: 4px 0;
}
</style>