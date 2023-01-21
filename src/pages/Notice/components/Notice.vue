<template>
  <div class="flex flex-row justify-between m-3" @click="toUser(user.id)">
    <div class="flex flex-row">
      <van-image
          width="11vw"
          height="11vw"
          round
          :src="user.avatar"
      />
      <div class="flex flex-col  pl-2">
        <div class="text-2xl">{{ user.name }}</div>
        <div>{{ notice.content }}</div>
      </div>
    </div>

  </div>
</template>

<script setup>
import {defineProps, reactive, ref, toRefs, watch} from 'vue';
import {followApi} from '@/api/user'
import {useRouter} from "vue-router";
import {readAllApi} from "@/api/notice";

let router = useRouter()
import {
  Toast
} from 'vant';



const props = defineProps({
  notice: Object,
})

const user = ref(props.notice.fromUser)

const toUser = (userId) => {
  router.push(`/user/${userId}`)
}

readAllApi().then(()=> {

}).catch((err)=> {

})


</script>

