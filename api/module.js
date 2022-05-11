import request from './httpload.js'
import { BASE_URL } from './base-url.js'

/**
 * 所有实验室信息
 */
export function getLabInformationList() {
  return request.get('/labInformation/list')
}

/**
 * 按照小程序需要的格式封装JSON数据
 */
export function getLabInformationResult() {
  return request.get('/labInformation/getLabInformationResult')
}

/**
 * 置顶公告--xiaojie
 */
export function queryNoticeIsTop() {
  // console.log("queryNewsnoticeIsTop方法被调用了");
  return request.get('/labnoticeIsTop')
}
/**
 * 置顶新闻--xiaojie
 */
export function queryNewsIsTop() {
  // console.log("queryNewsIsTop方法被调用了");
  return request.get('/labnewsIsTop')
}

/**
 * 根据发布时间显示新闻公告--xiaojie
 */
export function queryNoticeByTime() {
  // console.log("queryNoticeByTime方法被调用了");
  return request.get('/lab/NewsnoticeByTime')
}

/**
 * 根据id查询公告--xiaojie
 */
export function labNewsNoticeById(informId) {
  // console.log("queryNoticeById方法被调用了");
  return request.get('/labNewsNotice/' + informId)
}

/** wbw
 * 根据roleid查询所有调查问卷信息
 * @param {Object} roleid
 */
export function queryLabpaper() {
  // console.log('queryLabpaper方法被调用了')
  return request.get('/labpaper/queryLabpaper')
}

/** wbw
 * 根据id查询调查问卷信息
 * @param {Object} queryLabpaperId
 */
export function queryLabpaperById(queryLabpaperId) {
  // console.log("queryLabpaperById方法被调用了");
  return request.get('/labpaper/queryLabpaperById/' + queryLabpaperId)
}

/**wbw
 * 提交调查问卷答案
 * @param {Object} labpaperAnswers
 */
export function labpaperanswerToSubmit(labpaperAnswers) {
  // console.log("labpaperanswerToSubmit方法被调用了");
  return request.post('/labpaperanswer/tosubmit', labpaperAnswers)
}
/**wbw
 * 查询是否填写过问卷
 * @param {Object} userid
 * @param {Object} paperid
 */
export function labpaperanswerGetByUserno(paperid) {
  // console.log("labpaperanswerGetByUserno方法被调用了");
  return request.get('/labpaperanswer/getbyuserno/' + paperid)
}
/**
 * 资源学习列表信息--xiaojie
 */
export function getResourceList() {
  return request.get('/getResourceList')
}

/**
 * 根据id查询资源学习信息--xiaojie
 */
export function queryResourceById(resourceid) {
  // console.log("queryResourceById方法被调用了");
  return request.get('/ResourceById/' + resourceid)
}

/**wbw
 * 授权
 * @param {Object} params
 */
export function toLogin(params) {
  // console.log("toVerification方法被调用了");
  return request.post('/toLogin', params)
}

/**wbw
 * 更新openid
 * @param {Object} openid
 */
export function saveOpenId(openid) {
  // console.log("saveOpenId方法被调用了");
  return request.get('/labTeacher/saveOpenId/' + openid)
}

/**wbw
 * 获取所有的实验课VO信息
 */
export function getAllLabcourseExpassignVOS(academicyearno, termno) {
  // console.log("getAllLabcourseExpassignVOS方法被调用了");
  return request.get(
    '/labcourseExpassign/list/' + academicyearno + '/' + termno
  )
}

/**wbw
 * 查找某个实验课的具体信息
 * @param {Object} academicyearno
 * @param {Object} termno
 * @param {Object} courseno
 * @param {Object} expclassno
 */
export function getLabcourseExpassignByParams(
  academicyearno,
  termno,
  courseno,
  expclassno
) {
  // console.log("getLabcourseExpassignByExpclassno方法被调用了");
  return request.get(
    '/labcourseExpassign/getLabcourseExpassign/' +
      academicyearno +
      '/' +
      termno +
      '/' +
      courseno +
      '/' +
      expclassno
  )
}

/**wbw
 * 查找某个实验项目的具体信息
 * @param {Object} academicyearno
 * @param {Object} termno
 * @param {Object} courseno
 * @param {Object} prjno
 */
