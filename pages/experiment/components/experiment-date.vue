<template>
  <view class="container">
    <van-calendar
      color="#1f8dd6d2"
      :poppable="false"
      :show-confirm="false"
      class="calendar"
    />
    <view class="experience_content">
      <van-cell-group>
        <van-cell title="实验课程：无线网络技术" />
        <van-cell title="实验项目：Zigbee组网" />
        <van-cell title="地点：A2-304 物联网技术实验室" />
      </van-cell-group>
    </view>
  </view>
</template>

<script>
</script>

<style lang="scss">
@import "./style/experiment-date.scss";
</style>
