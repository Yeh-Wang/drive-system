<template>
  <div>
    <el-row>
      <el-col :span="3">

      </el-col>
      <el-col :span="16">
        <h2>试题练习</h2>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="fetchQuestions">
          再来一次
        </el-button>
        <el-button type="success" @click="showData">
          提交
        </el-button>
      </el-col>
      <el-col :span="2">

      </el-col>
    </el-row>


    <div v-if="store.showQuestion" class="class-question">
      <el-scrollbar height="520px">
      <el-row v-for="(item,index) in questionInfo.question" :key="index">
        <el-col :span="24" align="left">
          <br>
          <div style="text-align: left">
            <span> {{ index+1 }}.{{ item.content }}</span>
          </div>
          <br>
          <el-checkbox-group v-if="item.type==2" v-model="item.choose" >
            <el-checkbox :border="true" v-for="(option,index1) in item.optionsList" :key="index1" :label="option.id">
              {{options[index1]}}.{{ option.content }}
            </el-checkbox>
          </el-checkbox-group>
          <el-radio-group v-if="item.type==1 || item.type==3" v-model="item.choose[0]">
            <el-radio :border="true" v-for="(option2,index2) in item.optionsList" :key="index2" :label="option2.id">
              {{options[index2]}}.{{ option2.content }}
            </el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      </el-scrollbar>
    </div>
    <div v-else class="class-question">
      <el-scrollbar height="520px">
      <el-row v-for="(item,index) in resQuestionInfo.question" :key="index">
        <el-col :span="24" align="left">
          <div style="text-align: left">
            <br>
            <span >{{ index+1 }}.{{ item.content }}</span>
            <el-icon v-if="item.isTrue==1" name="el-icon-check" style="color: green">
              <Check/>
            </el-icon>
            <el-icon v-else name="el-icon-close" style="color: red">
              <Close/>
            </el-icon>
          </div>
          <br>
          <el-row>
            <el-col :span="24" align="left">
              <span v-for="(option1,index1) in item.optionsList">{{options[index1]}}.{{ option1.content }}&nbsp;&nbsp;&nbsp;</span>
            </el-col>
          </el-row>
          <span style="font-style: revert">正确答案：{{ item.key }}。解析:{{ item.explains }}</span>
        </el-col>
      </el-row>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import Lazyload from "vue3-lazyload";
import type {questionInfo, questionOptionInfo} from "@/utils/data-entity";
import {request} from "@/utils/request";
import {onBeforeRouteLeave} from "vue-router";
import {useUserStore} from "@/stores/state";

const props = defineProps(['subject'])// 从父组件获取数据:当前学科
const store = useUserStore()
const options = ['A', 'B', 'C', 'D']
const showData = () => {
  questionInfo.value.question.forEach((item, index) => {
    if (item.choose[0] == "") {
      item.choose.splice(0, 1)
    }
  })
  request.post("/driveservice/question/getScore", questionInfo.value.question).then(res => {
    resQuestionInfo.value.question.splice(0, resQuestionInfo.value.question.length)
    resQuestionInfo.value.question=res.data.data.data
    console.log(resQuestionInfo.value.question)
    store.showQuestion = false
  })
}

const resQuestionInfo = ref({
  question: [{
    id: "",        //题目id
    content: "",   //题目内容
    optionsList: ref<questionOptionInfo[]>([]),//选项列表
    choose: [],  //选中
    explains: "",   //解析
    type: 0,      //题目类型  1单选 2多选 3判断
    key: "",       //正确答案
    isTrue: 0,    //是否正确
  }]
})

const questionInfo = ref({
  question: [{
    id: "",        //题目id
    content: "",   //题目内容
    optionsList: ref<questionOptionInfo[]>([]),//选项列表
    choose: [],  //选中
    explains: "",   //解析
    type: 0,      //题目类型  1单选 2多选 3判断
    key: "",       //正确答案
    isTrue: 0,    //是否正确
  }]
})
onMounted(() => {
  fetchQuestions();
});

const fetchQuestions = () => {
  store.showQuestion = true
  request.get("/driveservice/question/generateExercise1").then(res => {
    // console.log(res.data.data.objects1)
    questionInfo.value.question.splice(0, questionInfo.value.question.length)
    questionInfo.value.question = res.data.data.objects1
    questionInfo.value.question.forEach((item, index) => {
      item.choose = [""]
    })
    // console.log(questionInfo.value.question)
  })
};

const directives = {
  Lazyload
};
</script>

<style scoped>
.descriptions {
  width: 600px;
  height: 200px;
}
.class-question{
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-style: normal;
}
</style>
