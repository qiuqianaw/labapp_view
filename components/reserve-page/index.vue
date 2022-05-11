<template>
  <view>
    <view>
      <tips :lessonsNew="lessonsSon"></tips>
      <reserve
        :lab="lab"
        :labschedulelist="labschedulelist"
        :isEdit="isEdit"
        :mergeLessons="mergeLessons"
        @lessonsNew="lessonsNew"
      ></reserve>
    </view>
    <view>
      <reser-list
        :lab="lab"
        :lessons="lessonsSon"
        :reserListGet="reserListGet"
        :isEdit="isEdit"
        :continue_="continue_"
        @getLabReservationrecordList="getLabReservationrecordList"
      ></reser-list>
    </view>
  </view>
</template>

<script>
import tips from './components/tips.vue'
import reserve from './components/reserve/index.vue'
import reserList from './components/reser-list.vue'
import { deteleObject } from '@/utils/curriculum/curriculum.js'
export default {
  components: {
    'reser-list': reserList,
    reserve: reserve,
    tips: tips,
  },
  data() {
    return {
      lessonsSon: [],
      isEdit: false,
      mergeLessons: [],
      continue_: false,
    }
  },
  watch: {
    reserListGet(val) {
      // console.log('chaaaa', val)
      // 编辑模式
      if (val.openid != null) {
        this.isEdit = true
        // console.log('edit model')
      } else {
        // 续约模式
        this.continue_ = true
        // console.log('continue model')
      }
    },
    lessons(val) {
      // console.log('reserve-page-lesson', val)
    },
  },
  props: {
    lab: {
      type: Object,
      default: function () {
        return {}
      },
    },
    labschedulelist: {
      type: Array,
      default: function () {
        return []
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
  },
  methods: {
    lessonsNew(val) {
      // console.log('yaodeval', val)
      if (this.mergeLessons.length < val.length) {
        this.getLabReservationrecordList(val)
      }
      this.lessonsSon = val
      this.$emit('lessonsNew', val)
    },
    getLabReservationrecordList(val) {
      this.mergeLessons = val
    },
  },
  mounted() {
    uni.getStorage({
      key: 'userInfo',
      fail: function (res) {
        uni.navigateTo({
          url: '/pages/login/index?code=401',
        })
      },
    })
  },
}
</script>

<style></style>
