<template>
  <div class="login">
    <div class="container" v-show="changeTab">
      <h1>Login</h1>
      <el-form-item class="item" label="User Type">
        <el-select v-model="form.grade" placeholder="please select your identity">
          <el-option v-for="item in optionsState" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form :model="form" ref="form" :rules="rules" label-width="80px">
        <el-form-item label="Username" prop="username">
          <el-input class="input-border-style" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input type="password" show-password v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button id="okButton" type="primary" @click="handleSubmit('form')">Login</el-button>
          <el-link id="Res" :underline="false" type="success" @click="resDialog">Haven't signed up yet?</el-link>
        </el-form-item>
      </el-form>
    </div>
    <div class="register" v-show="!changeTab">
      <h1>Sign Up</h1>
      <el-form :model="signForm" ref="signForm" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="Name" prop="name">
              <el-input v-model="signForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="age" prop="age">
              <el-input-number v-model="signForm.age" :min="18" :max="70"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="Gender" prop="gender">
              <el-select v-model="signForm.gender" placeholder="please select your gender">
                <el-option label="female" value="男"/>
                <el-option label="male" value="女"/>
                <el-option label="other" value="其他"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Phone" prop="phone">
              <el-input v-model="signForm.phone" maxlength="11" show-word-limit></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="13">
            <el-form-item label="Address" prop="address">
              <elui-china-area-dht isall :leave="3" @change="onChange"></elui-china-area-dht>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="Type" prop="type">
              <el-select v-model="signForm.type" placeholder="please select your type you want to sign up">
                <el-option label="C1" value="C1"/>
                <el-option label="C2" value="C2"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="Your Photo" prop="personalCard">
              <el-upload
                  v-model="signForm.personalCard"
                  class="upload-demo"
                  :http-request="upload"
                  :before-remove="beforeRemove"
                  :on-preview="onPreview"
                  :limit="1"
                  :on-exceed="handleExceed">
                <el-button style="padding-top: 10px" size="default" icon="PictureFilled" type="text" color="#f89898" >Click to upload</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Health certificate" prop="file">
              <el-upload
                  v-model:file-list="fileList"
                  :auto-upload="false"
                  action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                  class="upload-demo"
                  :before-remove="beforeRemove"
                  :limit="1"
                  :on-exceed="handleExceed">
                <el-button size="default" type="text" icon="upload-filled" color="#f89898">Click to upload</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button id="okButton" type="success" icon="check" @click="handleRegister('form')">Submit</el-button>
          <el-button id="Res" type="primary" icon="back" @click="showLogin">Back</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

  <el-image-viewer
      style="max-width: 400px; max-height: 400px;"
      @close="showImageViewer=false" :url-list="preview" v-if="showImageViewer"></el-image-viewer>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import EluiChinaAreaDht from "elui-china-area-dht";
import type {UploadUserFile} from 'element-plus'
import {ElMessage, ElMessageBox} from "element-plus";
import OSS from "ali-oss";
import router from "@/router";
import {acessKey, acessKeyId} from "@/utils/apiKey";
import {CardType, Gender} from "@/utils/gender";
import * as string_decoder from "string_decoder";

