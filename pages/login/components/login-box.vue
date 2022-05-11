<template>
  <view class="login-box">
    <view v-if="identity == 'teacher'">
      <van-field
        left-icon="user-o"
        placeholder="请输入教师账号"
        required
        :value="info.uid"
        :border="false"
        @change="onChangeUid"
      />
      <van-cell :border="false"></van-cell>
      <van-field
        left-icon="eye-o"
        placeholder="请输入教师密码"
        required
        :value="info.upwd"
        :password="true"
        :border="false"
        @change="onChangeUpwd"
      />
    </view>
    <view v-else>
      <van-field
        left-icon="user-o"
        type="number"
        placeholder="请输入学生账号"
        required
        :value="info.uid"
        :border="false"
        @change="onChangeUid"
      />
      <van-cell :border="false"></van-cell>
      <van-field
        left-icon="eye-o"
        placeholder="请输入学生密码"
        required
        :value="info.upwd"
        :password="true"
        :border="false"
        @change="onChangeUpwd"
      />
    </view>
    <van-cell :border="false"></van-cell>
    <view>
      <button
        class="cu-btn lg text-center shadow-blur bg-blue"
        @click="onCommit"
      >
        立即登录
      </button>
    </view>
  </view>
</template>
<script>
import Toast from "@/wxcomponents/vant/toast/toast.js";
import JSEncrypt from "wxmp-rsa";
import { toLogin, saveOpenId, generatePublicKey } from "@/api/module.js";
export default {
  props: ["identity"],
  data() {
    return {
      info: {
        userid: "",
        userpwd: "",
      },
    };
  },
  methods: {
    onChangeUid(event) {
      this.info.userid = event.detail;
    },
    onChangeUpwd(event) {
      this.info.userpwd = event.detail;
    },
    // 手动授权方法
    onCommit() {
      // console.log(this.info)
      if (this.identity == "teacher") {
        if (
          this.info.userid.toString().length < 2 ||
          this.info.userpwd.toString().length < 2
        ) {
          Toast.fail("请输入正确的账号或密码");
          return;
        }
        var s = this.info.userid.toString().substr(0, 1);
        if ((s < "a" || s > "z") && (s < "A" || s > "Z")) {
          Toast.fail("请输入正确的账号或密码");
          return;
        }
      }
      if (this.identity == "student") {
        var re = /^[0-9]+.?[0-9]*$/;
        if (
          !re.test(this.info.userid.toString()) ||
          this.info.userid.toString().length < 2 ||
          this.info.userpwd.toString().length < 2
        ) {
          Toast.fail("请输入正确的账号或密码");
          return;
        }
      }
      uni.showLoading({
        title: "正在登陆",
      });
      uni.clearStorageSync();
      generatePublicKey(this.info.userid).then((res) => {
        if (res.data.code == 200) {
          // console.log(res.data.data);
          let encrypt = new JSEncrypt();
          var public_key = res.data.data;
          encrypt.setPublicKey(public_key);
          var userpwd = encrypt.encryptLong(this.info.userpwd);
          var loginForm = {
            userid: this.info.userid,
            userpwd: userpwd,
          };
          // console.log(res.data.data)
          toLogin(loginForm).then((res) => {
            if (res.data.code != 200) {
              uni.hideLoading();
              Toast.fail(res.data.msg);
              if (res.data.msg == "请先授权实验室预约管理系统") {
                //脱敏
              }
              return;
            }
            uni.clearStorageSync();
            // 存入用户信息
            uni.setStorage({
              key: "userInfo",
              data: res.data.data,
            });
            uni.getUserProfile({
              desc: "用于完善用户资料",
              lang: "zh_CN",
              success: function (res) {
                uni.setStorage({
                  key: "wx-userInfo",
                  data: res.userInfo,
                });
                var appId = "wxc6d7af2ad098722b"; //AppID(小程序ID)
                var APP_SECRET = "947b013b9b2812f103aa5c5fd527de84"; //AppSecret(小程序密钥)
                uni.login({
                  success: function (data) {
                    let code = data.code; //登录微信授权
                    uni.request({
                      //脱敏
                    });
                    let pages = getCurrentPages();
                    var delta = 1;
                    for (var index in pages) {
                      if (pages[index].route == "pages/login/index") {
                        delta = pages.length - index;
                        break;
                      }
                    }
                    uni.hideLoading();
                    uni.showToast({
                      title: "登陆成功",
                      duration: 1000,
                    });

                    //跳转页面
                    let second = 1;
                    const timer = setInterval(() => {
                      second--;
                      clearInterval(timer);
                      uni.navigateBack({
                        delta: delta,
                      });
                    }, 1000);
                  },
                });
              },
              fail: function (res) {
                // console.log('uni.getUserProfile=>用户拒绝了授权');
                // console.log(res);
                let pages = getCurrentPages();
                let curPage = pages[pages.length - 1];
                let fullPath = curPage.route;
                var delta = 1;
                for (var index in pages) {
                  if (pages[index].route == "pages/login/index") {
                    delta = pages.length - index;
                    break;
                  }
                }
                uni.hideLoading();
                uni.showToast({
                  title: "登陆成功",
                  duration: 1000,
                });

                //跳转页面
                let second = 1;
                const timer = setInterval(() => {
                  second--;
                  clearInterval(timer);
                  uni.navigateBack({
                    delta: delta,
                  });
                }, 1000);
              },
            });
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "./style/login-box.scss";
</style>
