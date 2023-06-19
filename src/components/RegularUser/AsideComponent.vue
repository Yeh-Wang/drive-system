<template>
  <el-menu
      default-active="1"
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
      <span>学习与考试统计</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import {Document, Setting} from "@element-plus/icons-vue";

const emit = defineEmits(["event"])
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
