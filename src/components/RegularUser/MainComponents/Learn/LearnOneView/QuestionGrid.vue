<template>
  <div>
    <h2>试题练习</h2>
<!--    <el-table-->
<!--        :data="questionsInfo.question"-->
<!--        style="width: 100%"-->
<!--    >-->
<!--      <el-table-column type="expand">-->
<!--        <template #default="props">-->
<!--          <div m="2">-->
<!--            <p m="t-0 b-2">State: {{ props.row.description }}</p>-->
<!--            <p m="t-0 b-2">City: {{ props.row.answer }}</p>-->
<!--          </div>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="试题标题">-->
<!--        <template #default="{ row }">-->
<!--          <span v-lazy="row.title">{{ row.title }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="试题类型" prop="type">-->
<!--      </el-table-column>-->
<!--    </el-table>-->

<!--    <el-table :data="filterTableData" style="width: 100%">-->
<!--      <el-table-column label="Title" prop="title" />-->
<!--      <el-table-column label="Type" prop="type" />-->
<!--      <el-table-column align="right">-->
<!--        <template #header>-->
<!--          <el-input v-model="search" size="small" placeholder="Type to search" />-->
<!--        </template>-->
<!--        <template #default="scope">-->
<!--          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"-->
<!--          >Edit</el-button-->
<!--          >-->
<!--          <el-button-->
<!--              size="small"-->
<!--              type="danger"-->
<!--              @click="handleDelete(scope.$index, scope.row)"-->
<!--          >Delete</el-button-->
<!--          >-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->

    <el-row v-for="(item,index) in questionInfo.question" :key="index">
      <el-col :span="24">
        <div>
          <span>{{ item.content }}</span>
        </div>

        <el-checkbox-group v-if="item.type==2" v-model="item.choose">
          <el-checkbox v-for="(option,index1) in item.optionsList"  :key="index1" :label="option.content">

          </el-checkbox>
        </el-checkbox-group>
        <el-radio-group v-if="item.type==1 || item.type==3" v-model="item.choose[0]">
          <el-radio v-for="(option2,index2) in item.optionsList"  :key="index2" :label="option2.content" >
            {{ option2.content }}
          </el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-button type="primary" @click="showData">
      提交
    </el-button>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import Lazyload from "vue3-lazyload";
import type {questionInfo, questionOptionInfo} from "@/utils/data-entity";
import {request} from "@/utils/request";

const props = defineProps(['subject'])// 从父组件获取数据:当前学科

const showData = () => {
  questionInfo.value.question.forEach((item,index)=>{
    if(item.choose[0]==''){
      item.choose.splice(0,1)
    }
  })
  console.log(questionInfo.value.question)
  request.post("/driveservice/question/getScore",questionInfo.value.question).then(res=>{
    console.log(res.data)
  })
}

const questionInfo = ref({
  question:[{
    id: "",        //题目id
    content: "",   //题目内容
    optionsList: ref<questionOptionInfo[]>([]),//选项列表
    choose: [],  //选中
    explain: "",   //解析
    type: 0,      //题目类型  1单选 2多选 3判断
    key: "",       //正确答案
    isTrue: 0,    //是否正确
  }]
})

onMounted(() => {
  fetchQuestions();
});

const chooseList = ref<string[]>([])
const fetchQuestions = () => {
  request.get("/driveservice/question/generateExercise1").then(res=>{
    // console.log(res.data.data.objects1)
    questionInfo.value.question.splice(0,questionInfo.value.question.length)
    questionInfo.value.question=res.data.data.objects1
    questionInfo.value.question.forEach((item,index)=>{
      item.choose=['']
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
</style>