export function getLabcourseExpprjcardByParams(
  academicyearno,
  termno,
  courseno,
  prjno
) {
  // console.log("getLabcourseExpassignByExpclassno方法被调用了");
  return request.get(
    '/labcourseExpprjcard/getLabcourseExpprjcard/' +
      academicyearno +
      '/' +
      termno +
      '/' +
      courseno +
      '/' +
      prjno
  )
}

/**wbw
 * 查询某个班实验项目的同学得分
 * @param {Object} academicyearno
 * @param {Object} termno
 * @param {Object} courseno
 * @param {Object} prjno
 */
export function getLabcourseStuprjscoreinfoByParams(
  academicyearno,
  termno,
  courseno,
  prjno,
  expclassno
) {
  // console.log("getLabcourseExpassignByExpclassno方法被调用了");
  return request.get(
    '/labcourseStuprjscoreinfo/getLabcourseStuprjscoreinfo/' +
      academicyearno +
      '/' +
      termno +
      '/' +
      courseno +
      '/' +
      prjno +
      '/' +
      expclassno
  )
}

/**wbw
 * 查询班级内学生
 * @param {Object} academicyearno
 * @param {Object} termno
 * @param {Object} courseno
 * @param {Object} prjno
 * @param {Object} expclassno
 */
export function getLabcourseStuByParams(
  academicyearno,
  termno,
  courseno,
  prjno,
  expclassno
) {
  // console.log("getLabcourseExpassignByExpclassno方法被调用了");
  return request.get(
    '/labcourseStuprjscoreinfo/getLabcourseStu/' +
      academicyearno +
      '/' +
      termno +
      '/' +
      courseno +
      '/' +
      prjno +
      '/' +
      expclassno
  )
}

/**
 * @param {Object} userid
 * 获取个人二维码--xioajie
 */
export function getQrcode(userid) {
  return request.get('/getQrcode/' + userid)
}

/**
 * @param {Object} lablearnrecords
 * 资源学习记录--xiaojie
 */
export function labLearnrecord(labLearnrecords) {
  return request.post('/lablearnrecord', labLearnrecords)
}

/**wbw
 * 获取公钥
 * @param {Object} userid
 */
export function generatePublicKey(userid) {
  // console.log("generateRSAKey方法被调用了");
  return request.post('/publicKey', userid)
}

/**
 * 获取当前用户的所有预约信息
 * @param {userInfo} params
 * @returns
 */
export function getReservasionsFromMyDB(params) {
  return request.get(
    '/labReservation/getReservasionsFromMyDB/' +
      params.userid +
      '/' +
      params.username
  )
}

/**wbw
 * 上传文件并返回文件虚拟路径和文件名
 * @param {Object} fileList
 */
export function uploadFile(imgPath) {
  const userInfo = uni.getStorageSync('userInfo')
  const token = userInfo.token
  return uni.uploadFile({
    url: BASE_URL + '/api/img/upload',
    filePath: imgPath,
    name: 'file',
    header: {
      'Content-Type': 'multipart/form-data',
      Authorization: token,
    },
  })
}

/**wbw
 * 提交报修信息
 * @param {Object} labRepairinfo
 */
export function saveLabRepairinfo(labRepairinfo) {
  return request.post('/labRepairinfo/saveLabRepairinfo', labRepairinfo)
}

/**wbw
 * 查找报修信息
 * @param {Object} status
 */
export function listByStatus(status) {
  return request.get('/labRepairinfo/listByStatus/' + status)
}

/**wbw
 * 保存实验信息
 * @param {Object} labcourseStuprjscoreinfoVO
 */
export function saveLabcourseStuprjscoreinfos(labcourseStuprjscoreinfoVOS) {
  return request.post(
    '/labcourseStuprjscoreinfo/saveLabcourseStuprjscoreinfos',
    labcourseStuprjscoreinfoVOS
  )
}
/**wbw
 * 保存1条实验信息
 * @param {Object} labcourseStuprjscoreinfoVOS
 */
