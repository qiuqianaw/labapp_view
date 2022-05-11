<template>
  <view class="margin-xs margin-top">
    <view class="cu-bar bg-white solid-bottom">
      <view class="action">
        <text class="cuIcon-titles text-orange"></text>本周课表
      </view>
      <view class="cu-tag round margin bg-grey light"
        ><text class="cuIcon-locationfill text-white text-sm" />{{
          lab.labroom
        }}
      </view>
    </view>
    <view class="bg-white flex radius padding-bottom-sm justify-center">
      <view class="order solid-right">
        <order></order>
      </view>
      <view class="schedul margin-left-xs">
        <schedule
          :gridItemSuccess="gridItemSuccess"
          :weekDay="weekDay"
          :lab="lab"
          @get-last-weeks-data="getLastWeeksData"
          @get-next-weeks-data="getNextWeeksData"
          :minDay="minDay"
          :maxDay="maxDay"
          :baseDay="baseDay"
        ></schedule>
      </view>
    </view>
  </view>
</template>

<script>
import schedule from '../schedule/component/schedule.vue'
import order from '../schedule/component/order.vue'
import {
  Trim,
  myFormatConversion,
  initializeAWeeksData,
  mergeAndProcess,
  getBaseWeekDay,
} from '@/utils/curriculum/curriculum.js'

export default {
  components: {
    schedule: schedule,
    order: order,
  },
  props: {
    labschedulelist: {
      type: Array,
      default: function () {
        return []
      },
    },
    lab: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  watch: {
    // 监听父组件传过来的值 接收值以后再出发逻辑处理
    // !!!由于该触发机制，如果labschedulelist没有值，所有！！所有数据都不会渲染
    labschedulelist(val) {
      if (val) {
        this.queryLabScheduleList()
      }
    },
    baseDay(val) {
      // console.log('baseDay改变', formatDate(val))
      this.days = getBaseWeekDay(this.baseDay)
      for (var i = 0; i < this.days.length; i++) {
        this.days[i] = Trim(this.days[i])
      }
      // 获取当前周日期
      this.weekDay = getBaseWeekDay(this.baseDay)
      this.weekDay = myFormatConversion(this.weekDay)
      this.gridItem = initializeAWeeksData(this.days)
      this.gridItemSuccess = mergeAndProcess(
        this.gridItem,
        this.labschedulelist
      )
    },
  },
  data() {
    return {
      // 需要渲染的数据
      gridItem: [],
      // 字符串处理 日期头显示的格式 如 07.9 07.10
      weekDay: [],
      // 接口中获取到的数据
      // 需要渲染的数据处理好格式后
      gridItemSuccess: [],
      days: [],
      // 基准日期
      baseDay: null,
      minDay: null,
      maxDay: null,
    }
  },
  mounted() {},
  methods: {
    queryLabScheduleList() {
      // 计算最早一天和最晚一天
      let min = 99999999,
        max = -1
      this.labschedulelist.forEach((element) => {
        if (element.content != null) {
          // console.log(element.usedate)
          if (element.usedate >= max) {
            max = element.usedate
          }
          if (element.usedate <= min) {
            min = element.usedate
          }
        }
      })
      this.minDay = min
      this.maxDay = max

      //初始化数据
      // 获取当前周日期
      this.baseDay = new Date()
    },
    getLastWeeksData() {
      let day = new Date(this.baseDay)
      this.baseDay = day.setTime(day.getTime() - 24 * 7 * 60 * 60 * 1000)
    },
    getNextWeeksData() {
      let day = new Date(this.baseDay)
      this.baseDay = day.setTime(day.getTime() + 24 * 7 * 60 * 60 * 1000)
    },
  },
}
</script>

<style lang="scss" scoped>
@import './style/index.scss';
</style>
