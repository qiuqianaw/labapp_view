<template>
  <view id="index-outer">
    <status :count="count"></status>
    <view class="margin" v-if="loading == true">
      <van-loading color="#0094ff" size="48rpx"
        >正在刷新，由于数据较多，请耐心等候...</van-loading
      >
    </view>
    <view>
      <view v-if="reservationList == null">
        <van-empty description="暂无预约信息～" />
      </view>
      <detail :reservationList="reservationList" @refresh="getData()"></detail>
    </view>
  </view>
</template>
<script>
import status from './components/status.vue'
import detail from './components/detail.vue'
import { getReservationList } from '@/api/module.js'
// import { getReservasionsFromNewApi } from '@/api/index.js'
export default {
  watch: {
    loading(val) {
      // console.log('loading', val)
    },
  },
  components: {
    status: status,
    detail: detail,
  },
  data() {
    return {
      userInfo: null,
      loading: false,
      reservationList: [],
      count: {
        reviewing: 0,
        passed: 0,
        refused: 0,
      },
    }
  },
  onReachBottom() {
    // console.log('页面到底了')
  },
  mounted() {
    const _this = this
    uni.showToast({
      title: '下拉刷新可获取最新数据',
      icon: 'none',
      duration: 1500,
    })
    this.getData()
  },
  onPullDownRefresh() {
    const _this = this
    // console.log('refresh')
    setTimeout(function () {
      _this.getData()
      uni.stopPullDownRefresh()
    }, 100)
  },
  methods: {
    getData() {
      const _this = this
      uni.getStorage({
        key: 'userInfo',
        success: function (userInfo) {
          // console.log('this', userInfo.data)
          _this.loading = true
          _this.clearCount()
          // 由后端转发
          getReservationList(userInfo.data).then((res2) => {
            // console.log('123', res2)
            _this.loading = true
            _this.reservationList = res2.data.data.labopenlist

            // console.log('data', _this.reservationList)
            if (res2.statusCode == 200) {
              if (_this.reservationList != null) {
                _this.statusCount()
              }
            }
            _this.loading = false
          })
          // 直接从接口获取
          // getReservasionsFromNewApi(userInfo.data).then((res2) => {
          //   _this.loading = true
          //   _this.reservationList = res2.data.labopenlist
          //   console.log('res2', res2)

          //   console.log('res2.data.labopenlist', res2.data.labopenlist)

          //   console.log('data', _this.reservationList)
          //   if (res2.statusCode == 200) {
          //     if (_this.reservationList != null) {
          //       _this.statusCount()
          //     }
          //   }
          //   _this.loading = false
          // })
        },
      })
    },

    statusCount() {
      this.clearCount()
      this.reservationList.forEach((element) => {
        // console.log(element)
        if (element.status == 0) {
          this.count.reviewing += 1
        } else if (element.status == 1) {
          this.count.passed += 1
        } else {
          this.count.refused += 1
        }
      })
    },
    // 每次统计前全部置0，否则刷新后会出现累计相加
    clearCount() {
      this.count.refused = 0
      this.count.passed = 0
      this.count.reviewing = 0
    },

    // getDataFromNetwork(res) {
    //   console.log('res', res)
    //   console.log('getDataFromNetwork执行了')
    //   const _this = this
    //   this.loading = true
    //   getReservasionsFromNewApi(res).then((res2) => {
    //     _this.loading = true
    //     _this.reservationList = res2.data.labopenlist
    //     this.clearCount()
    //     if (res2.statusCode == 200) {
    //       if (_this.reservationList != null) {
    //         _this.statusCount()
    //       }
    //     }
    //     _this.loading = false
    //   })
    //   // getReservasionsFromMyDB(res).then((res2) => {
    //   //   _this.loading = true
    //   //   _this.reservationList = res2.data.data
    //   //   console.log('data,', _this.reservationList)
    //   //   var temp = {}
    //   //   temp.data = res2.data.data
    //   //   temp.time_ = Date.parse(new Date()) / 1000
    //   //   uni.setStorage({
    //   //     key: 'reservationList',
    //   //     data: temp,
    //   //   })
    //   //   this.clearCount()
    //   //   if (res2.statusCode == 200) {
    //   //     if (_this.reservationList != null) {
    //   //       _this.statusCount()
    //   //     }
    //   //   } else {
    //   //     uni.showModal({
    //   //       title: '提示',
    //   //       content: '服务器出现错误，请刷新重试',
    //   //       showCancel: false,
    //   //       success: function (res) {
    //   //         if (res.confirm) {
    //   //           // _this.getData()
    //   //           return
    //   //         }
    //   //       },
    //   //     })
    //   //   }
    //   //   _this.loading = false
    //   // })
    // },
  },
}
</script>

<style lang="scss">
@import './style/index.scss';
</style>
