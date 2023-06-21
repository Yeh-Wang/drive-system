<template>
  <el-row class="video-layout">
    <el-space wrap :size="20">
      <el-col v-for="i in 10">
        <el-card style="width: 200px;height: 200px;background-color: #2c3e50">

        </el-card>
      </el-col>
    </el-space>
  </el-row>
</template>
<script setup lang="ts">

const props = defineProps(['subject']) // 从父组件获取数据:当前学科
</script>
<style scoped>
.video-layout {
  margin-top: 50px;
  margin-left: 100px;
}
</style>
