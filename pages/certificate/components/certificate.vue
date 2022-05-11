<template>
  <view>
    <view v-if="loading == true" class="margin">
      <van-loading color="#0094ff" size="48rpx">正在加载...</van-loading>
    </view>
    <view v-else class="cu-card">
      <view class="cu-item shadow padding" v-if="LabsaUsergetinfo.length == 0">
        <van-empty description="暂无安全证书" />
      </view>
      <view
        class="certificate"
        v-else
        v-for="(item, index) in LabsaUsergetinfo"
        :key="index"
      >
        <view class="username">{{ item.username }}</view>
        <view class="saname">{{ item.saname }}</view>
        <view class="getsatime">{{ item.getsatime }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { getLabsaUsergetinfolist } from "@/api/module.js";
export default {
  props: ["loading", "LabsaUsergetinfo"],
};
</script>

<style lang="scss">
@import "./style/certificate.scss";
</style>
