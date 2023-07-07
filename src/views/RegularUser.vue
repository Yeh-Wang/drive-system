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
              <el-menu-item index="1" style="margin-left: 100px" :disabled="typeOne">科目一</el-menu-item>
              <el-menu-item index="2" style="margin-left: 40px" :disabled="typeTwo">科目二</el-menu-item>
              <el-menu-item index="3" style="margin-left: 40px" :disabled="typeThree">科目三</el-menu-item>
              <el-menu-item index="4" style="margin-left: 40px" :disabled="typeFour">科目四</el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="8" class="right-header">
            <el-row style="margin-left: 150px">
              <span style="margin-top: 30px">dear, </span>
              <el-link style="margin-left: 10px;margin-top: 15px" type="primary" @click="updateInfo">{{
                  userInfo.name
                }}
              </el-link>
              <el-upload
                  v-model:file-list="fileList"
                  class="upload-demo"
                  :show-file-list="false"
                  :http-request="upload"
                  :limit="1"
              >
              <el-avatar style="margin-left: 10px;margin-top: 15px" size="default" :src="userInfo.avatar" />
              </el-upload>
              <el-button style="margin-left: 40px;margin-top: 15px" icon="Smoking" type="danger" @click="logout">Logout</el-button>
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

  <el-dialog v-model="showUpdateInfo" center width="400">
    <el-form v-model="userInfo">
      <el-form-item label="姓名">
        <el-input v-model="userInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="userInfo.phone"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="userInfo.sex" placeholder="please select your gender">
          <el-option label="female" value="女"/>
          <el-option label="male" value="男"/>
          <el-option label="other" value="其他"/>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input-number v-model="userInfo.age"></el-input-number>
      </el-form-item>
<!--      <el-form-item label="头像">-->
<!--        <el-input v-model="userInfo.avatar"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button style="margin-left: 120px" type="primary" @click="updateSubmit">更新</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import AsideComponent from "@/components/RegularUser/AsideComponent.vue";
import router from "@/router";
import {useUserStore} from "@/stores/state";

import {request} from "@/utils/request";
import {getCookie} from "@/utils/cookie";
import type {student, user} from "@/utils/data-entity";
import {ElMessage, UploadUserFile} from "element-plus";
import {onBeforeMount, onBeforeUpdate, watch} from "vue-demi";
import OSS from "ali-oss";
import {acessKey, acessKeyId} from "@/utils/apiKey";


// <!-- 导航栏组件 -->
const activeIndex = ref('1')
const subjectType = ref('1')
const introduceRouter = ref('introduceOne')
const learnRouter = ref('learnOne')

defineProps(["subject"])
const store = useUserStore()

const userId = getCookie("userId")
const userInfo = ref<user>(store.getUserInfo())
const studentInfo = ref<student>()
const showUpdateInfo = ref(false)
const updateInfo = () => {
  showUpdateInfo.value = true
}
const updateSubmit = () => {
  store.saveUserInfo()
  ElMessage.success("更新成功")
  showUpdateInfo.value = false
}
const logout = () => {
  store.saveStudentInfo()
  store.saveUserInfo()
  router.push({path: '/login'})
}
const fileList = ref<UploadUserFile[]>([])
const client = new OSS({
  region: "oss-cn-chengdu",
  accessKeyId: acessKeyId,
  accessKeySecret: acessKey,
  bucket: "onismyeh",
})
const upload = (uploadFile) =>{
  client.put("/pictures/"+userInfo.value.phone+".jpg", uploadFile.file).then(res => {
    userInfo.value.avatar = res.url
    ElMessage({
      message: 'Update successfully',
      type: 'success'
    })
    router.go(0)
  }).catch(err => {
    console.log(err)
  })
}


const typeOne = ref(true)
const typeTwo = ref(true)
const typeThree = ref(true)
const typeFour = ref(true)
const handleSelect = (key: string, keyPath: string[]) => {
  subjectType.value = key
  router.push({path: '/regularUser'})
  if (key == "1") {
    introduceRouter.value = "introduceOne"
    learnRouter.value = "learnOne"
  } else if (key == "2") {
    introduceRouter.value = "introduceTwo"
    learnRouter.value = "learnTwo"
  } else if (key == "3") {
    introduceRouter.value = "introduceTwo"
    learnRouter.value = "learnTwo"
  } else if (key == "4") {
    introduceRouter.value = "introduceOne"
    learnRouter.value = "learnOne"
  }
}

// <!-- 侧边栏组件 -->
const changeAside = (aside_index: string) => {
  if (aside_index == "1") {
    router.push({path: '/regularUser/' + introduceRouter.value})
  } else if (aside_index == "2") {
    router.push({path: '/regularUser/' + learnRouter.value})
  } else if (aside_index == "3") {
    router.push({path: '/regularUser/bookExam/' + subjectType.value})
  } else if (aside_index == "4") {
  }
}
// <!-- 主体组件 -->
const userName = ref('YehWang')


onMounted(() => {
  request.get("/driveservice/student/getById/" + getCookie("userId")).then((res) => {
    store.setStudentInfo(res.data.data.student)
  })
  studentInfo.value = store.getStudentInfo()
  console.log(studentInfo.value)
  if(studentInfo.value?.learnProgress == 1){
    typeOne.value = false
  } else if(studentInfo.value?.learnProgress == 2){
    typeOne.value = false
    typeTwo.value = false
  } else if(studentInfo.value?.learnProgress == 3){
    typeOne.value = false
    typeTwo.value = false
    typeThree.value = false
  } else if(studentInfo.value?.learnProgress == 4){
    typeOne.value = false
    typeTwo.value = false
    typeThree.value = false
    typeFour.value = false
  }
})

</script>

<style scoped>
.common-layout {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: -8px;
//background-color: aqua; position: fixed;
}
</style>
