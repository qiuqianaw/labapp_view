<template>
  <view id="index-outer">
    <announce></announce>
  </view>
</template>

<script>
import announce from "./components/announce.vue";
export default {
  components: {
    announce: announce,
  },
};
</script>

<style lang="scss">
@import "./style/index.scss";
</style>
