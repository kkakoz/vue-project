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

            <div class="content">{{ comment.content }}</div>
            <div class="actions">
                <i class="icon iconfont icon-zantong" @click="like(comment.id)"></i>
                <i class="icon iconfont icon-xinxi" @click="like(comment.id)"></i>
            </div>
            <div class="sub_comments" v-if="comment.subComments.length > 0">
                <div v-for="comment in comment.subComments" class="sub">
                    <span class="click_name">{{ comment.name }}</span>
                    <span v-if="comment.targetId">
                        &nbsp;回复&nbsp;
                        <span class="click_name">{{ comment.targetName }}</span>
                    </span>
                    :{{ comment.content }}
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
.app {
    display: flex;
    .left {
        width: 3.5em;
        margin: 20px;
    }
    .right {
        margin: 0.5rem;
        width: 100%;
        .user {
            margin: 1rem 0 0.3rem 0;
            font-size: 1.2rem;
        }
        .note {
            color: #8a919f;
        }
        .content {
            margin: 1em 0em;
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
            width: 90%;
            margin-top: 0.3rem;
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

.iconfont- {
    font-size: 30px;
}


</style>