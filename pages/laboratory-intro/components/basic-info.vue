<template>
  <view>
    <view class="text-grey">
      <view class="cu-bar solid-bottom bg-white">
        <view class="action">
          <text class="cuIcon-titles text-orange"></text>基本信息
        </view>
      </view>
      <form>
        <view class="cu-form-group radius">
          <view class="title">名称: </view>
          <input class="text-cut" disabled :placeholder="lab.labname" />
        </view>
        <view class="cu-form-group radius">
          <view class="title">位置: </view>
          <input
            disabled
            :placeholder="
              lab.campus + ' / ' + lab.building + ' / ' + lab.labroom
            "
          />
        </view>
        <view class="cu-form-group radius" @click="show = true">
          <view class="title">所属专业: </view>
          <input
            class="text-cut"
            disabled
            :placeholder="lab.multiplexingmajor"
          />
        </view>
        <view class="cu-form-group radius">
          <view class="title">座位数/使用面积: </view>
          <input
            disabled
            :placeholder="lab.seatnum + ' / ' + parseInt(lab.area) + 'm²'"
          />
        </view>
        <view class="cu-form-group radius">
          <view class="title">管理单位: </view>
          <input disabled :placeholder="lab.mgrdepart" />
        </view>
        <view class="cu-form-group radius">
          <view class="title">负责人: </view>
          <input disabled :placeholder="lab.username + ' / ' + lab.telphone" />
        </view>
        <view class="cu-form-group radius" v-if="lab.username2 != null">
          <view class="title">负责人2: </view>
          <input
            disabled
            :placeholder="lab.username2 + ' / ' + lab.telphone2"
          />
        </view>
      </form>
    </view>
    <view>
      <van-overlay :show="show" @click="show = false">
        <div class="wrapper">
          <div class="block radius padding-sm bg-gray text-grey">
            <view class="cu-bar">
              <view class="action">
                <text class="cuIcon-title text-blue"></text>
                所属专业
              </view>
            </view>
            <form>
              <view class="cu-form-group radius padding">
                <text>{{ lab.multiplexingmajor }}</text>
              </view>
            </form>
          </div>
        </div>
      </van-overlay>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    }
  },
  mounted() {},
  props: {
    lab: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  methods: {},
}
</script>

<style lang="scss">
@import './style/basic-info.scss';
</style>
