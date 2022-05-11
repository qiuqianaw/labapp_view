<template>
  <view>
    <van-loading class="loading" v-if="loading" size="24px" color="#0094ff"
      >正在处理数据，请稍候...</van-loading
    >
    <van-empty
      v-if="sortObjects.length == 0 && loading == false"
      description="近一个月内暂无带审批的预约单"
    />
    <view
      class="margin-sm solid-bottom"
      v-for="(item, index) in sortObjects"
      :key="index"
    >
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">
          <text
            class="cuIcon-title"
            :class="
              item.status == 3
                ? 'text-red light'
                : item.status == 1
                ? 'text-olive light'
                : 'text-grey light'
            "
          ></text>
          {{ item.content }}
        </view>
        <view class="text-left"
          ><view
            class="cu-tag round margin"
            :class="
              item.status == 3
                ? 'bg-red light'
                : item.status == 1
                ? 'bg-olive light'
                : 'bg-grey light'
            "
            ><text class="cuIcon-locationfill text-white text-sm" />{{
              item.labid
            }}
          </view>
        </view>
      </view>
      <view class="cu-card dynamic no-card">
        <view class="cu-item shadow padding">
          <view class="text-left text-grey">
            <view
              ><text>项目类型: </text> {{ opentype[item.opentypeid - 1] }}</view
            >
            <view v-if="item.userid != null && item.userid != ''"
              ><text>申请人id: </text> {{ item.userid }}
              <text v-if="item.username != null && item.username != ''"
                >({{ item.username }})</text
              ></view
            >
            <view v-if="item.guideteacher != null && item.guideteacher != ''"
              ><text>指导教师: </text> {{ item.guideteacher }}</view
            >
            <view v-if="item.explain != null && item.explain != ''"
              ><text>项目说明: </text>{{ item.explain }}</view
            >
            <view v-if="item.usernum != null && item.usernum != ''"
              ><text>使用人数: </text>{{ item.usernum }}</view
            >
            <view><text>是否需要材料: </text>{{ expend[item.expend] }}</view>

            <view><text>申请时间: </text>{{ item.predate }}</view>

            <view v-if="item.opendatelist != null && item.opendatelist != ''"
              ><text>使用时间: </text>
              <span class="solid-bottom" @click="viewDetail(item.opendatelist)"
                >共 {{ item.opendatelist.length * 2 }} 课时</span
              >
            </view>
            <view v-if="item.remarks != null && item.remarks != ''"
              ><text>备注: </text>{{ item.remarks }}</view
            >
            <view><text>预约单状态: </text>{{ status[item.status] }}</view>
          </view>
        </view>
      </view>
      <view class="bg-white">
        <view class="padding-left solid-bottom">
          <input
            v-model="item.note"
            placeholder="审批说明(选填)"
            name="input"
          />
        </view>
        <view class="padding flex flex-wrap justify-between align-center">
          <button class="cu-btn bg-red light" @click="refuse(item)">
            拒绝
          </button>
          <button class="cu-btn bg-green light" @click="pass(item)">
            通过
          </button>
        </view>
      </view>
    </view>
    <my-popup
      :showDetailInfo="showDetailInfo"
      :show="show"
      @set-show-false="setShowFalse"
    ></my-popup>
  </view>
</template>

<script>
import {
  query_device_list,
  getAllReservation,
  reservationCheck,
  getStuSelfStuinfo,
} from '@/api/module.js'

import { deteleObject } from '@/utils/curriculum/curriculum.js'

