<template>
  <el-row>
    <el-col :span="3">
      <div ref="el" :style="style" style="position: fixed">
        <el-card v-model="bookExamInfo"
                 class="info-card">
          <div>
            <el-icon>
              <Rank/>
            </el-icon>
          </div>
          <h3>预约信息</h3>
          <p>预约考试时间: <br>
            <el-text type="success"> {{ bookExamInfo.time }}
            </el-text>
          </p>
          <!--        <p>预约考试地点: <br> <el-text type="success">{{ bookExam.bookPlace }}</el-text></p>-->
          <p>预约考试科目: <br>
            <el-text type="success">{{ bookExamInfo.subjectType }}</el-text>
          </p>
          <el-button
              id="submitBut"
              type="primary" link @click="submitForm">预约考试
          </el-button>
        </el-card>
      </div>
    </el-col>
    <el-col :span="19">
      <div>
        <el-calendar v-model="selectedDate">
          <template #date-cell="{ data }">
            <p :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split('-').slice(1).join('-') }}
              {{ data.isSelected ? disabledDate(new Date(data.day)) : '' }}
            </p>
          </template>
        </el-calendar>
      </div>
    </el-col>
    <el-col :span="2">

    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import {ref,reactive} from 'vue';
import {ElCalendar, ElButton, ElMessage} from 'element-plus';
import {useDraggable} from "@vueuse/core";
import {useRouter} from "vue-router";
import type {bookExam} from "@/utils/data-entity";
import {request} from "@/utils/request";
import {useUserStore} from "@/stores/state";

const router = useRouter();
const currentSubject = router.currentRoute.value.params.subjectId;

const selectedDate = ref(""); // 选择的日期
const bookExamInfo:bookExam = reactive({
  id: "",
  name: "",
  studentId: "",
  subjectType: currentSubject as string,
  time: "",
  type: "",
  isPass: 0,
})
// 可以使用 disabledDate 方法来禁用不可选日期
const disabledDate = (time: Date): string => {
  // 在这里根据需要进行日期的禁用判断
  // 返回 true 表示禁用该日期，返回 false 表示可选该日期
  const otherTime = new Date();
  if ((otherTime.getMonth() >= time.getMonth()) && (otherTime.getDate() >= time.getDate())) {
    return '❌';
  } else {
    bookExamInfo.time = time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
    return '✔️';
  }
};

const el = ref<HTMLElement | null>(null)

// `style` will be a helper computed for `left: ?px; top: ?px;`
const {x, y, style} = useDraggable(el, {
  initialValue: {x: 200, y: 200},
})
const submitForm = () => {
  if(useUserStore().getStudentInfo().learnProgress != Number(currentSubject) ){
    ElMessage({
      message: '您当前不能预约该科目考试',
      type: 'warning'
    });
  } else if (!selectedDate.value) {
    // 如果没有选择日期，进行相应的提示
    ElMessage({
      message: '请选择日期',
      type: 'warning'
    });
    return;
  }else{
    request.post("/driveservice/book-exam/bookExam/"+"1",bookExamInfo).then(res=>{
      ElMessage({
        message: res.data.data.message,
        type: 'success'
      });
    })
  }


  // 创建考试的逻辑
  const examData = {
    date: selectedDate.value
  };
  // createExam(examData)
  //     .then(response => {
  //       // 处理成功响应
  //       console.log('考试预约成功');
  //       // 清空选择的日期
  //       selectedDate.value = '';
  //     })
  //     .catch(error => {
  //       // 处理错误响应
  //       console.error('考试预约失败', error);
  //     });
};
</script>

<style scoped>
.el-calendar {
  margin-left: 60px;
  border: 1px solid #eee;
}

.info-card {
  background-color: #6b778c;
  width: 250px;
  height: 250px;
}


.isSelected {
  color: #409eff;
}

#submitBut:hover {
  color: #e71919;
}

</style>

<!--//.info-card:hover{-->
<!--//  background-color: #ccc6c6;-->
<!--//}-->
