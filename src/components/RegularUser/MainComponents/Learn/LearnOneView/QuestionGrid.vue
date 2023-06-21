<template>
  <div>
    <h2>试题列表</h2>
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

    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="Title" prop="title" />
      <el-table-column label="Type" prop="type" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
          >
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import Lazyload from "vue3-lazyload";
import {reactive} from "vue-demi";
import {descriptionProps} from "element-plus"; // 引入 vue3-lazyload 库

const props = defineProps(['subject'])// 从父组件获取数据:当前学科


const questionsInfo = reactive({
  question: [{
    title: "test",
    description: "1+1=?",
    answer: "2",
    type: "判断题",
  },
    {
      title: "test",
      description: "1+1=?",
      answer: "2",
      type: "选择题",
    },
    {
      title: "test",
      description: "1+1=?",
      answer: "2",
      type: "选择题",
    },
    {
      title: "test",
      description: "1+1=?",
      answer: "2",
      type: "选择题",
    },
    {
      title: "test",
      description: "1+1=?",
      answer: "2",
      type: "选择题",
    },
    {
      title: "test",
      description: "1+1=?",
      answer: "2",
      type: "选择题",
    }
  ]
});
const search = ref('')
const filterTableData = computed(() =>
    questionsInfo.question.filter(
        (data) =>
            !search.value ||
            data.type.toLowerCase().includes(search.value.toLowerCase())
    )
)
const handleEdit = (index, row) => {
  console.log(index, row)
}
const handleDelete = (index, row) => {
  console.log(index, row)
}


onMounted(() => {
  fetchQuestions();
});

const fetchQuestions = () => {
  questionsInfo.question[0].title = "test";
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
