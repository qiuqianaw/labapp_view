<template>
  <view class="bg-white radius padding text-grey">
    <view class="text-sm"
      ><span
        >注1：只有状态为 "开放" 或 "可用" 时，才可选中该课时<span
          class="text-red"
          >(由于接口问题，目前只有 "可用" 状态能预约成功)</span
        ></span
      ></view
    >
    <view class="text-sm"
      ><span
        >注2：最大预约课时为 70 课时<span
          v-if="lessons.length != 0"
          class="text-sm"
        >
          （已选：{{ lessons.length * 2 }} 课时）
          <text
            v-if="lessons.length > 35"
            class="cuIcon-roundclosefill text-red"
          >
          </text> </span
        ><span v-else class="text-sm text-red">请至少选择 2 课时</span></span
      ></view
    >
  </view>
</template>

<script>
export default {
  props: {
    lessons: {
      type: Array,
      default: function () {
        return []
      },
    },
  },
}
</script>

<style></style>
