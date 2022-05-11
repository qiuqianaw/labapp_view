<template>
  <view id="laboratory">
    <view v-if="loading == false" class="VerticalBox">
      <scroll-view
        class="VerticalNav nav"
        scroll-y
        scroll-with-animation
        :scroll-top="verticalNavTop"
        style="height: 100vh"
      >
        <view
          class="cu-item"
          :class="index == tabCur ? 'text-blue  cur' : ''"
          v-for="(item, index) in list"
          :key="index"
          @tap="TabSelect"
          :data-id="item.seq"
        >
          {{ item.labtype }}
        </view>
      </scroll-view>
      <scroll-view
        class="VerticalMain"
        scroll-y
        scroll-with-animation
        style="height: 100vh"
        :scroll-into-view="'main-' + mainCur"
        @scroll="VerticalMain"
      >
        <view
          class="padding-top padding-lr"
          v-for="(item, index) in list"
          :key="index"
          :id="'main-' + item.seq"
        >
          <view class="cu-bar solid-bottom bg-white">
            <view class="action">
              <text class="cuIcon-title text-blue"></text>
              {{ item.labtype }}
            </view>
          </view>
          <view class="cu-list menu">
            <view
              class="cu-item"
              v-for="(item2, index2) in item.labInformationList"
              :key="index2"
              @tap="selectLab(item2)"
            >
              <view class="content">
                <view class="text-grey">{{ item2.labname }}</view>
                <view class="text-gray text-sm flex">
                  <text class="text-cut">
                    负责人: {{ item2.username
                    }}<text v-if="item2.username2 != null"
                      >/{{ item2.username2 }}</text
                    >
                  </text>
                </view>
              </view>
              <view class="action">
                <view
                  class="cu-tag round"
                  :class="
                    item2.openstatus == 1 ? 'bg-green light' : 'bg-grey light'
                  "
                  ><text class="cuIcon-locationfill text-white text-sm" />{{
                    item2.labroom
                  }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <view v-else class="margin">
      <van-loading color="#0094ff" size="48rpx">加载中...</van-loading>
    </view>
  </view>
</template>

<script>
import { getLabInformationResult } from '@/api/module.js'
export default {
  components: {},
  data() {
    return {
      list: [],
      tabCur: 0,
      mainCur: 0,
      verticalNavTop: 0,
      load: true,
      loading: false,
    }
  },
  watch: {
    tabCur(val) {
      // console.log('tabCur', { val })
    },
    mainCur(val) {
      // console.log('mainCur', { val })
    },
    verticalNavTop(val) {
      // console.log('verticalNavTop', { val })
    },
  },
  mounted() {
    this.loading = true
    const _this = this
    uni.getStorage({
      key: 'labList',
      // 缓存中有信息
      success: function (res) {
        // console.log('从缓存中获取', res)
        _this.list = res.data.data
        // 超过一天，重新设置缓存
        var crtTime = Date.parse(new Date()) / 1000
        // 相差天数
        var dif = Math.floor((crtTime - res.data.time_) / (24 * 3600 * 1000))
        // console.log(
        //   '上一次获取最新数据是 ' + dif + ' 天前，超过 1 天将更新缓存数据'
        // )
        if (dif > 0) {
          _this.updateLabList()
        }
        _this.loading = false
      },
      // 缓存中没有信息
      fail: function () {
        _this.updateLabList()
      },
    })
  },
  onPullDownRefresh() {
    const _this = this
    // console.log('refresh')
    setTimeout(function () {
      _this.updateLabList()
      uni.stopPullDownRefresh()
    }, 500)
  },
  methods: {
    updateLabList() {
      // console.log('从网络获取')
      this.loading = true
      const _this = this
      let list = []
      this.list = list
      getLabInformationResult().then((res) => {
        _this.list = res.data.data
        // console.log('接口返回', res.data.data)
        var temp = {}
        temp.data = res.data.data
        temp.time_ = Date.parse(new Date()) / 1000
        uni.setStorage({
          key: 'labList',
          data: temp,
        })
        _this.loading = false
      })
    },
    selectLab(item2) {
      var params = JSON.stringify(item2)
      uni.navigateTo({
        url: '/pages/laboratory-intro/index?params=' + params,
      })
    },
    TabSelect(e) {
      this.tabCur = e.currentTarget.dataset.id
      this.mainCur = e.currentTarget.dataset.id
      this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
    },
    // VerticalMain(e) {
    //   let that = this
    //   let tabHeight = 0
    //   if (this.load) {
    //     for (let i = 0; i < this.list.length; i++) {
    //       let view = uni
    //         .createSelectorQuery()
    //         .select('#main-' + this.list[i].labtypeid)
    //       view
    //         .fields(
    //           {
    //             size: true,
    //           },
    //           (data) => {
    //             if (data != null) {
    //               // console.log('data', data)
    //               this.list[i].top = tabHeight
    //               tabHeight = tabHeight + data.height
    //               // console.log('data.height', data.height)
    //               this.list[i].bottom = tabHeight
    //             }
    //           }
    //         )
    //         .exec()
    //     }
    //     this.load = false
    //   }
    //   let scrollTop = e.detail.scrollTop + 10
    //   for (let i = 0; i < this.list.length; i++) {
    //     if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
    //       this.verticalNavTop = (this.list[i].labtypeid - 1) * 50
    //       this.tabCur = this.list[i].labtypeid
    //       console.log('2', this.tabCur)
    //       return false
    //     }
    //   }
    // },
    VerticalMain(e) {
      let that = this
      let tabHeight = 0
      if (this.load) {
        for (let i = 0; i < this.list.length; i++) {
          let view = uni
            .createSelectorQuery()
            .select('#main-' + this.list[i].seq)
          view
            .fields(
              {
                size: true,
              },
              (data) => {
                this.list[i].top = tabHeight
                tabHeight = tabHeight + data.height
				// console.log('data.height', data.height)
                this.list[i].bottom = tabHeight
              }
            )
            .exec()
        }
        this.load = false
      }
      let scrollTop = e.detail.scrollTop + 10
      for (let i = 0; i < this.list.length; i++) {
        if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
          this.verticalNavTop = (this.list[i].seq - 1) * 50
          this.tabCur = this.list[i].seq
          // console.log(scrollTop)
          return false
        }
      }
    },
  },
}
</script>

<style>
@import './style/index.scss';
</style>
