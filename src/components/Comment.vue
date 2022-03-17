<template>
    <div class="app">
        <div class="left">
            <van-image fit="cover" width="3.5em" round :src="avatar" />
        </div>

        <div class="right">
            <div class="head">
                <span>张三</span>
            </div>

            <div class="content">{{ content }}</div>
            <div class="actions">
                <van-icon name="thumb-circle-o" />
                <van-icon name="share-o" />
                <van-icon name="comment-o" />
            </div>
            <div class="sub_comments">
                <div v-for="comment in subComments" class="sub_comment">
                    {{comment.name}}:{{comment.content}}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const avatar = "https://p9-passport.byteacctimg.com/img/user-avatar/8b472f29b528ad097a78d288ef895900~300x300.image"

const content = "我觉得不行我觉得不行我觉得不行我觉得不行我觉得不行我觉得不行我觉得不行"

const subComments = [{ name: "李四", content: "123456" }, { name: "李四", content: "123456" }]

</script>

<style scoped lang="scss">
.app {
    display: flex;
    .left {
        width: 3.5em;
        margin: 20px;
    }
    .right {
        margin: 1em;
        .head {
            margin: 1em 0em;
        }
        .content {
            margin: 1em 0em;
        }
        .actions {
            width: 30%;
            display: flex;
            font-size: 1.5em;
            justify-content: space-between;
        }
        .sub_comments {
            background-color: rgb(221, 216, 216);
            margin-top: 1.5em;
            width: 90%;
            .sub_comment {

            }
        }
    }
}

.click_name {
    
}
</style>