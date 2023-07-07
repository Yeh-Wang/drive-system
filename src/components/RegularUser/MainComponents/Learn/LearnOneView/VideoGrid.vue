<template>
<!--  <div>-->
<!--    <el-button icon="back" type="text" @click="playVideo">返回</el-button>-->
<!--  </div>-->
  <el-row v-show="store.showChapter" class="video-layout">
    <el-space wrap :size="20">
      <el-col v-for="(item,index) in chapterList.chapter">
        <el-card style="width: 200px;height: 200px;background-color: #d5dde1">
          <div style="margin-top: 20px">
            <span>chapter: <br>{{ item.chapterName }}</span>
          </div>
          <div class="bottom">
            <el-button type="primary" @click="learnVide(item.id)">More</el-button>
          </div>
        </el-card>
      </el-col>
    </el-space>
  </el-row>
  <el-row v-show="store.showVideo" class="video-layout">
    <el-space wrap :size="20">
      <el-col v-for="(item,index) in videoList">
        <el-card style="width: 200px;height: 200px;background-color: #617a91">
          <div style="margin-top: 20px">
            <span>video: <br>{{ index }}</span>
          </div>
          <div class="bottom">
            <el-button type="success" @click="playVideo(item.value)">播放</el-button>
          </div>
        </el-card>
      </el-col>
    </el-space>
  </el-row>

  <!--  预览视频窗口-->
  <el-dialog v-model="videoDialog" :title="videoOptions.title" align-center>
        <vue3VideoPlay
            id="videoInfo"
            v-bind="videoOptions"
            @play="onPlay"
            @pause="onPause"
            @timeupdate="onTimeupdate"
        />

  </el-dialog>
</template>
<script setup lang="ts">

import {onMounted, ref,reactive} from "vue";
import {request} from "@/utils/request";
import type {videoInfo} from "@/utils/data-entity";
import {useUserStore} from "@/stores/state";

const props = defineProps(['subject']) // 从父组件获取数据:当前学科
const store = useUserStore()


const currentVideoSrc = ref("")
const currentVideoName = ref("")
const currentVideoTime = ref(0)
const playVideo = (url:string) => {
  videoDialog.value = true
  // videoOptions.value.title = "测试视频"
  // videoOptions.value.src = "https://outin-9ad62e439fb811ed847600163e06123c.oss-cn-shanghai.aliyuncs.com/sv/79e13cb-188edb492bc/79e13cb-188edb492bc.mp4?Expires=1688392704&OSSAccessKeyId=LTAIwkKSLcUfI2u4&Signature=hPwi3v%2B2z%2ByhuVwFwTrNQUyQJLM%3D"
  videoOptions.value.src = url
}
const learnVide = (id:string)=>{
  store.showChapter = false
  store.showVideo = true
  chapterList.value.chapter.filter(item=>item.id==id).forEach(item=> {
    videoList.splice(0,videoList.length)
    videoList.push(...item.videoPlayAuth)
  })
}

const videoList:videoInfo[] = reactive([])

const nowVideoName = ref("")
const videoDialog = ref(false)
const videoOptions = ref({
  width: "100%", //播放器宽度
  height: "100%", //播放器高度
  color: "#409eff", //主题色
  title: "", //视频名称
  src: "",//视频源
  muted: false, //静音
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: true, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制
  currentTime: ref(0),
  controlBtns: [
    "audioTrack",
    "quality",
    "speedRate",
    "volume",
    "setting",
    "pip",
    "pageFullScreen",
    "fullScreen",
  ], //显示所有按钮,
})

const chapterList = ref({
  chapter:[{
    id: "",
    chapterName: "",
    videoPlayAuth: [
      {
        key: "",             //视频key
        value: "",           //视频value
      }]
  }]
})

onMounted(() => {
  request.get("/driveservice/chapter/getChapterAndVideo/"+props.subject).then(res=>{
    chapterList.value.chapter.splice(0,chapterList.value.chapter.length)
    chapterList.value.chapter=res.data.data.objects
  })
})

const onPause = (ev) => {
  onTimeupdate(ev)
  store.stop()
  // console.log(ev.target)
  // console.log(videoOptions.value.currentTime)
};
const onPlay = (ev) => {
  store.start()
};
const onTimeupdate = (ev) => {
  videoOptions.value.currentTime = Math.floor(ev.target.currentTime);
};
</script>
<style scoped>
.video-layout {
  margin-top: 50px;
  margin-left: 100px;
}

.bottom {
  margin-top: 70px;
  line-height: 15px;
  display: flex;
  margin-left: 32%;
  justify-content: space-between;
  align-items: center;
}
</style>
