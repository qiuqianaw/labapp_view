<template>
  <view id="index-outer">
    <van-tabs swipeable color="#1f8dd6d2">
      <van-tab title="值班信息">
        <duty-information></duty-information>
      </van-tab>
      <van-tab title="业务查询">
        <business-search></business-search>
      </van-tab>
      <van-tab title="问题反馈">
        <question-back></question-back>
      </van-tab>
    </van-tabs>
  </view>
</template>

<script>
import dutyInformation from "./components/duty-information.vue";
import businessSearch from "./components/business-search.vue";
import questionBack from "./components/question-back.vue";
export default {
  components: {
    "duty-information": dutyInformation,
    "business-search": businessSearch,
    "question-back": questionBack,
  },
  data() {
    return {
      dutyInformation_hidden: true,
      businessSearch_hidden: false,
      questionBack_hidden: false,
    };
  },
};
</script>

<style lang="scss">
@import "./style/index.scss";
</style>
