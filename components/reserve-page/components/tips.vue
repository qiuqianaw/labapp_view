<template>
  <view class="margin-top-xs">
    <view>
      <!-- <van-notice-bar
        scrollable
        mode="closeable"
        color="#1989fa"
        background="#ecf9ff"
        left-icon="info-o"
        text="由于接口问题，目前只有 ***未被占用的课时*** 能预约或修改预约成功；回显已预约课时只能回显时间为当前周的课时"
      /> -->
    </view>
    <view class="bg-white radius padding text-grey">
      <view class="text-sm"
        ><span>注1：只有状态为 "开放" 或 "空闲" 时，才可选中该课时 </span></view
      >
      <view class="text-sm"
        ><span
          >注2：最大预约课时为 70 课时<span
            v-if="lessonsNew.length != 0"
            class="text-sm"
            :class="lessonsNew.length > 35 ? 'text-red' : 'text-green'"
          >
            （已选：{{ lessonsNew.length * 2 }} 课时）
            <text
              v-if="lessonsNew.length > 35"
              class="cuIcon-roundclosefill text-red"
            >
            </text> </span
          ><span v-else class="text-sm text-red">请至少选择 2 课时</span></span
        ></view
      >
    </view>
  </view>
</template>

<script>
export default {
  props: {
    lessonsNew: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
};
</script>

<style></style>
