<template>
  <view>
    <view
      class="flex-sub padding-xs margin-top-sm text-sm text-grey"
      v-for="(item, index) in days"
      :key="index"
      >{{ item }}</view
    >
  </view>
</template>

<script>
export default {
  data() {
    return {
      days: ['节次', '一二', '三四', '五六', '七八', '九十', '十一'],
    }
  },
}
</script>

<style></style>
