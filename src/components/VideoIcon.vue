
<template>

  <div class="flex flex-col">

    <van-icon v-if="state" size="30" color="#60A5FA" :name="iconName" />
    <van-icon v-else size="30" color="#9CA3AF" :name="iconName" />
    <div class="h-5"></div>
    <div>{{ name }}</div>
  </div>
</template>

<script setup>
let props = defineProps({
  name: String,
  state: Boolean,
  iconName: String,
})

</script>