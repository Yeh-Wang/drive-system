<template>
  <div style="padding-left: 150px">
  <el-table :data="filterTableData" style="width: 100%">
    <el-table-column type="index" width="70" />
<!--    <el-table-column label="coach id" prop="coachId" width="150"/>-->
    <el-table-column label="time" prop="time" width="150"/>
    <el-table-column label="subject type" prop="type" width="150"/>
    <el-table-column label="status" prop="isPass" width="150"/>
    <el-table-column align="center" >
      <template #header>
        <el-row>
          <el-col :span="24">
            <el-input style="width: 300px" v-model="search" size="small" placeholder="Type to search" />
            <el-button style="margin-left: 10px" size="small" type="success" circle icon="Plus"
            @click="handleAdd"
            />
          </el-col>
        </el-row>
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

  <el-dialog v-model="showForm" width="450">
    <el-form v-model="form">
      <el-form-item label="type">
        <el-input v-model="form.type" disabled/>
      </el-form-item>
      <el-form-item label="Time">
        <el-date-picker
            v-model="form.time"
            type="date"
            placeholder="Pick a Date"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">Submit</el-button>
        <el-button @click="showForm = false">Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import {computed, ref, reactive, onMounted} from "vue";
import type {bookCar} from "@/utils/data-entity";
import {useUserStore} from "@/stores/state";
import {ElMessage, ElMessageBox} from "element-plus";
import {request} from "@/utils/request";

const props = defineProps(["subject"])  // 从父组件获取数据:当前学科
const store = useUserStore()

const search = ref("")  // 搜索框

const tableData:bookCar[] = reactive([])  // 表格数据

const filterTableData = computed(() => {
  return tableData.filter((item) => {
    return item.time.toLowerCase().includes(search.value.toLowerCase())
  })
})

const handleEdit = (index: number, row: bookCar) => {
  console.log(index, row)
  // showForm.value = true
  // form.value = row
}
const handleDelete = (index: number, row: bookCar) => {
  console.log(index, row.coachId)
  ElMessageBox.alert("Are you sure to delete this record?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning"
  }).then(() => {
    request.delete("/driveservice/exercise/delete/"+row.id).then(() => {
      tableData.splice(index, 1)
      ElMessage.success("Delete successfully!")
    })
  }).catch(() => {
    ElMessage.info("Delete canceled!")
  })
}

const handleAdd = () => {
  form.value = {
    id: "",
    studentId: "",
    coachId: "",
    // coachName: "",
    time: "",
    type: "",
    isPass: ""
  }
  if (props.subject == "1") {
    form.value.type = "科目1"
  } else if (props.subject == "2") {
    form.value.type = "科目2"
  } else if (props.subject == "3") {
    form.value.type = "科目3"
  } else if (props.subject == "4") {
    form.value.type = "科目4"
  }
  showForm.value = true
}
const nowTime = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()
const submitForm = () => {
  form.value.studentId = store.getStudentInfo().id
  form.value.coachId = store.getStudentInfo().coachId
  form.value.isPass = "未通过"
  let time1 = new Date(form.value.time)
  let time2 = new Date(nowTime)
  if(time1.getTime() <= time2.getTime()) {
    ElMessage.error("The time you choose has passed!")
  } else {
    console.log(form.value)
    request.post("driveservice/exercise/add",form.value).then((res) => {
      ElMessage.success("Book successfully!")
      fetchTableData()
    })
    showForm.value = false
  }
}

const showForm = ref(false)
const form = ref({
  id: "",
  studentId: "",
  coachId: "",
  // coachName: "",
  time: "",
  type: "",
  isPass: ""
})

onMounted( () => {
  fetchTableData()
})

const fetchTableData = () => {
  request.get("driveservice/exercise/getExercise/"+store.getStudentInfo().id).then((res) => {
    tableData.splice(0,tableData.length)
    tableData.push(...res.data.data.exerciseList)
  })  // 获取数据
}
</script>

<style scoped>

</style>
