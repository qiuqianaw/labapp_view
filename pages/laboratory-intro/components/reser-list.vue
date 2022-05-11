<template>
  <view class="margin-xs">
    <view class="cu-bar bg-white solid-bottom">
      <view class="action">
        <text class="cuIcon-titles text-orange"></text>
        填写预约单
      </view>
      <view class="cu-tag round margin bg-grey light"
        ><text class="cuIcon-locationfill text-white text-sm" />{{
          lab.labroom
        }}
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
              placeholder="必填项,且只能填写数字"
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
          <view>
            <button
              :loading="submitting"
              :disabled="
                reserList.content == null ||
                reserList.content == '' ||
                reserList.usernum == null ||
                reserList.usernum == '' ||
                reserList.opentypeid == null ||
                reserList.opentypeid == '' ||
                reserList.labid == null ||
                reserList.labid == '' ||
                lessons.length == 0 ||
                lessons.length > 35
              "
              @click="submitList"
              class="cu-btn bg-blue block lg margin-xl"
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
  },

  watch: {
    lessons(val) {
      this.reserList.usedate = val
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
    this.reserList.labid = this.lab.labroom
  },
  data() {
    return {
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
      reserList: {
        content: null,
        usernum: null,
        usedate: null,
        labid: null,
        guideteacher: null,
        explain: null,
        opentypeid: null,
        expend: 0,
        remarks: null,
      },
    }
  },

  methods: {
    submitList() {
      this.submitting = true
      let params = this.reserList
      params.userid = this.userid

      // add_lms_lab_open(params).then((res) => {
      //   console.log(res)
      //   /**
      //    * 判断预约成功/失败的标志
      //    *  1 code: 0成功 -1未成功
      //    *  2 message '预约成功'
      //    *  3 success true成功 flase失败
      //    */
      //   if (res.data.code === '0') {
      //     // 预约成功
      //     uni.showModal({
      //       title: res.data.message,
      //       content: '请等待管理员审核',
      //       showCancel: false,
      //       success: function (res) {
      //         if (res.confirm) {
      //           uni.switchTab({
      //             url: '/pages/laboratory/index',
      //           })
      //         }
      //       },
      //     })
      //   } else {
      //     uni.showModal({
      //       title: '预约失败,请返回重新填写预约单',
      //       showCancel: false,
      //       content: res.data.message,
      //     })
      //   }
      // })

      add_lms_lab_open_backend(params).then((res) => {
        // console.log(res.data.data)
        if (res.data.data.code == '0') {
          this.submitting = false
          // 预约成功
          uni.showModal({
            title: res.data.data.message,
            content: '请等待管理员审核',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                uni.switchTab({
                  url: '/pages/laboratory/index',
                })
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
