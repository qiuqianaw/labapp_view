<template>
  <van-popup
    :show="show"
    @close="setShowFalse"
    position="bottom"
    round
    closeable
  >
    <div class="block bg-grey light">
      <view class="cu-bar">
        <view class="action">
          <text class="cuIcon-title text-blue"></text>
          使用时间
        </view>
      </view>
      <form>
        <view
          class="cu-form-group radius"
          v-for="(item, index) in sortObjects"
          :key="index"
        >
          <input
            class="text-cut"
            disabled
            :placeholder="
              item.usedate +
              ' | ' +
              item.lesson +
              ' (周' +
              cacul(item.usedate) +
              ')'
            "
          />
        </view>
      </form>
    </div>
  </van-popup>
</template>

<script>
import { getWeekByDay } from '@/utils/curriculum/curriculum.js'

export default {
  props: {
    showDetailInfo: {
      type: Array,
      default: function () {
        return []
      },
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    cacul(param) {
      return getWeekByDay(param)
    },
    setShowFalse() {
      this.$emit('set-show-false')
    },
  },
  computed: {
    sortObjects: function () {
      return sortBykey(this.showDetailInfo, 'usedate')
    },
  },
}
function sortBykey(ary, key) {
  return ary.sort(function (a, b) {
    let x = a[key]
    let y = b[key]
    return x < y ? -1 : x > y ? 1 : 0
  })
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
}

.block {
  width: auto;
  height: 80%;
}
</style>
