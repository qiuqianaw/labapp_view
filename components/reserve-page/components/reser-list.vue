<template>
  <view class="margin-xs">
    <view class="cu-bar bg-white solid-bottom">
      <view class="action">
        <text class="cuIcon-titles text-orange"></text>
        填写预约单
      </view>
    </view>
    <view class="cu-card dynamic no-card">
      <view class="cu-item shadow">
        <form class="text-grey" v-model="reserList">
          <view class="cu-form-group">
            <view class="title">项目名称<text class="text-red">*</text></view>
            <input
              placeholder="必填项"
              name="input"
              v-model="reserList.content"
            />
          </view>
          <view class="cu-form-group">
            <view class="title">预约人数<text class="text-red">*</text></view>

            <input
              :placeholder="'必填项,最大预约人数 ' + lab.seatnum"
              type="number"
              name="input"
              v-model="reserList.usernum"
            />
          </view>
          <view class="cu-form-group">
            <view class="title">指导教师</view>
            <input name="input" v-model="reserList.guideteacher" />
          </view>
          <view class="cu-form-group">
            <view class="title">项目说明</view>
            <input name="input" v-model="reserList.explain" />
          </view>
          <view class="cu-form-group">
            <view class="title">预约类型<text class="text-red">*</text></view>
            <picker @change="PickerChange" :value="index" :range="picker">
              <view class="picker">
                {{ index > -1 ? picker[index] : '必选项' }}
              </view>
            </picker>
          </view>
          <view class="cu-form-group">
            <view class="title">备注</view>
            <input name="input" v-model="reserList.remarks" />
          </view>
          <view class="cu-form-group">
            <view class="title">是否需要材料</view>
            <switch
              @change="isExpend"
              :class="checked ? 'checked' : ''"
              :checked="checked ? true : false"
            ></switch>
          </view>

          <!-- <navigator
            url="/pages/note-for-open-booking/index"
            class="content"
            hover-class="none"
          > -->
          <view class="cu-form-group">
            <view class="title"
              >同意预约须知<text class="text-red">*</text
              ><text class="text-sm solid-bottom" @click="goNote"
                >（点击查看）</text
              ></view
            >
            <switch
              @change="isAgree"
              :class="agree ? 'checked' : ''"
              :checked="agree ? true : false"
            ></switch>
          </view>

          <view>
            <button
              :loading="submitting"
              @click="submitList"
              class="cu-btn bg-blue block lg margin-xl"
              :disabled="agree == false || lessons.length == 0"
            >
              提交
            </button>
          </view>
        </form>
      </view>
    </view>
  </view>
</template>

<script>
// import { add_lms_lab_open } from '@/api/index.js'
import { add_lms_lab_open_backend } from '@/api/module.js'
// import { del_lms_lab_open } from '@/api/module.js'
import { modLmsLabOpen } from '@/api/module.js'

