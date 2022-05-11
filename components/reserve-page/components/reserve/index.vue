<template>
  <view class="schedule-outer padding-xs">
    <view class="cu-bar bg-white solid-bottom">
      <view class="action">
        <text class="cuIcon-titles text-orange"></text>选择课时
      </view>
      <view class="cu-tag round margin bg-grey light"
        ><text class="cuIcon-locationfill text-white text-sm" />{{
          lab.labroom == null ? lab.labid : lab.labroom
        }}
      </view>
    </view>

    <view class="bg-white flex radius justify-center">
      <view class="order solid-right">
        <order></order>
      </view>
      <view class="schedul margin-left-xs bg">
        <schedule
          :gridItemSuccess="gridItemSuccess"
          :weekDay="weekDay"
          :lab="lab"
          :mergeLessons="mergeLessons"
          @lessonsNew="lessonsNew"
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
import schedule from './components/schedule.vue'
import order from './components/order.vue'
import {
  initializeAWeeksDataReserve,
  mergeAndProcessReserve,
  Trim,
  getBaseWeekDay,
  myFormatConversion,
  getBaseWeekDay2,
  Trim2,
  baseDayPreNextFourWeekDay,
} from '@/utils/curriculum/curriculum.js'
import { formatDate } from '@/utils/date/date.js'
export default {
  components: {
    schedule: schedule,
    order: order,
  },
  props: {
    mergeLessons: {
      type: Array,
      default: function () {
        return []
      },
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
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
    labschedulelist(val) {
      // console.log('reserve components labschedulelist', val)
      // 接收到值以后才进行下一步操作，否则所有数据都不会渲染！
      this.queryLabScheduleList()
    },
    baseDay(val) {
      // console.log('baseDay change', val)
      // console.log('this.baseDay', this.baseDay)

      this.days = getBaseWeekDay(this.baseDay)
      // console.log('this.days', this.days)

      for (var i = 0; i < this.days.length; i++) {
        this.days[i] = Trim(this.days[i])
      }
      // console.log('this.days', this.days)

      this.weekDay = getBaseWeekDay(this.baseDay)
      this.weekDay = myFormatConversion(this.weekDay)
      // console.log('this.weekDay', this.weekDay)

      // 初始化 gridItem
      this.gridItem = []
      this.gridItem = initializeAWeeksDataReserve(this.days)
      // console.log('this.gridItem', this.gridItem)

      // 合并接口数据到初始化
      this.gridItemSuccess = mergeAndProcessReserve(
        this.gridItem,
        this.labschedulelist
      )
      // console.log('this.gridItemSuccess', this.gridItemSuccess)
    },
  },
  data() {
    return {
      lessons: ['12', '34', '56', '78', '90', '11'],
      // 需要渲染的数据
      gridItem: [],
      // 字符串处理 日期头显示的格式 如 07.9 07.10
      weekDay: [],
      // 接口中获取到的数据
      // 需要渲染的数据处理好格式后
      gridItemSuccess: [],
      days: [],
      baseDay: null,
      minDay: null,
      maxDay: null,
    }
  },
  mounted() {
    this.queryLabScheduleList()
  },
  methods: {
    lessonsNew(val) {
      this.$emit('lessonsNew', val)
    },
    queryLabScheduleList() {
      this.baseDay = new Date()
      // 是否选中的标志
      this.labschedulelist.forEach((element) => {
        element.flag = false
      })
      this.minDay = baseDayPreNextFourWeekDay(this.baseDay, 'min')
      this.maxDay = baseDayPreNextFourWeekDay(this.baseDay, 'max')

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
