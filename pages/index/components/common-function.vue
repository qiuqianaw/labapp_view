<template>
  <view class="function" id="function-outer">
    <view class="fun_title">{{ funcsTitle }}</view>
    <view class="func">
      <van-grid clickable square gutter="3" column-num="4" :border="false">
        <!-- 开放预约需要跳转到tab，单独写 -->
        <van-grid-item @click="gotoReserve" use-slot>
          <van-icon name="coupon-o" size="80rpx" />
          <text class="func-title">开放预约</text>
        </van-grid-item>
        <van-grid-item
          v-for="(item, index) in funcs"
          :key="index"
          :url="item.url"
          use-slot
        >
          <van-icon :name="item.name" size="80rpx" />
          <text class="func-title">{{ item.title }}</text>
        </van-grid-item>
        <van-grid-item use-slot @click="toScan">
          <van-icon name="scan" size="80rpx" />
          <text class="func-title">扫一扫</text>
        </van-grid-item>
      </van-grid>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      funcsTitle: ' 常用功能',
      funcs: [
        // {
        //   url: '/pages/user/index',
        //   name: 'coupon-o',
        //   title: '开放预约',
        // },
        {
          url: '/pages/safe-permission/index',
          name: 'bulb-o',
          title: '安全准入',
        },
        {
          url: '/pages/resource-study/index',
          name: 'video-o',
          title: '资源学习',
        },
        {
          url: '/pages/qr-code/index',
          name: 'qr',
          title: '门禁码',
        },
        {
          url: '/pages/questionnaire-visitor/index',
          name: 'records',
          title: '问卷调查',
        },
        {
          url: '/pages/equipment-repair/index',
          name: 'failure',
          title: '设备报修',
        },
        {
          url: '/pages/contact/index',
          name: 'chat-o',
          title: '联系我们',
        },
      ],
    }
  },
  methods: {
    gotoReserve() {
      uni.switchTab({
        url: '/pages/laboratory/index',
      })
    },
    toScan() {
      uni.scanCode({
        success(res) {
          uni.navigateTo({
            url: '/pages/web-view/index?url=' + res.result,
          })
        },
      })
    },
  },
}
</script>

<style lang="scss">
@import './style/common-function.scss';
</style>
