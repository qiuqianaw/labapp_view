<template>
  <view class="margin-top">
    <view class="cu-bar bg-white solid-bottom">
      <view class="action">
        <text class="cuIcon-titles text-orange"></text> 图文介绍
      </view>
    </view>
    <view class="cu-card dynamic no-card">
      <view class="cu-item shadow padding">
        <!-- <van-empty description="此模块正在开发中..." /> -->
        <view
          class="text-content padding"
          v-if="labDetail.equipmentdesc != null"
        >
          {{ labDetail.equipmentdesc }}
        </view>
        <view class="grid flex-sub padding-lr col-1">
          <view
            v-if="labDetail.main1 != null"
            class="bg-img only-img"
            :style="{ 'background-image': `url(${labDetail.main1})` }"
          >
          </view>
        </view>
        <view
          class="text-content margin-top"
          v-if="labDetail.functiondesc != null"
        >
          {{ labDetail.functiondesc }}
        </view>
        <view class="grid flex-sub padding-lr col-1">
          <view
            v-if="labDetail.main2 != null"
            class="bg-img only-img"
            :style="{ 'background-image': `url(${labDetail.main2})` }"
          >
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    labDetail: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
}
</script>

<style></style>
