<template>
  <view class="upper">
    <view class="bg-white">
      <view class="grid col-3 grid-square padding-sm">
        <view class="bg-grey light">
          <view class="count">{{ count.reviewing }}</view>
          <view class="title">审核中</view>
        </view>
        <view class="bg-olive light">
          <view class="count">{{ count.passed }}</view>
          <view class="title">已通过</view>
        </view>
        <view class="bg-red light">
          <view class="count">{{ count.refused }}</view>
          <view class="title">未通过</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    count: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
}
</script>

<style lang="scss">
@import './style/status.scss';
</style>
