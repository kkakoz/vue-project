<template>
  <div class="flex flex-row">
    <van-image round src="https://unpkg.com/@vant/assets/cat.jpeg" />
    <div class="flex flex-col">
      <div class="flex flex-row">
        粉丝
        关注
        获赞
      </div>
      <div>关注</div>
    </div>
  </div>

  <div>
    用户名
  </div>
  <van-tabs  v-model:active="active">
  <van-tab title="动态">

  </van-tab>
    <van-tab title="投稿">

    </van-tab>
  </van-tabs>


</template>


<script setup>



</script>