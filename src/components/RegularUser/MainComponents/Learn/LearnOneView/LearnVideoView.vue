<template>
  <el-row>
    <el-col :span="8">
      <el-breadcrumb separator=">>">
        <el-breadcrumb-item>
          <el-button icon="back" type="text" @click="back">返回</el-button>
        </el-breadcrumb-item>
        <el-breadcrumb-item style="padding-top:8px"><el-text size="small">视频学习</el-text></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="8">
        <el-row>
          <el-col :span="24">
            <el-text style="font-size: 13px">学习时长</el-text>
            <el-icon style="font-size: 13px; color: #409EFF"><Timer /></el-icon>
            <el-text style="font-size: 15px">{{ store.timeStr }}</el-text>
          </el-col>
        </el-row>
    </el-col>
    <el-col :span="8">
    </el-col>
  </el-row>

  <div>
<!--    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">-->
<!--      <el-tab-pane label="User" name="first">-->
<!--        <VideoGrid />-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="Config" name="second">-->
<!--        <VideoGrid/>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="Role" name="third">-->
<!--        <VideoGrid/>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="Task" name="fourth">-->
<!--        <VideoGrid/>-->
<!--      </el-tab-pane>-->
<!--    </el-tabs>-->
    <VideoGrid :subject="props.subject"/>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import VideoGrid from "@/components/RegularUser/MainComponents/Learn/LearnOneView/VideoGrid.vue";
import {useUserStore} from "@/stores/state";

const emit = defineEmits(["event1"])
const props = defineProps(["subject"]) // 从父组件获取数据:当前学科
const store = useUserStore()
const back = () =>{
  emit('event1','8')
  store.showChapter=true
  store.showVideo=false
  store.getStudentInfo().learnTime += store.timeToMinute
  store.reset()
}
onMounted(() => {
  console.log("LearnVideoView mounted")
})
</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
