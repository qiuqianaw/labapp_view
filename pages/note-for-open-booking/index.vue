<template>
  <view class="bg-white margin padding radius">
    <view class="container">
      <view class="content">
        <view class="head">实验室开放预约注意事项</view>
        <view class="other">
          <view class="title">一、预约签到</view>
          <view>
            （1）实验室全面采用预约开放管理，通过审核后，
            在预约时间使用小程序个人二维码在门禁机上成功扫
            码开门(闪绿灯)，同时自动完成预约签到。
          </view>
          <view>
            （2）有效预约签到时间为您预约的节次时间加上课
            前的课间时间(第1-2节从7点开始)。
          </view>
          <view>
            （3）如实验室当时已经开门，也一定要在门禁机上 扫码进行预约签到。
          </view>
          <view>
            （4）同一项目同一日预约了多个时间段，仅成功扫码签到一次即可。多人项目，其中一人进行门禁扫码
            签到即可。
          </view>

          <view class="title">二、取消/修改预约</view>
          <view>
            预约后，请您按时使用实验室。如不能按时使
            用，请您在实验平台开放预约/小程序预约单中及时
            取消或修改预约(支持局部取消和修改)，否则会影 响您的信用。
          </view>

          <view class="title">三、爽约</view>
          <view>
            逾期未按预约时间使用实验室(当日无有效预约
            签到信息)，或未及时改约/取消预约者，该次预约 作废，同时记录爽约1次。
          </view>

          <view class="title">四、爽约处理</view>
          <view>
            用户累计【3】次爽约，自第【3】次爽约之日 起【7】日内禁止再次预约。
          </view>
        </view>
        <view class="signature">实验实训中心</view>
        <view class="signature">2020年6月1日</view>
      </view>
      <view class="text-center padding">
        <van-button @click="ok" color="#0081ff" type="primary"
          >继续续约</van-button
        >
      </view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    ok() {
      uni.navigateBack({
        delta: 1,
      })
    },
  },
}
</script>

<style lang="scss">
.container {
  .content {
    height: auto;
    width: 93%;
    // background-color: aqua;
    // margin: 15rpx auto;
    // padding: 20rpx 15rpx;
    .head {
      text-align: center;
      font-weight: bold;
      font-size: 33rpx;
    }
    .other {
      letter-spacing: 1rpx;
      height: auto;
      margin: 10rpx;
      font-size: 30rpx;
      // background-color: antiquewhite;
      .title {
        text-align: left;
        font-weight: bold;
      }
    }
    .signature {
      text-align: right;
    }
  }
}
</style>
