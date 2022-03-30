<template>
    <div class="user">
        <van-image
  width="100"
  height="100"
  src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg"
/>
        <div class="username">{{user.name}}</div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    user: Object
})

console.log("user = ", props.user)
</script>

<style scoped lang="scss">
.user{
    text-align: center;
    img{

    }
    .username {

    }
}
</style>