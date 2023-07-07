<script setup lang="ts">

import RegularUser from "@/views/RegularUser.vue";
import {useUserStore} from "@/stores/state";

if(sessionStorage.getItem("userId")){
  useUserStore().userId = sessionStorage.getItem("userId")
}
if (sessionStorage.getItem("studentInfo")){
  useUserStore().setStudentInfo(JSON.parse(sessionStorage.getItem("studentInfo")!))
}
if (sessionStorage.getItem("userInfo")){
  useUserStore().setUserInfo(JSON.parse(sessionStorage.getItem("userInfo")))
}

window.addEventListener('beforeunload',()=>{
  sessionStorage.setItem("userId",JSON.stringify(useUserStore().userId))
  sessionStorage.setItem("studentInfo",JSON.stringify(useUserStore().getStudentInfo()))
  sessionStorage.setItem("userInfo",JSON.stringify(useUserStore().getUserInfo()))
})
</script>

<template>
  <div id="app">
    <RouterView />
<!--    <RegularUser />-->
  </div>
</template>

<style scoped>
html,body,#app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  position: fixed;
  font-family: 'Helvetica Neue', Helvetica, Avenir, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
