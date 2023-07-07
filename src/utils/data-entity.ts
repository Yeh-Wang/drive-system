// 用于定义数据实体

//用户信息
export interface user {
    id: string,             //用户id
    name: string,           //用户名
    sex: string,           //性别
    phone: string,           //电话
    age: number,           //年龄
    password: string,           //密码
    role: string,           //角色
    avatar: string,           //头像
    roleId: string,           //角色id
}

//报名表信息
export interface application {
    id: string,             //报名表id
    name: string,           //报名人姓名
    age: number,           //年龄
    sex: string,           //性别
    phone: string,           //电话
    adress: string,           //地址
    personCard: string,           //身份证号
    type: string,           //报名类型
    file: string,           //体检表文件名
    picture: string,           //本人照片
    email: string,           //邮箱
    createTime: string           //创建时间
    isPass: number,           //是否通过
}

//学生信息
export interface student {
    id: string,             //学生id
    name: string,           //学生姓名
    age: number,           //年龄
    sex: string,           //性别
    card: string,           //身份证号
    phone: string,           //电话
    adress: string,           //地址
    licenseType: string,           //驾照类型
    registeTime: string,           //注册时间
    emergencyContactPhone: string,           //紧急联系人电话
    healthCondition: string,           //健康状况
    remark: string,           //备注
    coachId: string,           //教练id
    learnTime: string,           //当前科目学习时间
    learnProgress: number,           //科目学习进度
}

//科目一信息
export interface subjectOne {
    id: string,             //科目一id
    chapterId: string,      //章节id
    needTime: number,       //需要时间
    type: string,           //驾照类型
}

//科目二信息
export interface subjectTwo {
    id: string,             //科目二id
    chapterId: string,      //章节id
    needTime: number,       //需要时间
    type: string,           //驾照类型
}

//科目三信息
export interface subjectThree {
    id: string,             //科目三id
    chapterId: string,      //章节id
    needTime: number,       //需要时间
    type: string,           //驾照类型
}

//科目四信息
export interface subjectFour {
    id: string,             //科目四id
    chapterId: string,      //章节id
    needTime: number,       //需要时间
    type: string,           //驾照类型
}

// //选择题信息
// export interface chooseQuestion {
//     id: string,        //题目id
//     content: string,   //题目内容
//     choose: string,    //学生选择的答案
//     a: string,         //选项a
//     b: string,         //选项b
//     c: string,         //选项c
//     d: string,         //选项d
//     key: string,       //正确答案
//     score: number,     //分数
//     type: string,      //题目类型
// }
//
// //判断题信息
// export interface judgeQuestion {
//     id: string,        //题目id
//     content: string,   //题目内容
//     choose: string,    //学生选择的答案
//     key: string,       //正确答案
//     score: number,     //分数
// }
//
// export enum judgeEnum {
//     true = '正确',
//     false = '错误',
// }


// //预约考试信息
// export interface bookExam {
//     id: string,           //预约考试id
//     studentId: string,         //预约人id
//     subjectType: string,       //预约科目
//     time: string,              //预约时间
//     type: string,              //预约类型
//     isPass: number,            //是否通过
// }

//预约考试信息
export interface bookExam {
    id: string,           //预约考试id
    name: string,           //预约人姓名
    studentId: string,         //预约人id
    subjectType: string,       //预约科目
    time: string,              //预约时间
    type: string,              //预约类型
    isPass: number,            //是否通过
}

//选择题信息
export interface chooseQuestion {
    id: string,        //题目id
    content: string,   //题目内容
    type: string,      //题目类型
    optionsList: chooseQuestionOption[],//选项列表
    choose: string,  //是否选中
    key: string,       //正确答案
}
//选择题选项信息
export interface chooseQuestionOption {
    id: string,        //选项id
    content: string,   //选项内容
    questionId: string,//题目id
}

//判断题信息
export interface judgeQuestion {
    id: string,        //题目id
    content: string,   //题目内容
    optionsList: judgeQuestionOption[],//选项列表
    choose: string,  //选中
    type: string,      //题目类型
    key: string,       //正确答案
}
//判断题选项信息
export interface judgeQuestionOption {
    id: string,        //选项id
    content: string,   //选项内容
    questionId: string,//题目id
}

//考试试卷信息
export interface examPaper {
    id: string,                         //试卷id
    studentId: string,                  //学生id
    chooseQuestion: chooseQuestion[],   //选择题
    judgeQuestion: judgeQuestion[],     //判断题
    type: string,                       //试卷类型
}

//章节信息
export interface chapter {
    id: string,             //章节id
    chapterName: string,    //章节名称
    videoPlayAuth:videoInfo[],//视频播放凭证
}

export interface videoInfo {
    key: string,             //视频key
    value: string,           //视频value
}

//题目信息
export interface questionInfo {
    id: string,        //题目id
    content: string,   //题目内容
    optionsList: questionOptionInfo[],//选项列表
    choose: string[],  //选中
    explain: string,   //解析
    type: number,      //题目类型  1单选 2多选 3判断
    key: string,       //正确答案
    isTrue: number,    //是否正确
}

//题目选项信息
export interface questionOptionInfo {
    id: string,        //选项id
    content: string,   //选项内容
    questionId: string,//题目id
}


//预约练车信息
export interface bookCar {
    id: string,           //预约练车id
    studentId: string,         //预约人id
    coachId: string,         //教练id
    // coachName: string,         //教练姓名
    time: string,              //预约时间
    type: string,              //预约科目  科目二 科目三
    isPass: string,            //是否通过  已通过 未通过
}


