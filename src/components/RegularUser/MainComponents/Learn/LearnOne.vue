<script setup lang="ts">
import {ref} from "vue";
import LearnVideoView from "@/components/RegularUser/MainComponents/Learn/LearnOneView/LearnVideoView.vue";
import LearnQuestionView from "@/components/RegularUser/MainComponents/Learn/LearnOneView/LearnQuestionView.vue";
import {useUserStore} from "@/stores/state";

const props = defineProps(["subject"])
const store = useUserStore()

//视频学习时间
const LearnedTime = ref("12:00")
//试题学习时间
const requireTime = ref("40")
//学习界面是否显示
const showLearn = ref(false)
//视频学习界面是否展示
const showVideoLearn = ref(true)

//获取学时
const getNeedTime = () =>{
}

//vide-card button click
const learnVideo = () =>{
  showLearn.value = true
  showVideoLearn.value = true
}
//question-card button click
const learnQuestion = () =>{
  showLearn.value = true
  showVideoLearn.value = false
  store.start()
}
//back button click
const backVideo = (learnTime:string) =>{
  showLearn.value = false
  showVideoLearn.value = true
}
const backQuestion = (learnTime:string) =>{
  showLearn.value = false
  showVideoLearn.value = false
}
</script>

<template>
  <div v-show="showLearn">
    <LearnVideoView v-if="showVideoLearn" @event1="backVideo" :subject="props.subject"/>
    <LearnQuestionView v-else @event2="backQuestion" :subject="props.subject" />
  </div>

  <div v-show="!showLearn">
  <div class="learned-time">
    <p>Learned time is: <el-icon><AlarmClock /></el-icon>
      <el-text type="success">{{ store.getStudentInfo().learnTime }} </el-text> minutes,
      You need to study a total of <el-icon><GoldMedal /></el-icon>
      <el-text type="danger">{{ requireTime }}</el-text> hours</p>
  </div>
  <el-row>
    <el-col :span="2">
    </el-col>
    <el-col :span="9">
      <el-card class="video-card">
        <h3>Video Learning: {{ props.subject }}</h3>
<!--        <h4>Learned time is {{ videoLearnedTime }}</h4>-->
        <p id="p">通过视频学习让你获得更好的学习体验和效果</p>
        <el-footer>
          <el-button text plain type="primary" @click="learnVideo">Start</el-button>
        </el-footer>
      </el-card>
    </el-col>
    <el-col :span="2">
    </el-col>
    <el-col :span="9">
      <el-card class="question-card">
        <h3>Question bank learning: {{ props.subject }}</h3>
<!--        <h4>Learned time is {{ questionLearnedTime }}</h4>-->
        <p>通过试题学习，让你体验真题的快乐</p>
        <el-footer>
          <el-button text plain type="primary" @click="learnQuestion">Start</el-button>
        </el-footer>
      </el-card>
    </el-col>
    <el-col :span="2">
    </el-col>
  </el-row>
  </div>
</template>

<style scoped>
.video-card{
  height: 250px;
  width: 250px;
  margin-top: 150px;
  margin-left: 100px;
  background-color: #efecec;
  .el-button{
    margin-top: 50px;
  }
}
.video-card:hover{
  background-color: rgba(227, 133, 133, 0.98);
  box-shadow: #acacef 0 0 8px 8px;
}
.question-card{
  height: 250px;
  width: 250px;
  margin-top: 150px;
  margin-left: 50px;
  background-color: #efecec;
  .el-button{
    margin-top: 40px;
  }
}
.question-card:hover{
  background-color: rgba(199, 5, 40, 0.98);
  box-shadow: #acacef 0 0 8px 8px;
  .el-button{
    color: #000103;
  }
}
</style>
