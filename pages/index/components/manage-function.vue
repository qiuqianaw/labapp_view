<template>
  <view class="function" id="function-outer">
    <view class="fun_title">{{ funcsTitle }}</view>
    <view class="func">
      <van-grid clickable square gutter="3" column-num="3" :border="false">
        <van-grid-item
          v-for="(item, index) in funcs"
          :key="index"
          :url="item.url"
          use-slot
        >
          <van-icon :name="item.name" size="80rpx" />
          <text class="fun-title">{{ item.title }}</text>
        </van-grid-item>
      </van-grid>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      funcsTitle: '管理功能',
      funcs: [
        {
          url: '/pages/charing-repair/index',
          name: 'warning',
          title: '报修管理',
        },
        // 取消功能
        // {
        //   url: '#',
        //   name: 'todo-list',
        //   title: '借用管理',
        // },
        {
          url: '/pages/remote-control/index',
          name: 'lock',
          title: '门禁管理',
        },
        {
          url: '/pages/reservation-check/index',
          name: 'checked',
          title: '预约审批',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
@import './style/manage-function.scss';
</style>
