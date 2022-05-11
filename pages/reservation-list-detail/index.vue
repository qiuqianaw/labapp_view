<template>
  <view>
    <reserve-page
      :lessons="lessons"
      :lab="lab"
      :labschedulelist="labschedulelist"
      :reserListGet="reserListGet"
      @getLessons="getLessons"
    ></reserve-page>
  </view>
</template>

<script>
// import { queryLabScheduleList } from '@/api/index.js'
import { getLabInfoById, queryLabScheduleList } from '@/api/module.js'
import reservePage from '@/components/reserve-page/index.vue'
export default {
  components: {
    'reserve-page': reservePage,
  },
  props: {},
  data() {
    return {
      lessons: [],
      lab: {},
      labschedulelist: [],
      reserListGet: {},
    }
  },
  methods: {
    getLessons(val) {
      this.lessons = val
      var temp = []
      for (var key in this.lessons) {
        temp.push(this.lessons[key])
      }
      // this.lessons = val
    },
  },
  watch: {},
  mounted() {},
  onLoad(option) {
    var params = JSON.parse(option.params)
    // console.log('点击编辑后传入的参数', params)
    this.reserListGet = params
    // TODO 查询lab详情
    this.lab.labid = this.reserListGet.labid
    getLabInfoById(this.lab.labid).then((res) => {
      // console.log(res)
      this.lab.seatnum = res.data.data.seatnum
    })
    queryLabScheduleList(params.labid).then((res) => {
      // console.log('调用调用调用', res)
      this.labschedulelist = res.data.data.labschedulelist
    })
  },
}
</script>

<style></style>
