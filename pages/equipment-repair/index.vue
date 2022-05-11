<template>
  <view id="index-outer">
    <failure-describe></failure-describe>
  </view>
</template>

<script>
import failureDescribe from "./components/failure-describe.vue";
export default {
  components: {
    "failure-describe": failureDescribe,
  },
};
</script>

<style lang="scss">
@import "./style/index.scss";
</style>
