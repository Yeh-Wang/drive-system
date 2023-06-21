<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item>
      <el-button icon="back" type="text" @click="emit('event2','5')">返回</el-button>
    </el-breadcrumb-item>
    <el-breadcrumb-item style="padding-top:8px"><el-text size="small">试题学习</el-text></el-breadcrumb-item>
  </el-breadcrumb>
  <div>
    <QuestionGrid :subject="props.subject"/>
  </div>
</template>

<script setup lang="ts">
import QuestionGrid from "@/components/RegularUser/MainComponents/Learn/LearnOneView/QuestionGrid.vue";

const emit = defineEmits(["event2"])
const props = defineProps(["subject"]) // 从父组件获取数据:当前学科

</script>

<style scoped>

</style>
