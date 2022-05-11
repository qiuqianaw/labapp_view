<template>
  <view>
    <view>
      <user-profile
        :userInfo="userInfo"
        :wx_userInfo="wx_userInfo"
        @login_="login_"
      ></user-profile>
    </view>
    <view>
      <view
        class="cu-list menu card-menu margin-top-xl margin-bottom-xl radius"
      >
        <!-- 普通 formList，直接循环 -->
        <view
          class="cu-item arrow"
          hover-class="btn-hover"
          v-for="(item, index) in formList"
          :key="index"
          @click="goto(item)"
        >
          <view class="content">
            <text :class="item.class"></text>
            <text class="text-grey">{{ item.lable }}</text>
            <!-- if判断，如果是消息中心，特殊处理 -->
            <view
              class="cu-tag round bg-red sm"
              v-if="
                item.url == '/pages/message-center/index' &&
                cardArrlength != null &&
                cardArrlength != 0
              "
              >{{ cardArrlength }}</view
            >
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { logout, Unread } from '@/api/module.js'
import profile from './components/profile.vue'
export default {
  components: {
    'user-profile': profile,
  },
  mounted() {
    Unread().then((res) => {
      this.cardArrlength = res.data.data.length
    })
  },
  methods: {
    goto(item) {
      if (item.opentype == 'navigateTo') {
        uni.navigateTo({
          url: item.url,
        })
      } else if (item.opentype == 'switchTab') {
        uni.switchTab({
          url: item.url,
        })
      } else if (item.opentype == 'method') {
        this.logout()
      }
    },
    login_() {
      uni.navigateTo({
        url: '/pages/login/index',
      })
    },
    logout() {
	  var _this = this
      uni.showModal({
        title: '提示',
        showCancel: true,
        content: '确认退出吗？',
        success: function (res) {
          if (res.confirm) {
            uni.showLoading({
              title: '正在退出',
            })
            logout().then((res) => {
              // console.log('退出', res)
              uni.hideLoading()
              if (res.data.code == 200) {
                uni.clearStorageSync()
                uni.showToast({
                  title: '退出成功',
                })
                _this.userInfo = null
                _this.wx_userInfo = null
              }
            })
          }
        },
      })
    },
  },
  data() {
    return {
      userInfo: {},
      wx_userInfo: {},
      cardArrlength: '',
      formList: [
        {
          url: '/pages/qr-code/index',
          opentype: 'navigateTo',
          lable: '我的二维码',
          class: 'cuIcon-qr_code text-red',
        },
        {
          url: '/pages/reservation-list/index',
          opentype: 'switchTab',
          lable: '预约单',
          class: 'cuIcon-formfill text-blue',
        },
        {
          url: '/pages/study-record/index',
          opentype: 'navigateTo',
          lable: '学习记录',
          class: 'cuIcon-squarecheckfill text-orange',
        },
        {
          url: '/pages/repair-my/index',
          opentype: 'navigateTo',
          lable: '报修单',
          class: 'cuIcon-formfill text-cyan',
        },
        {
          url: '/pages/certificate/index',
          opentype: 'navigateTo',
          lable: '安全证书',
          class: 'cuIcon-selectionfill text-cyan',
        },
        {
          url: '/pages/message-center/index',
          opentype: 'navigateTo',
          lable: '消息中心',
          class: 'cuIcon-notice text-orange',
        },
        {
          url: '',
          opentype: 'method',
          lable: '退出登陆',
          class: 'cuIcon-close text-red',
        },
      ],
    }
  },
  watch: {},
  onShow() {
    const _this = this
    uni.getStorage({
      key: 'userInfo',
      success: function (res) {
        // console.log('userInfo', res.data)
        _this.userInfo = res.data
      },
    })
    uni.getStorage({
      key: 'wx-userInfo',
      success: function (res) {
        // console.log('wx_userInfo', res.data)
        _this.wx_userInfo = res.data
      },
    }),
      Unread().then((res) => {
        this.cardArrlength = res.data.data.length
      })
  },
}
</script>

<style lang="scss">
@import './style/index.scss';
</style>
