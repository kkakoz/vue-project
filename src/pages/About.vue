<template>
  <div>about page</div>
  <button @click="toHome">toHome</button>
  <Tabbar></Tabbar>
</template>

<script setup>
import Tabbar from '../components/Tabbar.vue';
import {useRouter} from "vue-router";
let router = useRouter()
const toHome = () => {
  router.push('/');
};
</script>

