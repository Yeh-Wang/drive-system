<template>
  <el-row>
    <el-col :span="8">
  <el-breadcrumb separator="/">
    <el-breadcrumb-item>
      <el-button icon="back" type="text" @click="back">返回</el-button>
    </el-breadcrumb-item>
    <el-breadcrumb-item style="padding-top:8px"><el-text size="small">试题学习</el-text></el-breadcrumb-item>
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
    <QuestionGrid :subject="props.subject"/>
  </div>
</template>

<script setup lang="ts">
import QuestionGrid from "@/components/RegularUser/MainComponents/Learn/LearnOneView/QuestionGrid.vue";
import {useUserStore} from "@/stores/state";

const emit = defineEmits(["event2"])
const props = defineProps(["subject"]) // 从父组件获取数据:当前学科
const store = useUserStore()

const back = () =>{
  emit('event2','5')
  store.showQuestion=true
  store.stop()
  store.getStudentInfo().learnTime += store.timeToMinute
  store.reset()
}
</script>

<style scoped>

</style>
