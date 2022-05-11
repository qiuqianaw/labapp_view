<template>
  <view>
    <view class="bg-white margin">
      <view class="padding" v-for="(item, index) in cancleOrder" :key="index">
        <checkbox></checkbox>{{ item.orderdate + " " + item.orderlesson }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      cancleOrder: [],
    };
  },
  onLoad(option) {
    this.cancleOrder = JSON.parse(option.params).labReservationrecordList;
    // console.log(this.cancleOrder)
  },
};
</script>

<style></style>