export default {
  props: {
    lab: {
      type: Object,
      default: function () {
        return {}
      },
    },
    lessons: {
      type: Array,
      default: function () {
        return []
      },
    },
    reserListGet: {
      type: Object,
      default: function () {
        return {}
      },
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    continue_: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    continue_(val) {
      // console.log('continue_', val)
    },
    isEdit(val) {
      // console.log('isEdit', val)
    },
    lessons(val) {
      // console.log('reserve-list-lessons', val)
      this.reserList.usedate = val
    },
    reserListGet(val) {
      this.reserList = val
      this.index = parseInt(this.reserList.opentypeid) - 1
      this.reserList.expend = parseInt(this.reserList.expend)
      if (this.reserList.expend == 1) {
        this.checked = true
      }
      if (this.isEdit == true) {
        this.$emit('getLabReservationrecordList', this.reserList.opendatelist)
      }
    },
  },
  mounted() {
    const _this = this
    uni.getStorage({
      key: 'userInfo',
      success: function (res) {
        _this.userid = res.data.userid
      },
    })
    this.reserList.labid =
      this.isEdit == false && this.continue_ == false
        ? this.lab.labroom
        : this.lab.labid
    // console.log('this.reserList.labid', this.reserList.labid)
  },
  data() {
    return {
      agree: false,
      submitting: false,
      // 选择器用index
      index: -1,
      picker: [
        '大创/竞赛项目',
        '毕设设计项目',
        '课程实验项目',
        '教师科研项目',
        '其他',
      ],
      userid: null,
      checked: false,
      // 默认设置为空字串可防止出现null值直接插入预约单
      reserList: {
        content: '',
        usernum: null,
        usedate: null,
        labid: null,
        guideteacher: '',
        explain: '',
        opentypeid: null,
        expend: 0,
        remarks: '',
      },
    }
  },

  methods: {
    goNote() {
      uni.navigateTo({
        url: '/pages/note-for-open-booking/index',
      })
    },
    submitList() {
      // console.log('add')
      // 判断是否登陆
      uni.getStorage({
        key: 'userInfo',
        fail: function (res) {
          // console.log(res)
          uni.navigateTo({
            url: '/pages/login/index?code=401',
          })
          return false
        },
      })

      const _this = this
      this.submitting = true
      let params = this.reserList
      // console.log('提交的表单参数', params)

      if (params.content == null || params.content == '') {
        uni.showModal({
          title: '提示',
          showCancel: false,
          content: '项目名称没有填写, 请返回修改',
        })
      } else if (params.opentypeid == null || params.opentypeid == '') {
        uni.showModal({
          title: '提示',
          showCancel: false,
          content: '预约类型没有填写, 请返回修改',
        })
      } else {
        params.userid = this.userid
        params.opentypeid = parseInt(params.opentypeid)
        params.usernum = parseInt(params.usernum)

        //判断座位数
        if (
          params.usernum > this.lab.seatnum ||
          params.usernum == null ||
          params.usernum == '' ||
          params.usernum == undefined ||
          isNaN(params.usernum)
        ) {
          this.submitting = false
          uni.showModal({
            title: '提示',
            showCancel: false,
            content:
              '实验室最大承受人数为 ' + this.lab.seatnum + '人, 请返回修改',
            success: function (res) {
              if (res.confirm) {
                return false
              }
            },
          })
        } else {
          // 防止出现null值直接插入预约单
          for (var key in params) {
            if (params[key] == null) {
              params[key] = ''
            }
          }
          // console.log('处理后的预约单', params)

          // 编辑模式， 修改预约单
          if (this.isEdit == true) {
            this.modify(params)
          } else {
            this.add(params)
          }
        }
      }
    },
    modify(params) {
      // console.log('modify')
      const _this = this
      modLmsLabOpen(params).then((res) => {
        // console.log('修改预约单接口结果', res)
        if (res.data.data.code == '0') {
          this.submitting = false
          // 修改预约成功
          uni.showModal({
            title: res.data.data.message,
            content: '请等待管理员审核, 在预约单中刷新可查看审核状态',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                uni.switchTab({
                  url: '/pages/reservation-list/index',
                  success() {
                    let page = getCurrentPages().pop() //跳转页面成功之后
                    if (!page) return
                    page.onPullDownRefresh() //如果页面存在，则重新刷新页面
                  },
                })
              }
            },
          })
        } else {
          this.submitting = false
          uni.showModal({
            title: '修改失败,请返回重新填写预约单',
            showCancel: false,
            content: res.data.data.message,
            success: function (res) {
              if (res.confirm) {
              }
            },
          })
        }
      })
    },
    /**
     * 由前端发送
     */
    // add_front(params) {
    //   const _this = this
    //   add_lms_lab_open(params).then((res) => {
    //     // console.log(res)
    //     /**
    //      * 判断预约成功/失败的标志
    //      *  1 code: 0成功 -1未成功
    //      *  2 message '预约成功'
    //      *  3 success true成功 flase失败
    //      */
    //     if (res.data.code === '0') {
    //       // 预约成功
    //       uni.showModal({
    //         title: res.data.message,
    //         content: '请等待管理员审核',
    //         showCancel: false,
    //         success: function (res) {
    //           if (res.confirm) {
    //             uni.switchTab({
    //               url: '/pages/laboratory/index',
    //             })
    //           }
    //         },
    //       })
    //     } else {
    //       uni.showModal({
    //         title: '预约失败,请返回重新填写预约单',
    //         showCancel: false,
    //         content: res.data.message,
    //       })
    //     }
    //   })
    // },
    add(params) {
      const _this = this

      add_lms_lab_open_backend(params).then((res) => {
        // console.log(res.data.data)
        if (res.data.data.code == '0') {
          this.submitting = false
          // 预约成功
          uni.showModal({
            title: res.data.data.message,
            content: '请等待管理员审核, 在预约单中刷新可查看审核状态',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                if (_this.continue_ == true) {
                  // 续约模式
                  // console.log('续约模式')
                  uni.switchTab({
                    url: '/pages/reservation-list/index',
                    success() {
                      let page = getCurrentPages().pop() //跳转页面成功之后
                      if (!page) return
                      page.onPullDownRefresh() //如果页面存在，则重新刷新页面
                    },
                  })
                } else {
                  uni.switchTab({
                    url: '/pages/laboratory/index',
                  })
                }
              }
            },
          })
        } else {
          this.submitting = false
          uni.showModal({
            title: '预约失败,请返回重新填写预约单',
            showCancel: false,
            content: res.data.data.message,
          })
        }
      })
    },
    isExpend() {
      this.checked = !this.checked
      this.reserList.expend = this.checked == true ? 1 : 0
      if (this.reserList.expend == 1) {
        uni.showModal({
          title: '提示',
          showCancel: false,
          content:
            '因材料和易耗品需产生费用，如需使用，请在预约后联系实验室负责人',
        })
      }
    },
    isAgree() {
      this.agree = !this.agree
    },
    PickerChange(e) {
      this.index = e.detail.value
      this.reserList.opentypeid = parseInt(e.detail.value) + 1
    },
  },
}
</script>

<style lang="scss">
.reser-list-outer {
  margin: 20rpx 9rpx;
}
</style>
