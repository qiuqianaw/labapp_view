<template>
  <view>
    <view class="margin-top">
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">
          <text class="cuIcon-titles text-orange"></text> VR 体验
        </view>
      </view>
      <view class="cu-card dynamic no-card">
        <view class="cu-item shadow padding">
          <view class="qr_code">
            <view class="text-center text-sm text-grey">
              点击下方图片进行 {{ lab.labroom }} VR体验</view
            >
            <view class="text-center text-sm text-grey">
              正在完善相关功能，敬请期待...</view
            >

            <view class="flex solid-bottom padding justify-center">
              <view>
                <!-- <van-button type="primary" @click="vr" block>VR</van-button> -->
                <van-image
                  width="15rem"
                  height="15rem"
                  src="/static/vrimg.jpeg"
                  @click="vr"
                />
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  watch: {
    labDetail(val) {
      // console.log('detail', val)
    },
  },
  props: {
    labDetail: {
      type: Object,
      default: function () {
        return {}
      },
    },
    lab: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  methods: {
    vr() {
      // console.log('发送内容', encodeURIComponent(this.labDetail.vrqrcode))
      uni.navigateTo({
        url:
          '/pages/web-view/index?url=' +
          encodeURIComponent(this.labDetail.vrqrcode),
      })
    },
    scanQRCode() {
      uni.scanCode({
        onlyFromCamera: true,
        success: function (res) {
          // console.log('条码类型：' + res.scanType)
          // console.log('条码内容：' + res.result)
          // 跳转提示页面==>请求数据(成功)==>显示数据;(失败)=>返回工作页面
          plus.runtime.openURL(res.result)
        },
      })
    },
  },
}
</script>

<style lang="scss"></style>
