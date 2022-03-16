<template>
    <div class="title">我也不知道</div>
    <div class="detail">dnsoaodjsi我按等级soda</div>
    <div class="eps_list">
        <div class="eps" v-for="eps in list">{{ eps }}</div>
    </div>
</template>

<script setup>
let list = ["第一集", "第二集", "第一集", "第一集", "第一集", "第一集", "第一集"]
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
    justify-content: space-between; // 位于首尾两端的子容器两端对齐
    flex-shrink: 0; // 收缩比例
    white-space: nowrap; // 规定段落中的文本不进行换行
    overflow-x: auto; // 横向溢出元素的内容区域添加滚动
    .eps {
        margin: 10px;
        border: 3px solid white;
        border-radius: 5px;
        padding: 10px;
    }
}
</style>