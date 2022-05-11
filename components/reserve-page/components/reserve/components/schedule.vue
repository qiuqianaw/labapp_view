<template>
  <view>
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
    <view>
      <view class="flex">
        <view
          class="flex-sub padding-xs margin-xs text-xs text-center"
          v-for="(item, index) in weekDay"
          :key="index"
          >{{ item }}</view
        >
      </view>
    </view>
    <view class="">
      <view class="flex">
        <view
          class="flex-sub padding-xs margin-xs text-sm text-center"
          v-for="(item, index) in days"
          :key="index"
          >{{ item }}</view
        >
      </view>
    </view>
    <view class="">
      <view class="flex" v-for="(item, index) in gridItemSuccess" :key="index">
        <view
          class="flex-sub padding-xs margin-xs radius text-sm text-center"
          v-for="(item2, index2) in item"
          @click="choiceLessonsNew(item2, index, index2)"
          :key="index2"
          :class="
            item2.flag == true
              ? 'bg-blue'
              : item2.usestatusname == null
              ? 'bg-grey light'
              : item2.usestatusname.slice(0, 2) === '上课' ||
                item2.usestatusname.slice(0, 2) === '实验'
              ? 'bg-red light'
              : 'bg-green light'
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
</template>

<script>
import { formatDate } from '@/utils/date/date.js'
import {
  getBaseWeekDay2,
  calcuWeekDiff,
} from '@/utils/curriculum/curriculum.js'
import { getTermStartTimeByBaseDay } from '@/api/module.js'
export default {
  mounted() {
    // console.log('this.', this.minDay)
  },
  watch: {
    gridItemSuccess(val) {
      // console.log('gridItemSuccess变化了')
      this.mergeOrderedLessons()
    },
    mergeLessons(val) {
      // 需要合并的课程全部都在这里，每次切换周的时候都循环
      // console.log('合并的lesson', val)
      // this.mergeOrderedLessons()
    },
    baseDay(val) {
      // console.log('watch.baseDay', val)
      this.pre = getBaseWeekDay2(val)[0] <= this.minDay ? false : true
      this.next = getBaseWeekDay2(val)[6] >= this.maxDay ? false : true
      this.getTerm(val)
    },
  },
  data() {
    return {
      days: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      lessons: {},
      lessons2: [],
      lessonsNew: [],
      pre: true,
      next: true,
      term: null,
      diffWeek: null,
    }
  },
  props: {
    mergeLessons: {
      type: Array,
      default: function () {
        return []
      },
    },
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
    choiceLessons(item2, index1, index2) {
      // console.log('有课时被选中了', item2)
      // 选中
      if (item2.flag == false) {
        //先判断能否被选中
        if (
          this.gridItemSuccess[index1][index2].usestatusname != '独占' &&
          this.gridItemSuccess[index1][index2].usestatusname != '上课'
        ) {
          this.gridItemSuccess[index1][index2].flag = true
          // 格式处理
          this.lessons[[item2.usedate] + ',' + [item2.lesson]] =
            item2.usedate + '|' + item2.lesson
          // console.log('watch', this.lessons)
        }
      } else {
        // 取消选中
        this.gridItemSuccess[index1][index2].flag = false
        delete this.lessons[[item2.usedate] + ',' + [item2.lesson]]
      }

      // console.log('已选中的信息', this.lessons)
      this.$emit('getLessons', this.lessons)
    },
    choiceLessonsNew(item) {
      // TODO 在这里处理往后界定日期
      if (false) {
        uni.showModal({
          title: '提示',
          showCancel: false,
          content: '测试，不让点',
        })
      } else {
        // console.log('choiceLessonsNew')
        let temp = {
          usedate: item.usedate,
          lesson: item.lesson,
        }
        // console.log('选中', temp)
        /**
         * 选中流程：
         *    判断当前item.flag是否选中状态
         *    未选中状态（点亮）：
         *        添加进选中数组，判断重不重，item.flag = true
         *    选中（取消点亮）：
         *        从选中数组中删除，item.flag = false
         */
        if (item.usestatusname != '独占' && item.usestatusname != '上课') {
          let flag = this.addLessons(temp, this.lessonsNew)

          if (item.flag == false) {
            if (flag == -1) {
              this.lessonsNew.push(temp)
              this.lessonsNew.forEach((lessonsNewItem) => {
                this.gridItemSuccess.forEach((element) => {
                  element.forEach((element2) => {
                    if (
                      element2.usedate == lessonsNewItem.usedate &&
                      element2.lesson == lessonsNewItem.lesson
                    ) {
                      element2.flag = true
                    }
                  })
                })
              })
            }
          } else if (item.flag == true) {
            this.gridItemSuccess.forEach((element) => {
              element.forEach((element2) => {
                if (
                  element2.usedate == item.usedate &&
                  element2.lesson == item.lesson
                ) {
                  element2.flag = false
                }
              })
            })
            this.lessonsNew.splice(flag, 1)
          }
          // console.log('this.lessonsNew', this.lessonsNew)
          this.$emit('lessonsNew', this.lessonsNew)
        }
      }
    },

    addLessons(item, arr) {
      let res = -1
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].usedate == item.usedate && arr[i].lesson == item.lesson) {
          return i
        }
      }
      return res
    },

    // 让预约单的课程变亮
    mergeOrderedLessons() {
      // console.log('处理合并课程', this.mergeLessons)
      this.mergeLessons.forEach((element) => {
        let flag = this.addLessons(element, this.lessonsNew)
        if (flag == -1) {
          this.lessonsNew.push(element)
        }
      })
      this.lessonsNew.forEach((lessonsNewItem) => {
        this.gridItemSuccess.forEach((element) => {
          element.forEach((element2) => {
            if (
              element2.usedate == lessonsNewItem.usedate &&
              element2.lesson == lessonsNewItem.lesson
            ) {
              element2.flag = true
            }
          })
        })
      })
      // console.log('lessonsNew', this.lessonsNew)

      this.$emit('lessonsNew', this.lessonsNew)
    },
  },
}
</script>

<style></style>
