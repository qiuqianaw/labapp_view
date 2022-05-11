<template>
  <view>
    <view>
      <view class="solid-bottom">
        <view class="flex solid-bottom padding justify-between">
          <view
            >{{ term.academicyear }}-{{
              term.diffWeek == '**' ? '假期' : term.term
            }}</view
          >
          <view class="radius">
            <button
              class="sm cu-btn cuIcon line-grey cuIcon-back round"
              @click="lastWeek"
              :disabled="pre == false || gridItemSuccess.length == 0"
            ></button>
            <span> 第 {{ term.diffWeek }} 周 </span>
            <button
              class="sm cu-btn cuIcon line-grey cuIcon-right round"
              @click="nextWeek"
              :disabled="next == false || gridItemSuccess.length == 0"
            ></button>
          </view>
        </view>
      </view>
      <view class="bg-white">
        <view class="flex">
          <view
            class="flex-sub padding-xs margin-xs text-xs text-center"
            v-for="(item, index) in weekDay"
            :key="index"
            >{{ item }}</view
          >
        </view>
      </view>
      <view class="bg-white">
        <view class="flex">
          <view
            class="flex-sub padding-xs margin-xs text-sm text-center"
            v-for="(item, index) in days"
            :key="index"
            >{{ item }}</view
          >
        </view>
      </view>
      <view class="bg-white">
        <view
          class="flex"
          v-for="(item, index) in gridItemSuccess"
          :key="index"
        >
          <view
            @click="showDetail(item2)"
            class="flex-sub padding-xs margin-xs radius text-sm text-center"
            v-for="(item2, index2) in item"
            :key="index2"
            :class="
              item2.usestatusname == null
                ? 'bg-grey'
                : item2.usestatusname.slice(0, 2) === '上课' ||
                  item2.usestatusname.slice(0, 2) === '实验'
                ? 'bg-red'
                : 'bg-green'
            "
            >{{
              item2.usestatusname != null
                ? item2.usestatusname.slice(0, 2)
                : '空闲'
            }}</view
          >
        </view>
      </view>
      <view v-if="weekDay[0] == undefined">
        <van-empty description="暂无课表信息～" />
      </view>
    </view>
    <view v-if="showDetailInfo.content != null">
      <van-overlay :show="show" @click="show = false">
        <div class="wrapper">
          <div class="block radius padding bg-grey light">
            <view class="cu-bar">
              <view class="action">
                <text class="cuIcon-title text-blue"></text>
                预约信息
              </view>
            </view>
            <form>
              <view
                class="cu-form-group radius"
                v-if="showDetailInfo.labid != null"
              >
                <view class="title">实验室: </view>
                <input
                  class="text-cut"
                  disabled
                  :placeholder="showDetailInfo.labid"
                />
              </view>
              <view
                class="cu-form-group radius"
                v-if="showDetailInfo.content != null"
              >
                <view class="title">项目名称: </view>
                <input
                  class="text-cut"
                  disabled
                  :placeholder="showDetailInfo.content"
                />
              </view>
              <view
                class="cu-form-group radius"
                v-if="showDetailInfo.userid != null"
              >
                <view class="title">预约人ID: </view>
                <input
                  class="text-cut"
                  disabled
                  :placeholder="showDetailInfo.userid"
                />
              </view>
              <view class="cu-form-group radius" v-if="stuname != null">
                <view class="title">预约人姓名: </view>
                <input class="text-cut" disabled :placeholder="stuname" />
              </view>
              <view
                class="cu-form-group radius"
                v-if="showDetailInfo.opentype != null"
              >
                <view class="title">项目类型: </view>
                <input
                  class="text-cut"
                  disabled
                  :placeholder="showDetailInfo.opentype"
                />
              </view>
              <view
                class="cu-form-group radius"
                v-if="showDetailInfo.usernum != null"
              >
                <view class="title">人数: </view>
                <input
                  class="text-cut"
                  disabled
                  :placeholder="showDetailInfo.usernum"
                />
              </view>
              <view
                class="cu-form-group radius"
                v-if="showDetailInfo.explain != null"
              >
                <view class="title">项目说明: </view>
                <input
                  class="text-cut"
                  disabled
                  :placeholder="showDetailInfo.explain"
                />
              </view>
              <view
                class="cu-form-group radius"
                v-if="showDetailInfo.guideteacher != null"
              >
                <view class="title">指导教师: </view>
                <input
                  class="text-cut"
                  disabled
                  :placeholder="showDetailInfo.guideteacher"
                />
              </view>
              <view
                class="cu-form-group radius"
                v-if="showDetailInfo.remarks != null"
              >
                <view class="title">备注: </view>
                <input
                  class="text-cut"
                  disabled
                  :placeholder="showDetailInfo.remarks"
                />
              </view>
            </form>
          </div>
        </div>
      </van-overlay>
    </view>
  </view>
</template>

<script>
import { formatDate } from '@/utils/date/date.js'
import {
  getBaseWeekDay2,
  calcuWeekDiff,
} from '@/utils/curriculum/curriculum.js'
import { getTermStartTimeByBaseDay, getStuSelfStuinfo } from '@/api/module.js'

export default {
  data() {
    return {
      days: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      show: false,
      showDetailInfo: null,
      pre: true,
      next: true,
      term: null,
      stuname: null,
    }
  },
  watch: {
    baseDay(val) {
      this.pre = getBaseWeekDay2(val)[0] <= this.minDay ? false : true
      this.next = getBaseWeekDay2(val)[6] >= this.maxDay ? false : true
      this.getTerm(val)
    },
    show(val) {
      const _this = this
      if (val == true) {
        this.stuname = null
        // console.log('查这个孙子的信息')
        getStuSelfStuinfo(this.showDetailInfo.userid).then((res) => {
          if (res.data.data.stuinfo != null) {
            console.log(res)
            _this.stuname = res.data.data.stuinfo.studentname
            console.log(_this.stuname)
          }
        })
      }
    },
  },
  mounted() {},
  props: {
    gridItemSuccess: {
      type: Array,
      default: function () {
        return []
      },
    },
    weekDay: {
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
    minDay: {
      type: String,
      default: '',
    },
    maxDay: {
      type: String,
      default: '',
    },
    baseDay: {
      type: Date,
    },
  },
  methods: {
    getTerm(baseDay) {
      baseDay = formatDate(baseDay)
      baseDay =
        baseDay.substring(0, 4) +
        baseDay.substring(5, 7) +
        baseDay.substring(8, 10)
      getTermStartTimeByBaseDay(baseDay).then((res) => {
        // console.log('term', res)
        this.term = res.data.data
        this.term.diffWeek = calcuWeekDiff(this.term.starttime, baseDay)
      })
    },
    lastWeek() {
      this.$emit('get-last-weeks-data')
    },
    nextWeek() {
      this.$emit('get-next-weeks-data')
    },
    showDetail(item2) {
      this.show = true
      this.showDetailInfo = item2
      console.log('item2', item2)
    },
  },
}
</script>

<style>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: auto;
  height: auto;
}
</style>
