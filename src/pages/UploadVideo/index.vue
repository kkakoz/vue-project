<template>
  <van-nav-bar title="添加视频" left-arrow fixed="true" @click-left="goBack" placeholder/>

  <van-form @submit="onSubmit">

    <van-cell-group inset>
      <van-field
          v-model="video.name"
          name="名称"
          label="名称"
          placeholder="名称"
          :rules="[{ required: true, message: '名称' }]"
      />
    </van-cell-group>
    <van-cell-group inset>
      <van-field
          v-model="video.brief"
          name="视频简介"
          label="视频简介"
          placeholder="视频简介"
          :rules="[{ required: true, message: '视频简介' }]"
      />
    </van-cell-group>

    <van-cell-group inset>
      <van-field
          v-model="categoryName"
          is-link
          readonly
          label="分组"
          placeholder="请选择分组"
          @click="showCategory = true"
      />
      <van-popup v-model:show="showCategory" round position="bottom">
        <van-cascader
            v-model="video.categoryId"
            title="请选择分组"
            :options="categories"
            @close="showCategory = false"
            @finish="finishChose"
        />
      </van-popup>
    </van-cell-group>

    <van-cell-group inset>
      <van-uploader v-model="resources" type="file" accept="video/*" :after-read="uploadVideo"/>
    </van-cell-group>


    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<script setup>

// 上传video
import {uploadVideoApi} from "@/api/video";
import {getCategories} from "@/api/home";
import {reactive, ref} from "vue";
import {oss, put} from '@/api/oss';
import {getUuid} from "@/utils/date";
import {useRouter} from "vue-router";
import {Toast} from "vant";

let router = useRouter()

const categories = ref([])
const showCategory = ref(false)
const categoryName = ref("")

getCategories().then((res) => {
  console.log(res)
  res.data.forEach(element => {
    categories.value.push({
      text: element.name,
      value: element.id,
    })
  });
}).catch((err) => {
  console.log("err = ", err)
})

const finishChose = (data) => {
  showCategory.value = false;
  categoryName.value = data.selectedOptions[0].text
}

const video = reactive({
  name: '',
  type: 1,
  brief: '',
  categoryId: 0,
  duration: 0,
  resources: [],
})

const resources = ref([])

const onSubmit = () => {
  console.log("resources = ", resources.value)
  if (video.resources.length !== resources.value.length) {
    Toast.success("请等待视频上传完成后提交")
    return
  }
  uploadVideoApi(video).then((res) => {
    Toast.success("上传成功")
    router.push("/")
  }).catch((e)=> {
    Toast.fail("上传失败")
  })
}

const filepath = getUuid()

let fileIndex = 0

const uploadVideo = async (action) => {
  action.status = 'uploading';
  action.message = '上传中...';
  if (action.file.size > 100 * 1024 * 1024) {
    Toast.error("请上传100mb以内文件")
  }
  if (action.file.name.indexOf("mp4") == -1) {
    Toast.error("请上传mp4类型文件")
  }
  let binaryData = [];
  // 传入file
  binaryData.push(action.file);
  //获取视频或者音频时长
  let fileurl = URL.createObjectURL(new Blob(binaryData, {type: "application/zip"}));
  //经测试，发现audio也可获取视频的时长
  let audioElement = new Audio(fileurl);
  let duration;
  let curIndex = fileIndex;
  fileIndex++;
  audioElement.addEventListener("loadedmetadata", async (_event) => {
    duration = parseInt(audioElement.duration);
    console.log("视频的时长为:", duration);//单位：秒
    try {

      let res = await put(`${filepath}/video${curIndex}`, action.file)
      console.log("put res = ", res)
      video.resources.push({url: res.url, name: "第一集", duration: duration})
      action.status = 'done';
      action.message = '上传成功';
      // await uploadVideoApi(video)
    } catch (e) {
      action.status = 'failed';
      action.message = '失败';
      Toast.error("上传失败")
    }
  })

}


const goBack = () => {
  router.push("/")
}


</script>