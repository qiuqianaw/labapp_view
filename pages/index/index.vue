<template>
  <view id="index-outer">
    <commo-function></commo-function>
    <swiper
      class="screen-swiper round-dot"
      :indicator-dots="true"
      :circular="true"
      :autoplay="true"
      interval="3000"
      duration="500"
      indicator-color="rgba(204, 204, 204, 0.829)"
      indicator-active-color="#1f8dd6ad"
    >
      <swiper-item
        v-for="(item, index) in imgUrls"
        :key="index"
        @click="Newsdetail(item.labNewsnotice.nsnid)"
      >
        <image
          :src="item.labFilestorager[0].filepath"
          mode="aspectFill"
        ></image>
      </swiper-item>
    </swiper>
    <inform :inform="inform"></inform>
    <manage-function v-if="userid != null && isAdmin == true"></manage-function>
  </view>
</template>

<script>
import { queryNewsIsTop, queryNoticeIsTop } from '@/api/module.js'
import { checkAdminPermisson } from '@/api/index.js'
import commonFunction from './components/common-function.vue'
import inform from './components/inform.vue'
import manageFunction from './components/manage-function.vue'

export default {
  components: {
    'commo-function': commonFunction,
    inform: inform,
    'manage-function': manageFunction,
  },
  data() {
    return {
      userid: null,
      imgUrls: '',
      inform: '',
      isAdmin: false,
    }
  },
  onPullDownRefresh() {
    const _this = this
    // console.log('refresh')
    setTimeout(function () {
      _this.userid = uni.getStorageSync('userInfo').userid
      _this.queryNews()
      _this.checkPermission()
      uni.stopPullDownRefresh()
    }, 100)
  },
  watch: {
    userid(val) {
      // console.log('userid change', val)
      this.queryNews()
      this.checkPermission()
    },
  },
  methods: {
    Newsdetail: function (value) {
      var informId = value
      // console.log(informId)
      uni.navigateTo({
        url: '/pages/inform-detail/index?informId=' + informId,
      })
    },
    checkPermission() {
      const _this = this
      checkAdminPermisson(this.userid).then((res) => {
        // console.log('checkAdminPermisson', res)
        // console.log('res.data', res.data.manager)
        if (res.data.success == true) {
          _this.isAdmin = res.data.manager
          // console.log('this.showManageFunction', this.showManageFunction)
        } else {
          uni.showModal({
            title: '提示',
            showCancel: false,
            content: res.data.msg + '(checkAdminPermisson ERROR)',
          })
        }
      })
    },
    queryNews() {
      queryNewsIsTop()
        .then((res) => {
          this.imgUrls = res.data.data
        })
        .then((res) => {
          queryNoticeIsTop().then((res) => {
            this.inform = res.data.data
            // console.log(this.inform)
          })
        })
    },
  },
  mounted() {
    this.queryNews()
    this.checkPermission()
  },
  onShow() {
  	this.userid = uni.getStorageSync('userInfo').userid
  	// console.log('this.userid ', this.userid)
  },
  computed: {},
}
</script>

<style lang="scss">
@import './style/index.scss';
</style>