export function saveLabcourseStuprjscoreinfo(labcourseStuprjscoreinfoVOS) {
  return request.post(
    '/labcourseStuprjscoreinfo/saveLabcourseStuprjscoreinfo',
    labcourseStuprjscoreinfoVOS
  )
}

/**wbw
 * 查询安全准入信息
 */
export function getLabsaInfoList() {
  return request.get('/labsaInfo/list')
}

/**
 * 查看学习记录--xiaojie
 */
export function queryLablearn(userno, resourceid) {
  return request.get('/query/lablearnrecord/' + userno + '/' + resourceid)
}
/**wbw
 * 根据类型查询安全准入信息
 */
export function getLabsaInfoListBySatype(satype) {
  return request.get('/labsaInfo/list/' + satype)
}

/**wbw
 * 获取值班信息表
 */
export function getLabcontactDutyinfo() {
  return request.get('/labcontactDutyinfo/list')
}

/**wbw
 * 获取业务咨询表
 */
export function getLabcontactServiceinfo() {
  return request.get('/labcontactServiceinfo/list')
}

/**wbw
 * 获取学习资源列表
 * @param {Object} said
 */
export function getLabsaStudylist(said) {
  return request.get('/labsaInfo/studylist/' + said)
}

/**
 * 由后端发送预约请求
 *
 * 需要的参数
 * consid
 * timestamp
 * sign
 * userid
 * content
 * usernum
 * orderdate[]
 * labid
 * opentypeid
 * expend
 * 增加开放预约信息-qiuqian
 *
 * @param {*} params
 * @returns
 */
export function add_lms_lab_open_backend(params) {
  // console.log('params',params)
  // 参数都由后端处理
  // var consid = 'LMS'
  // var accesskey = 'lms123'
  // var userid = params.userid
  // 时间戳 10位
  // var timestamp = Date.parse(new Date()).toString().substr(0, 10)

  // var sign = md5(accesskey + timestamp + userid)
  // params.consid = consid
  // params.timestamp = timestamp
  // params.sign = sign
  let temp = []
  params.usedate.forEach((element) => {
    let str = element.usedate + '|' + element.lesson
    // console.log(str)
    temp.push(str)
  })
  params.usedate = temp
  return request.post('/labReservation/addLmsLabOopen', params)
}
/**wbw
 * 获取用户的安全准入证书信息
 */
export function getLabsaUsergetinfolist() {
  return request.get('/labsaUsergetinfo/list')
}

/**
 * 获取实验室所有介绍信息
 * @param {*} labid
 * @returns
 */
export function getLabDetailById(labid) {
  return request.get('/labInformationdetail/getLabDetailById/' + labid)
}
/**
 * 根据 labid 获取实验室基本信息
 * @param {*} labid
 * @returns
 */
export function getLabInfoById(labid) {
  return request.get('/labInformation/getLabInfoById/' + labid)
}
/**wbw
 * 查询对应的安全准入测试题
 * @param {Object} said
 */
export function getLabsaExaminfoBySaid(said) {
  return request.get('/labsaExaminfo/list/' + said)
}
/**wbw
 * 去判断是否通过考试并给予证书
 * @param {Object} labsaanswers
 */
export function toBatchAndtoIssueCertificate(labsaanswers) {
  return request.post('/labsaAnswer/toBatchAndtoIssueCertificate', labsaanswers)
}
/**wbw
 * 退出登录
 */
export function logout() {
  return request.get('/logout')
}
/**wbw
 * 获取所有的负责报修单
 */
export function listByCharingRepair(status) {
  return request.get('/labRepairinfo/listByCharingRepair/' + status)
}
/**wbw
 * 修改保存报修单
 * @param {Object} labRepairinfo
 */
export function updateRepaire(labRepairinfo) {
  return request.post('/labRepairinfo/updateRepaire', labRepairinfo)
}

/**
 * 由后端发送删除请求
 *
 * 删除预约信息 - qiuqian
 *
 * 需要参数
 * consid
 * timestamp
 * sign (*md5{accesskey+timestamp+userid+openid})
 * userid
 * openid
 *
 * @param {*} params
 * @returns
 */