export default defineComponent({
  name: 'Login',
  components: {EluiChinaAreaDht},
  data() {
    const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat;
    const client = new OSS({
      region: "oss-cn-chengdu",
      accessKeyId: acessKeyId,
      accessKeySecret: acessKey,
      bucket: "onismyeh",
    })
    return {
      preview: [],
      showImageViewer: false,
      client,
      optionsState: [
        {
          value: 0,
          label: 'super administrator'
        },
        {
          value: 1,
          label: 'organization administrator'
        },
        {
          value: 2,
          label: 'regular user'
        }
      ],
      form: {
        username: '',
        password: '',
        grade: 0
      },
      signForm: {
        id:"",  // id
        name: '', // 姓名
        age: 0,  // 年龄
        gender: Gender.male,  // 性别
        address: '',  // 地址
        personCard: '',  // 身份证照片
        type: CardType.typeTwo,  // 报考类型
        phone: '',  // 手机号
        file: '',  // 上传文件
        personalCard: '',  // 个人照片
        createTime: '',  // 创建时间
      },
      changeTab: true,
      rules: {
        username: [
          {required: true, message: 'Please input your username', trigger: 'blur'}
        ],
        password: [
          {required: true, message: 'Please input your password', trigger: 'blur'}
        ],
      },
      chinaData
    };
  },
  watch: {
  },
  mounted() {
    this.form.grade = this.optionsState[2].value
  },
  setup() {
    const fileList = ref<UploadUserFile[]>([]);
    return {
      fileList,
    }
  },
  methods: {
    getNowTime(){
      const time = new Date()
      return time.getFullYear()+"-"+time.getMonth()+"-"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()
    },
    handleSubmit(form) {
      // console.log(this.form)
      // // Submit form data to server
      // console.log('Username:', this.form.username);
      // console.log('Password:', this.form.password);
      router.push({path: '/regularUser'})
    },
    handleRegister(form) {
      this.signForm.createTime= this.getNowTime()
      this.signForm.file = this.fileList[0].name
      console.log(this.signForm)
    },
    onChange(val) {
      this.signForm.address = this.chinaData[val[0]].label + '/' + this.chinaData[val[1]].label + '/' + this.chinaData[val[2]].label
    },
    resDialog() {
      this.changeTab = false
      this.form = {
        username: '',
        password: '',
        grade: 0
      }
    },
    showLogin() {
      this.changeTab = true
      this.form = {
        username: '',
        password: '',
        grade: 0
      }
    },
    upload(uploadFile) {
      this.client.put("/pictures/"+uploadFile.file.name, uploadFile.file).then(res => {
        this.signForm.personalCard = res.url
        ElMessage({
          message: 'Upload successfully',
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
      })
    },
    onPreview(file){
      this.preview.push(this.signForm.personalCard)
      this.showImageViewer = true
    },
    handleExceed(files, uploadFiles) {
      ElMessage.warning(
          `The limit is 1, you selected ${files.length} files this time, add up to ${
              files.length + uploadFiles.length
          } totally`
      )
    },
    beforeRemove(uploadFile, uploadFiles) {
      return ElMessageBox.confirm(
          `Cancel the transfer of ${uploadFile.name} ?`
      ).then(
          () => true,
          () => false
      )
    },
  }
});
</script>

<style>


/** el-input 正常模式下、readonly模式下的文字颜色 */
.el-input__inner{
  color: #00000a;
}


.el-form-item .el-form-item__label {
  color: #000103;
}

</style>
<style scoped>
.login {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: -8px;
  position: fixed;
  //background-color: aqua;
  background-image: url("../assets/login.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
}

.container {
//max-height: 400px;
  width: 400px; position: fixed; margin-top: 200px; margin-left: 35%;
  background: rgba(255, 255, 255, 0.3);
  opacity: 0.9;
  border-radius: 20px;
  text-align: center;
  color: #020713;
}

.register {
//height: 350px; width: 550px;
  position: fixed;
  margin-top: 150px;
  margin-left: 33%;
  background: rgba(255, 255, 255, 0.3);
  opacity: 0.9;
  border-radius: 20px;
  text-align: center;
}

.el-form-item {
  margin-left: 10px;
}

#okButton {
  width: 80px;
  margin-top: 10px;
  margin-left: 60px;
}

#Res {
  margin-top: 10px;
  margin-left: 15px;
}
</style>


<!--// const formData = new FormData();-->
<!--// formData.append("smfile", uploadFile.file);-->
<!--// axios.post('api/v2/upload', formData, {-->
<!--//   headers: {-->
<!--//     "Content-Type": 'multipart/form-data',-->
<!--//     "Authorization": "3eXoA1GeyPHwPrQLpYXCXZgu5U8jI87M"-->
<!--//   }-->
<!--// }).then(res => {-->
<!--//   this.signForm.file = res.data.data.url-->
<!--// }).catch(err => {-->
<!--//   console.log(err)-->
<!--// })-->
