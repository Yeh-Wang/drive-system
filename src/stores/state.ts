import {defineStore} from 'pinia'
import {computed, ref} from "vue";
import {request} from "@/utils/request";
import type {student, user} from "@/utils/data-entity";
import {reactive} from "vue-demi";

export const useAppStore = defineStore({
    id: 'app',
    state: () => (
        {
            isRouterAlive: true,
            isLoading: false
        } as { isRouterAlive: boolean; isLoading: boolean }
    ),
})

export const useUserStore = defineStore("nowUser",()=>{
    const userId = ref('')
    const userInfo  = reactive({
        userInfo :{
            id: "",             //用户id
            name: "",           //用户名
            sex: "",           //性别
            phone: "",           //电话
            age: 0,           //年龄
            password: "",           //密码
            role: "",           //角色
            avatar: "",           //头像
            roleId: "",           //角色id
        }
    })
    const studentInfo = reactive({
        studentInfo :{
            id: "",             //学生id
            name: "",           //学生姓名
            age: 0,           //年龄
            sex: "",           //性别
            card: "",           //身份证号
            phone: "",           //电话
            adress: "",           //地址
            licenseType: "",           //驾照类型
            registeTime: "",           //注册时间
            emergencyContactPhone: "",           //紧急联系人电话
            healthCondition: "",           //健康状况
            remark: "",           //备注
            coachId: "",           //教练id
            learnTime: "",           //当前科目学习时间
            learnProgress: 0,           //科目学习进度
        }
    })
    function setUserId(id:string){
        userId.value = id
    }

    function getUserInfo(){
        // userId.value = getCookie('userId') as string
        // request.get("/driveservice/user/selectUser/"+userId.value).then((res)=>{
        //     userInfo.userInfo = res.data.data.user
        //     console.log(userInfo.userInfo)
        //     return userInfo.userInfo
        // })
        return userInfo.userInfo
    }

    function setUserInfo(user:user){
        userInfo.userInfo = user
    }

    function getStudentInfo(){
        return studentInfo.studentInfo
    }

    function setStudentInfo(student:student){
        studentInfo.studentInfo = student
    }


    // 视频学习
    const showChapter = ref(true)
    const showVideo = ref(false)
    //试题学习
    const showQuestion = ref(true)

    //计时器
    const timer = ref(0)
    const time = ref(0)
    const timeStr = computed(() => {
        let h = Math.floor(time.value / 3600)
        let m = Math.floor((time.value - h * 3600) / 60)
        let s = time.value - h * 3600 - m * 60
        return `${h}:${m}:${s}`
    })
    const start = () => {
        timer.value = setInterval(() => {
            time.value++
        }, 1000)
    }
    const stop = () => {
        clearInterval(timer.value)
    }
    const reset = () => {
        time.value = 0
    }
    //将计时器时间转化为分钟
    const timeToMinute = computed(() => {
        return Math.round(time.value / 60)
    })

    const saveStudentInfo = () => {
        request.post("/driveservice/student/updateStudent",studentInfo.studentInfo).then((res)=>{
            console.log("student",res)
        })
    }
    const saveUserInfo = () => {
        request.post("/driveservice/user/updateUser",userInfo.userInfo).then((res)=>{
            console.log("user",res)
        })
    }


    return {
        userId,
        setUserId,
        getUserInfo,
        setUserInfo,
        getStudentInfo,
        setStudentInfo,
        showChapter,
        showVideo,
        timer,
        time,
        timeStr,
        start,
        stop,
        reset,
        timeToMinute,
        saveStudentInfo,
        saveUserInfo,
        showQuestion
    }
})
