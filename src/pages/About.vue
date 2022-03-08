<template>
  <div>about page</div>
  <button @click="toHome">toHome</button>
  <Tabbar></Tabbar>
</template>

<script setup>
import router from '../routes';
import Tabbar from '../components/Tabbar.vue';

const toHome = () => {
  router.push('/');
};
</script>