export function del_lms_lab_open(params) {
  //  console.log('params', params)
  return request.post('/labReservation/delLmsLabOpen', params)
}
/**
 * 由后端发送预约请求
 *
 * 需要的参数
 * consid
 * timestamp
 * sign
 * userid
 * openid
 * content
 * usernum
 * orderdate[]
 * labid
 * opentypeid
 * expend
 * 修改开放预约信息-qiuqian
 *
 * @param {*} params
 * @returns
 */
export function modLmsLabOpen(params) {
  // console.log('params.usedate', params.usedate)
  let temp = []
  params.usedate.forEach((element) => {
    let str = element.usedate + '|' + element.lesson
    // console.log(str)
    temp.push(str)
  })
  params.usedate = temp
  // console.log('params.usedate', params.usedate)

  // 参数都由后端处理
  return request.post('/labReservation/modLmsLabOpen', params)
}
// export function search(resourcename){
// 	return request.post("/search")
// }

/**
 * 消息中心的未读消息
 */
export function Unread() {
  return request.get('/message/unread')
}

/**
 * 消息中心的已读消息
 */
export function Read() {
  return request.get('/message/read')
}

/**
 * 删除消息中心的消息
 */
export function Delete(messageid) {
  return request.delete('/message/delete/' + messageid)
}

/**wbw
 * 获取当前学期
 */
export function getCurrentTerm() {
  return request.get('/sysAcademicyearterm/getCurrentTerm')
}

/**wbw
 * 获取管理的实验室列表
 */
export function query_device_list() {
  return request.get('/query_device_list')
}

/**wbw
 * 门禁远程控制（立即常开/预约常开/立即关）
 * @param {Object} params
 */
export function device_remote_control(params) {
  return request.post('/device_remote_control', params)
}

/**wbw
 * 门禁记录查询
 * @param {Object} labname
 * @param {Object} date
 */
export function query_record_data(labname, date) {
  return request.get('/query_record_data/' + labname + '/' + date)
}
/**
 * 一键删除
 */
export function DeleteAll() {
  return request.delete('/message/deleteAll')
}

/**
 * 已读消息中心的消息
 */
export function Update(messageid) {
  return request.post('/message/update/' + messageid)
}

/**
 * 一键已读
 */
export function UpdateAll() {
  return request.post('/message/updateAll')
}

/**
 * 修改学习记录学习完成状况
 */
export function UpdateRecord(resourceid) {
  return request.post('/lablearnrecord/' + resourceid)
}

/**
 * 学习记录显示
 */
export function Record() {
  return request.get('/getLablearnRecord')
}
export function RecordStudied() {
  return request.get('/getLablearnRecord/studied')
}
export function RecordStudying() {
  return request.get('/getLablearnRecord/studying')
}

/**
 * 查询预约单
 * @param {*} params
 * @returns
 */
export function getReservationList(params) {
  return request.post('/labReservation/getReservationList', params)
}

/**
 * 查询一个月内所有预约单，用于预约审批
 * @returns
 */
export function getAllReservation() {
  return request.post('/labReservation/getAllReservation')
}

/**
 * 预约审批
 * userid
 * openid
 * status
 * note
 * @param {*} params
 * @returns
 */
export function reservationCheck(params) {
  // console.log('参数', params)
  let res = {}
  res.userid = params.userInfo.userid
  res.openid = params.openid
  res.status = params.status
  // console.log(res.status == 1 ? '通过' : '未通过')
  res.note = params.note

  return request.post('/labReservation/reservationCheck', res)
}

/**
 * api/auth/v1/is_manager
 * 方法：POST/GET
 * 参数：userid
 * 返回：
 * {"success": True, "code": "0", "message": "操作成功", "manager": True}
 * {"success": True, "code": "0", "message": "操作成功", "manager": False}
 * @param {*} params
 */
export function checkAdminPermisson(params) {
  return request.post('/prime/checkAdminPermisson', params)
}

export function getTermStartTimeByBaseDay(baseDay) {
  return request.get(
    '/sysAcademicyearterm/getTermStartTimeByBaseDay/' + baseDay
  )
}

export function queryLabScheduleList(params) {
  // console.log(params)
  return request.get('/labReservation/queryLabScheduleList/' + params)
}

export function getStuSelfStuinfo(userid) {
  return request.get('/getStuSelfStuinfo?userid=' + userid)
}