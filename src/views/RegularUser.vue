<template>
  <div class="common-layout">
    <el-container style="width: 100%;height: 100%;">
      <el-header>
        <el-row style="width: 100%;height: 100%;margin: 0 -8px auto;padding: 0;">
          <el-col :span="6" class="left-header">hello</el-col>
          <el-col :span="10" class="middle-header">
            <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                :ellipsis="false"
                @select="handleSelect"
            >
              <el-menu-item index="1" style="margin-left: 100px">科目一</el-menu-item>
              <el-menu-item index="2" style="margin-left: 40px">科目二</el-menu-item>
              <el-menu-item index="3" style="margin-left: 40px">科目三</el-menu-item>
              <el-menu-item index="4" style="margin-left: 40px">科目四</el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="8" class="right-header">
            <el-row style="margin-left: 150px">
              <p style="margin-top: 30px">dear,{{ userId }}</p>
              <el-avatar style="margin-left: 10px;margin-top: 15px" size="default" src="src/assets/power.svg"/>
            </el-row>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <AsideComponent :key="new Date().getTime()" :subject="subjectType" @event="changeAside"/>
        </el-aside>
        <el-main>
          <router-view :subject="subjectType"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import AsideComponent from "@/components/RegularUser/AsideComponent.vue";
import router from "@/router";
import {useAppStore, useUserStore} from "@/stores/state";
import {reactive} from "vue-demi";
import {request} from "@/utils/request";
import {getCookie} from "@/utils/cookie";

const appStore = useAppStore()

// <!-- 导航栏组件 -->
const activeIndex = ref('1')
const subjectType = ref('1')
const introduceRouter = ref('introduceOne')
const learnRouter = ref('learnOne')

defineProps(["subject"])
const store = useUserStore()

const userId = getCookie("userId")
const handleSelect = (key: string, keyPath: string[]) => {
  subjectType.value= key
  router.push({path: '/regularUser'})
  if(key == "1"){
    introduceRouter.value = "introduceOne"
    learnRouter.value = "learnOne"
  }else if(key == "2"){
    introduceRouter.value = "introduceTwo"
    learnRouter.value = "learnTwo"
  } else if(key == "3"){
    introduceRouter.value = "introduceTwo"
    learnRouter.value = "learnOne"
  } else if(key == "4"){
    introduceRouter.value = "introduceOne"
    learnRouter.value = "learnOne"
  }
}

// <!-- 侧边栏组件 -->
const changeAside = (aside_index: string) => {
  if(aside_index == "1"){
    router.push({path: '/regularUser/'+introduceRouter.value})
  }else if (aside_index == "2"){
    router.push({path: '/regularUser/'+learnRouter.value})
  }else if (aside_index == "3"){
    router.push({path: '/regularUser/bookExam/'+subjectType.value})
  }else if (aside_index == "4"){
  }
}
// <!-- 主体组件 -->
const userName = ref('YehWang')

// const questionList:questionInfo[] = reactive([])
// onMounted(()=>{
//   request.get("/driveservice/question/generateExercise1").then((res)=>{
//     questionList.push(...res.data.data.objects1)
//     console.log(questionList)
//   })
// })

</script>

<style scoped>
.common-layout {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: -8px;
  //background-color: aqua;
  position: fixed;
}
</style>
