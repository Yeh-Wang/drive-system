<template>
  <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      @select="handleSelect"
  >
    <br>
    <br>
    <el-menu-item index="1">
      <span>介绍</span>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><document /></el-icon>
      <span>学习</span>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><setting /></el-icon>
      <span>预约考试</span>
    </el-menu-item>
    <el-menu-item index="4">
      <span>考试</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import {Document, Setting} from "@element-plus/icons-vue";
import {ref} from "vue";

const emit = defineEmits(["event"])
const props = defineProps(["subject"]) // 从父组件获取数据:当前学科
const defaultActive = ref("1")
const handleSelect = (key: string, keyPath: string[]) => {
  if(key == "1"){
    emit("event", "1")
  }else if(key == "2"){
    emit("event", "2")
  }else if(key == "3"){
    emit("event", "3")
  }else if(key == "4"){
    emit("event", "4")
  }
}

</script>

<style scoped>

</style>
