<style  lang="scss" scoped>
.video {
  padding: 2vw 3vw;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 3vw;
  .video-item {
    width: 45vw;
    .video-item-title {
      font-size: 4vw;
      margin-top: 2vw;
      line-height: 4vw;
      overflow:hidden;
      text-overflow:ellipsis;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;
    }
  }
  .video-item-pic{
    display: grid;
  }
  .video-item-pic  {
    img {
      grid-area: 1/1/1/1;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 3px;
    }
    span {
      grid-area: 1/1/1/1;
      align-self: end;
      width: 100%;
      object-fit: cover;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      i {
        margin-right: 1.5vw;
      }
      padding: .5vw .5vw;
    }

    display: grid;
  }
}
</style>



<template>
  <ul class="video">

    <li class="video-item">
      <div class="video-item-pic">
        <img src="https://tx-free-imgs.acfun.cn/newUpload/56337105_cdad4982f28c4cddaa7e3ab4a506ae94.png?imageslim&imageView2/1/w/375/h/211/format/webp"/>
        <span>
            <i><van-icon name="tv-o"/>33</i>
            <i><van-icon name="comment-o"/>55</i>
          </span>
      </div>
      <h3 class="video-item-title">测试标题测试标题测试标题dhis oahfisop jadp sjai pdjsiaod</h3>
    </li>
    <li class="video-item">
      <div class="video-item-pic">
        <img src="https://tx-free-imgs.acfun.cn/newUpload/56337105_cdad4982f28c4cddaa7e3ab4a506ae94.png?imageslim&imageView2/1/w/375/h/211/format/webp"/>
        <span>
            <i><van-icon name="tv-o"/>33</i>
            <i><van-icon name="comment-o"/>55</i>
          </span>
      </div>
      <h3 class="video-item-title">测试标dhis oahfi sopja dps jaip djsiaod题</h3>
    </li>
    <li class="video-item">
      <div class="video-item-pic">
        <img src="https://tx-free-imgs.acfun.cn/newUpload/56337105_cdad4982f28c4cddaa7e3ab4a506ae94.png?imageslim&imageView2/1/w/375/h/211/format/webp"/>
        <span>
            <i><van-icon name="tv-o"/>33</i>
            <i><van-icon name="comment-o"/>55</i>
          </span>
      </div>
      <h3 class="video-item-title">测试标题</h3>
    </li>
  </ul>
</template>

<script setup>
import VideoItem from './video-item.vue'
import {ref, reactive, defineProps} from 'vue';
import {getVideos} from '@/api/video';

const props = defineProps({
  categoryId: Number
})

let lastId = 0
let finished = ref(false)
let loading = ref(false)
const videoList = reactive({list: []})

for (let i = 0; i < 11; i++ ){
  getVideos({category_id: props.categoryId, last_value: lastId}).then(res => {
    var videos = res.data
    videos.forEach(element => {
      videoList.list.push(element)
    });
    if (videos.length > 0) {
      console.log("is loading")
      loading.value = false;
      lastId = videos[videos.length - 1].id
    } else {
      console.log("is finshed")
      finished.value = true;
    }
  })
}

const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  getVideos({category_id: props.categoryId, last_value: lastId}).then(res => {
    var videos = res.data
    videos.forEach(element => {
      videoList.list.push(element)
    });
    if (videos.length > 0) {
      console.log("is loading")
      loading.value = false;
      lastId = videos[videos.length - 1].id
    } else {
      console.log("is finshed")
      finished.value = true;
    }
  })
  // setTimeout(() => {
  //   for (let i = 0; i < 10; i++) {
  //     list.value.push(list.value.length + 1);
  //   }

  //   // 加载状态结束
  //   loading.value = false;

  //   // 数据全部加载完成
  //   if (list.value.length >= 40) {
  //     finished.value = true;
  //   }
  // }, 1000);
};


</script>

