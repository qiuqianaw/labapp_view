<template>
  <view class="UCenter-bg">
    <image
      :src="wx_userInfo.avatarUrl"
      class="cu-avatar round imager"
      mode="widthFix"
    ></image>
    <view class="text-xl margin-top-sm">{{ userInfo.username }}</view>
    <view class="margin-top-sm">
      <text>{{ userInfo.userid }}</text>
    </view>
    <view class="margin-top-sm">
      <text>{{ userInfo.departname }}</text>
    </view>
    <van-button
      v-if="userInfo.userid == undefined"
      type="info"
      size="normal"
      @click="login_"
      >请先登陆</van-button
    >
    <image class="blur_bj" :src="wx_userInfo.avatarUrl"></image>
  </view>
</template>

<script>
export default {
  props: {
    wx_userInfo: {
      type: Object,
      default: function () {
        return {}
      },
    },
    userInfo: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  methods: {
    login_() {
      this.$emit('login_')
    },
  },
}
</script>

<style lang="scss" scoped>
@import './style/profile.scss';
</style>
