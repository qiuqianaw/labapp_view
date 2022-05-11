<template>
  <view>
    <view class="margin-top">
      <view class="cu-bar bg-white solid-bottom">
        <view class="action">
          <text class="cuIcon-titles text-orange"></text> 语音介绍
        </view>
      </view>
      <view class="cu-card dynamic no-card">
        <view class="cu-item shadow padding">
          <view class="audio">
            <!-- <van-empty description="此模块正在开发中..." /> -->
            <audio
              style="text-align: left"
              :src="labDetail.audiourl"
              :poster="labDetail.thumbnail1"
              :name="lab.labname + ' 语音介绍'"
              :author="lab.labroom"
              :action="audioAction"
              controls
            ></audio>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
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
  data() {
    return {
      audioAction: {
        method: 'pause',
      },
    }
  },
}
</script>

<style lang="scss"></style>
