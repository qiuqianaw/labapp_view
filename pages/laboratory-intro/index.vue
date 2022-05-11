<template>
  <view id="lab-intro-outer">
    <van-tabs swipeable color="#f37b1d">
      <!-- 介绍 -->
      <van-tab title="介绍">
        <view>
          <view class="text-center"> </view>
          <view class="padding-xs padding-top">
            <van-skeleton title :row="10" :loading="loading">
              <intro :lab="lab"></intro>
            </van-skeleton>
          </view>
        </view>
      </van-tab>
      <!-- 课表 -->
      <van-tab title="课表" class="schedule">
        <schedule :labschedulelist="labschedulelist" :lab="lab"></schedule>
      </van-tab>
      <!-- 预约 -->
      <van-tab title="预约" v-if="lab.openstatus == 1">
        <reserve-page
          :lessons="lessons"
          :lab="lab"
          :labschedulelist="labschedulelist"
          @lessonsNew="lessonsNew"
        ></reserve-page>
      </van-tab>
    </van-tabs>
  </view>
</template>

<script>
import schedule from './components/schedule/index.vue'
import intro from './components/intro.vue'
import reservePage from '@/components/reserve-page/index.vue'
import { queryLabScheduleList } from '@/api/module.js'

export default {
  components: {
    schedule: schedule,
    // 'reser-list': reserList,
    // reserve: reserve,
    intro: intro,
    // tips: tips,
    'reserve-page': reservePage,
  },
  data() {
    return {
      labschedulelist: [],
      lab: {},
      lessons: [],
      loading: true,
    }
  },
  watch: {},
  methods: {
    lessonsNew(val) {
      this.lessons = val
    },
  },
  onLoad(options) {
    // console.log('onLoad')
    // 接收参数
    var params = JSON.parse(options.params)
    // 获取实验室基本信息
    this.lab = params
    this.loading = false
    queryLabScheduleList(params.labroom).then((res) => {
      // console.log('res', res)
      this.labschedulelist = res.data.data.labschedulelist
      // console.log('queryLabScheduleList', this.labschedulelist)
    })
  },
}
</script>

<style lang="scss">
@import './style/index.scss';
</style>
