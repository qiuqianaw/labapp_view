<template>
  <view id="index-outer">
    <!--   <van-tabs swipeable color="#1f8dd6d2">
      <van-tab title="实验日历">
        <experiment-date></experiment-date>
      </van-tab>
      <van-tab title="实验项目">
        <experiment-project></experiment-project>
      </van-tab>
    </van-tabs> -->
    <experiment-project
      :LabcourseExpassignVOS="LabcourseExpassignVOS"
      :loading="loading"
      @refresh="getData"
    />
  </view>
</template>

<script>
import experimentDate from "./components/experiment-date.vue";
import experimentProject from "./components/experiment-project.vue";
import { getAllLabcourseExpassignVOS, getCurrentTerm } from "@/api/module.js";
export default {
  components: {
    "experiment-date": experimentDate,
    "experiment-project": experimentProject,
  },
  onPullDownRefresh() {
    const _this = this;
    // console.log('refresh')
    setTimeout(function () {
      _this.getData();
      uni.stopPullDownRefresh();
    }, 300);
  },
  onShow() {
    this.getData();
  },
  data() {
    return {
      calendar_hidden: false,
      project_hidden: true,
      loading: true,
      LabcourseExpassignVOS: "",
      academicyearno: "",
      termno: "",
    };
  },
  methods: {
    getData() {
      this.loading = true;
      getCurrentTerm().then((res) => {
        if (res.data.code == 200) {
          if (res.data.data != null) {
            // console.log(res.data.data)
            this.academicyearno = res.data.data.academicyearno;
            this.termno = res.data.data.termno;
          }
        }
        getAllLabcourseExpassignVOS(this.academicyearno, this.termno).then(
          (res) => {
            if (res.data.code == 200) {
              this.LabcourseExpassignVOS = res.data.data;
              // console.log(res.data.data)
            }
            this.loading = false;
          }
        );
      });
    },
  },
};
</script>

<style lang="scss">
@import "./style/index.scss";
</style>
