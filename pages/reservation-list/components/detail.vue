<template>
  <view>
    <view class="margin-sm" v-for="(item, index) in sortObjects" :key="index">
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
            <view v-if="item.remarks != null && item.remarks != ''"
              ><text>备注: </text>{{ item.remarks }}</view
            >
            <view
              ><text>预约时间: </text
              ><span class="solid-bottom" @click="viewDetail(item.opendatelist)"
                >{{
                  Math.min.apply(
                    Math,
                    item.opendatelist.map(function (o) {
                      return o.usedate
                    })
                  ) +
                  '~' +
                  Math.max.apply(
                    Math,
                    item.opendatelist.map(function (o) {
                      return o.usedate
                    })
                  )
                }}
                ({{ item.opendatelist.length * 2 }} 学时)</span
              ></view
            >
            <view><text>预约单状态: </text>{{ status[item.status] }}</view>
            <view
              v-if="item.note != null && item.note != ''"
              :class="
                item.status == 3
                  ? 'text-red light'
                  : item.status == 1
                  ? 'text-olive light'
                  : 'text-grey light'
              "
              ><text>审批说明: </text>{{ item.note }}</view
            >

            <view class="flex justify-start margin-right margin-top">
              <!-- 预约单最大预约时间已经超过当前日期时，不允许删除（已使用过，不允许删除预约单） -->
              <!-- 预约状态为0（未审批）时，都可以取消预约 -->
              <view
                v-if="
                  item.status != 0
                    ? false
                    : Math.max.apply(
                        Math,
                        item.opendatelist.map(function (o) {
                          return o.usedate
                        })
                      ) > today
                "
                class="light cu-tag"
                :class="
                  item.status == 3
                    ? 'bg-red light'
                    : item.status == 1
                    ? 'bg-olive light'
                    : 'bg-grey light'
                "
                @click="delete_(item)"
                >取消</view
              >

              <view class="text-grey cu-tag round" @click="continue_(item)"
                >续约</view
              >
              <view
                v-if="item.status == 0"
                class="text-grey cu-tag round"
                @click="getmore(item)"
                >编辑</view
              >
            </view>
          </view>
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
// import { del_lms_lab_open } from '@/api/index.js'
import { del_lms_lab_open } from '@/api/module.js'
import { formatDate } from '@/utils/date/date.js'
import myPopup from '@/components/my-popup/my-popup.vue'

export default {
  components: {
    'my-popup': myPopup,
  },
  watch: {
    reservationList(val) {
      // console.log('接受', val)
    },
  },
  mounted() {
    var myDate = new Date()
    myDate.toLocaleDateString() //获取当前日期
    this.today = this.Trim(formatDate(myDate))
  },
  props: {
    reservationList: {
      type: Array,
      default: function () {
        return []
      },
    },
  },
  watch: {},
  data() {
    return {
      showDetailInfo: [],
      show: false,
      today: '',
      expend: ['否', '是'],
      // status: ['未通过', '审核中', '已通过'],
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
  methods: {
    Trim(str) {
      return str.replace(/\s*/g, '')
    },
    viewDetail(val) {
      // console.log(val)
      this.show = true
      this.showDetailInfo = val
      // console.log('this.showDetailInfo', this.showDetailInfo)
    },
    setShowFalse() {
      this.show = false
    },
    // 由前端发送
    // delete_(item) {
    //   const _this = this
    //   uni.showModal({
    //     title: '确认删除?',
    //     content: '删除后将失去使用所预约实验室的权限',
    //     success: function (res) {
    //       if (res.confirm) {
    //         var params = {
    //           userid: item.userid,
    //           openid: item.reserveid,
    //         }
    //         del_lms_lab_open(params).then((res) => {
    //           console.log(res)
    //           if (res.data.code === '0') {
    //             uni.showModal({
    //               title: '提示',
    //               showCancel: false,
    //               content: res.data.message + '点击确认按钮刷新预约单',
    //               success: function (res) {
    //                 if (res.confirm) {
    //                   _this.$emit('refresh')
    //                 }
    //               },
    //             })
    //           } else {
    //             uni.showModal({
    //               title: '出错了',
    //               showCancel: false,
    //               content: '出现了一些错误，请刷新后重试',
    //               success: function (res) {
    //                 if (res.confirm) {
    //                   _this.$emit('refresh')
    //                 }
    //               },
    //             })
    //           }
    //         })
    //       }
    //     },
    //   })
    // },

    // 由后端转发
    delete_(item) {
      const _this = this
      uni.showModal({
        title: '确认取消预约?',
        // content: '删除后将失去使用所预约实验室的权限',
        success: function (res) {
          if (res.confirm) {
            var params = {
              userid: item.userid,
              openid: item.openid,
            }
            del_lms_lab_open(params).then((res) => {
              // console.log(res)
              if (res.data.data.code === '0') {
                uni.showModal({
                  title: '提示',
                  showCancel: false,
                  content: res.data.data.message + '，点击确认按钮刷新预约单',
                  success: function (res) {
                    if (res.confirm) {
                      _this.$emit('refresh')
                    }
                  },
                })
              } else {
                uni.showModal({
                  title: '出错了',
                  showCancel: false,
                  content: res.data.data.message,
                  success: function (res) {
                    if (res.confirm) {
                      _this.$emit('refresh')
                    }
                  },
                })
              }
            })
          }
        },
      })
    },
    getmore(item) {
      // console.log('下一个页面要渲染的数据', item)
      var params = JSON.stringify(item)
      uni.navigateTo({
        url: '/pages/reservation-list-detail/index?params=' + params,
      })
    },
    continue_(item) {
      var params = {
        content: item.content,
        expend: item.expend,
        explain: item.explain,
        guideteacher: item.guideteacher,
        labid: item.labid,
        labroom: item.labroom,
        opentypeid: item.opentypeid,
        remarks: item.remarks,
        userid: item.userid,
        username: item.username,
        usernum: item.usernum,
      }
      // console.log(params)
      uni.navigateTo({
        url:
          '/pages/reservation-list-detail/index?params=' +
          JSON.stringify(params),
      })
    },
  },

  computed: {
    sortObjects: function () {
      return sortBykey(this.reservationList, 'predate')
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
@import './style/detail.scss';
</style>
