<template>
    <div class="title">{{video.name}}</div>
    <div class="detail">{{video.brief}}</div>

    <div class="eps_list">
        <div class="eps" v-for="eps in video.episodes">{{ eps.name }}</div>
        <div class="eps" >第二季</div>
        <div class="eps" >第二季</div>
        <div class="eps" >第二季</div>
        <div class="eps" >第二季</div>
        <div class="eps" >第二季</div>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
  videoId: Number,
  video: Object
})

</script>

<style scoped lang="scss">
.title {
    font-size: 15px;
    margin: 20px 20px;
}
.detail {
    font-size: 12px;
    margin: 20px 20px;
}
.eps_list {
    display: flex; //flex布局
    flex-shrink: 0; // 收缩比例
    white-space: nowrap; // 规定段落中的文本不进行换行
    overflow-x: auto; // 横向溢出元素的内容区域添加滚动
    margin: 0 1rem;
    bottom: -10rem;
    &::-webkit-scrollbar { width: 0 !important }
    .eps {
        margin: 10px;
        // border: 3px solid white;
        border-radius: 5px;
        padding: 10px;
        outline: .1rem solid #ccc;
        outline-offset: -1px;
        &:hover {
            outline: .2rem solid #5aa5d3;
            color:#5aa5d3;
            }
        
    }
}

</style>