<template>
  <div>
    <el-button icon="back" type="text" @click="playVideo">返回</el-button>
  </div>
  <el-row class="video-layout">
    <el-space wrap :size="20">
      <el-col v-for="i in 10">
        <el-card style="width: 200px;height: 200px;background-color: #2c3e50">

        </el-card>
      </el-col>
    </el-space>
  </el-row>

  <!--  预览视频窗口-->
  <el-dialog v-model="videoDialog" :title="videoOptions.title" align-center>
    <!--    <vue3VideoPlay-->
    <!--        id="videoInfo"-->
    <!--        v-bind="videoOptions"-->
    <!--        @pause="onPause"-->
    <!--        @timeupdate="onTimeupdate"-->
    <!--    />-->
    <videoPlayer id="prismPlayer" />
  </el-dialog>
</template>
<script setup lang="ts">

import {onMounted, ref} from "vue";
import VideoPlayer from "@/components/RegularUser/MainComponents/Learn/LearnOneView/VideoPlayer.vue";

const props = defineProps(['subject']) // 从父组件获取数据:当前学科

const currentVideoSrc = ref("")
const currentVideoName = ref("")
const currentVideoTime = ref(0)
const playVideo = () => {
  videoDialog.value = true
  // videoOptions.value.title = "测试视频"
  // videoOptions.value.src = "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"

  new Aliplayer({
        id: "prismPlayer",
        vid: "712adc20129771eebe086723b78e0102",//视频 id
        playauth: "eyJTZWN1cml0eVRva2VuIjoiQ0FJU2h3TjFxNkZ0NUIyeWZTaklyNWJXY3QvdW5xdFE1cUd2VTBmY3FHWVJaZXBIdUliYmp6ejJJSHBLZVhkdUFlQVhzL28wbW1oWjcvWVlsck1xRU1ZYUZSR2JNSkVwdDhRS29GL3dKcExGc3QySjZyOEpqc1ZsOWRBbjhrZXBzdlhKYXNEVkVmbDJFNVhFTWlJUi8wMGU2TC8rY2lyWXBUWEhWYlNDbFo5Z2FQa09Rd0M4ZGtBb0xkeEtKd3hrMnQxNFVtWFdPYVNDUHdMU2htUEJMVXhtdldnR2wyUnp1NHV5M3ZPZDVoZlpwMXI4eE80YXhlTDBQb1AyVjgxbExacGxlc3FwM0k0U2M3YmFnaFpVNGdscjhxbHg3c3BCNVN5Vmt0eVdHVWhKL3phTElvaXQ3TnBqZmlCMGVvUUFQb3BGcC9YNmp2QWF3UExVbTliWXhncGhCOFIrWGo3RFpZYXV4N0d6ZW9XVE84MCthS3p3TmxuVXo5bUxMZU9WaVE0L1ptOEJQdzQ0RUxoSWFGMElVRXh6RVcrRmV2TC9wZ21RUGwvK0ZKTG9pdjltamNCSHFIeno1c2VQS2xTMVJMR1U3RDBWSUpkVWJUbHpiVUJMZ3pLNUl2NWJMVmNTS3dJK1YreVBNYXgzYlFGRHI1M3ZzVGJiWHpaYjBtcHR1UG56ZHdKNFRXYnJna2VVR29BQlNZanFyTjhqa205ZDMzRDJFbmwyZjhPZElRUldiY3BLRVVIWmErS2JaVUF4OEpya051aFZ4TVNJQnZ1RjVjenZJSnhweUJhYUxjWFlMTFNZK0pobjV6YUdIZk9EdTJueUJhbDJhY0VKMHhGcDNXaDFaazJrdFU5QjdkMVNqZ0RGSnh2S1l4OUV0R3NNUEVFZHdhc25lQkxxMkh1RnM2SDRmRmJIU3J0S0JSUT0iLCJBdXRoSW5mbyI6IntcIkNJXCI6XCJoMUN4b2JBdnhURHMyVUt6U2s4TnVpNlVBMzRFdkVoTHhzWmFMRWEzL0pLbFdPNkdVQXVVU0dMeXJaYzRRTGxHXCIsXCJDYWxsZXJcIjpcInJoVHMyTGJKVWdUZmRZdlE0Skd3blBOOC8yYVM2Q05BdlhZMXliVC9uUGc9XCIsXCJFeHBpcmVUaW1lXCI6XCIyMDIzLTA3LTAzVDEwOjQ4OjUyWlwiLFwiTWVkaWFJZFwiOlwiNzEyYWRjMjAxMjk3NzFlZWJlMDg2NzIzYjc4ZTAxMDJcIixcIlNpZ25hdHVyZVwiOlwiRkFFbHAvUnY2a0g0dkx6Y1BJb21DSzh4RXFNPVwifSIsIlZpZGVvTWV0YSI6eyJTdGF0dXMiOiJOb3JtYWwiLCJWaWRlb0lkIjoiNzEyYWRjMjAxMjk3NzFlZWJlMDg2NzIzYjc4ZTAxMDIiLCJUaXRsZSI6IjYgLSBXaGF0IElmIEkgV2FudCB0byBNb3ZlIEZhc3RlciIsIkNvdmVyVVJMIjoiaHR0cDovL291dGluLTlhZDYyZTQzOWZiODExZWQ4NDc2MDAxNjNlMDYxMjNjLm9zcy1jbi1zaGFuZ2hhaS5hbGl5dW5jcy5jb20vNzEyYWRjMjAxMjk3NzFlZWJlMDg2NzIzYjc4ZTAxMDIvc25hcHNob3RzL2Q1MmFjNThhZWQ1YzRlNWRiOTRjMGNkZWVhMzI0MDliLTAwMDAxLmpwZz9FeHBpcmVzPTE2ODgzODQ4MzImT1NTQWNjZXNzS2V5SWQ9TFRBSXdrS1NMY1VmSTJ1NCZTaWduYXR1cmU9d0xrTzR2bGIyZExTUlZ0WjUyR0haTWtsajZBJTNEIiwiRHVyYXRpb24iOjE2LjI3Njd9LCJBY2Nlc3NLZXlJZCI6IlNUUy5OVWM5ZVpzdHFRY0RRYW1MZkRpZWtXQ3BtIiwiQWNjZXNzS2V5U2VjcmV0IjoiSEFmWjg0c3dUY3pWN1VGeFVKcFhWV3oyRHVKWFlKNXliS2h2VEVWcEJLVlkiLCJSZWdpb24iOiJjbi1zaGFuZ2hhaSIsIkN1c3RvbWVySWQiOjEzMTc4NTc1MjExODU5NDl9",//播放凭证
        width: "1000", height: "50apx"
      }, function (player) {
        console.log("播放器创建成功")
      }
  )
}

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
  autoPlay: false, //自动播放
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

onMounted(() => {
})

const onPause = (ev) => {
  onTimeupdate(ev)
  console.log(ev.target)
  console.log(videoOptions.value.currentTime)
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
</style>
