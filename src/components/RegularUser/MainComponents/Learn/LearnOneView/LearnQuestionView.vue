<script setup lang="ts">
const emit = defineEmits(["event2"])

</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item>
      <el-button icon="back" type="text" @click="$emit('event2','5')">返回</el-button>
    </el-breadcrumb-item>
    <el-breadcrumb-item style="padding-top:8px"><el-text size="small">视频学习</el-text></el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped>

</style>