import myPopup from '@/components/my-popup/my-popup.vue'
export default {
  components: {
    'my-popup': myPopup,
  },
  props: {},
  watch: {
    // qiuqian TODO
    // loading(val) {
    //   let usernameList = []
    //   let uidList = []
    //   if (val == false && this.res.length != 0) {
    //     for (let i = 0; i < this.res.length; i++) {
    //       let uid = this.res[i].userid
    //       if (uid[0] <= '9' && uid[0] >= '0') {
    //         // console.log('uid', uid)
    //         uidList.push(uid)
    //       }
    //     }
    //     uidList = deteleObject(uidList)
    //     for (let i = 0; i < uidList.length; i++) {
    //       getStuSelfStuinfo(uidList[i]).then((res) => {
    //         // console.log(res)
    //         if (res.data.data.stuinfo != null) {
    //           let temp = {}
    //           temp.username = res.data.data.stuinfo.studentname
    //           temp.userid = res.data.data.stuinfo.studentno
    //           usernameList.push(temp)
    //         }
    //       })
    //     }
    //     // console.log('uidList', uidList)
    //     console.log('usernameList', usernameList)
    //     console.log('usernameList type', typeof usernameList)

    //     this.res.forEach((element) => {
    //       console.log('element', element)
    //       for (let i = 0; i < usernameList.length; i++) {
    //         console.log('element2', usernameList[i].userid)
    //       }
    //     })
    //   }
    // },
  },
  methods: {
    viewDetail(val) {
      // console.log(val)
      this.show = true
      this.showDetailInfo = val
      // console.log('this.showDetailInfo', this.showDetailInfo)
    },
    onPullDownRefresh() {
      const _this = this
      // console.log('refresh')
      setTimeout(function () {
        _this.getData()
        uni.stopPullDownRefresh()
      }, 100)
    },
    getData() {
      this.loading = true
      const userInfo = uni.getStorageSync('userInfo')
      this.userInfo = userInfo
      // console.log(this.userInfo)
      let arr1 = []
      let arr2 = []
      const _this = this

      query_device_list().then((res) => {
        if (res.data.code == '0') {
          arr1 = res.data.items
          getAllReservation().then((res) => {
            arr2 = res.data.data.labopenlist
            _this.res = []
            arr1.forEach((element) => {
              arr2.forEach((element2) => {
                if (
                  element.device_name == element2.labid &&
                  element2.status == 0
                ) {
                  _this.res.push(element2)
                }
              })
            })

            _this.loading = false
          })
        }
      })
    },
    refuse(params) {
      const _this = this
      uni.showModal({
        title: '提示',
        content: '确认要拒绝吗？',
        success: function (res) {
          if (res.confirm) {
            params.userInfo = _this.userInfo
            params.status = 3
            reservationCheck(params).then((res) => {
              // console.log(res)
              let status_ = 3
              _this.showMyModal(status_)
            })
          }
        },
      })
    },
    pass(params) {
      const _this = this
      uni.showModal({
        title: '提示',
        content: '确认要通过吗？',
        success: function (res) {
          if (res.confirm) {
            params.userInfo = _this.userInfo
            params.status = 1
            reservationCheck(params).then((res) => {
              // console.log(res)
              let status_ = 1
              _this.showMyModal(status_)
            })
          }
        },
      })
    },
    showMyModal(status_) {
      const _this = this
      uni.showModal({
        title: status_ == '1' ? '已通过' : '已拒绝',
        showCancel: false,
        content: '点击确认刷新',
        success: function (res) {
          if (res.confirm) {
            _this.getData()
          }
        },
      })
    },
    setShowFalse() {
      this.show = false
    },
  },
  mounted() {
    this.getData()
    // console.log('test', getWeekByDay('20210801'))
  },
  data() {
    return {
      week: ['日', '一', '二', '三', '四', '五', '六'],
      showDetailInfo: [],
      show: false,
      note: '',
      loading: true,
      res: [],
      userInfo: null,
      expend: ['否', '是'],
      status: {
        0: '审核中',
        1: '已通过',
        3: '未通过',
      },
      opentype: [
        '大创/竞赛项目',
        '毕设设计项目',
        '课程实验项目',
        '教师科研项目',
        '其他',
      ],
    }
  },
  computed: {
    sortObjects: function () {
      return sortBykey(this.res, 'predate')
    },
  },
}
function sortBykey(ary, key) {
  return ary.sort(function (a, b) {
    let x = a[key]
    let y = b[key]
    return x > y ? -1 : x < y ? 1 : 0
  })
}
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  // align-items: center;
  justify-content: center;
}
</style>
