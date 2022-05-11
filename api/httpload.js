import Request from "../utils/luch-request/luch-request/index.js";
import { BASE_URL } from "./base-url.js";

const http = new Request({
  baseURL: BASE_URL,
  timeout: 300000, //超时时长5分钟,
  header: {
    "Content-Type": "application/json;",
  },
});

//请求拦截器
http.interceptors.request.use(
  (config) => {
    // 可使用async await 做异步操作
    const userInfo = uni.getStorageSync("userInfo");
    let pages = getCurrentPages();
    let curPage = pages[pages.length - 1];
    let fullPath = curPage.route;
    if (userInfo == "" && fullPath != "pages/login/index") {
      uni.clearStorageSync();
      uni.navigateTo({
        url: "/pages/login/index?code=401",
      });
      config.cancelToken = new CancelToken(function executor(c) {
        cancel = c;
      });
      return config;
    }
    const token = userInfo.token;
    if (token) {
      config.header = {
        "Content-Type": "application/json",
        Authorization: token,
      };
    }

    if (config.method === "POST") {
      config.data = JSON.stringify(config.data);
    }
    return config;
  },
  (error) => {
    return Promise.resolve(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    if (response.data.code == 500) {
      uni.showToast({
        title: response.data.msg,
        duration: 1000,
        icon: "none",
      });
    }
    return response;
  },
  (error) => {
    console.log(error);
    //服务器已关闭
    if (error.errMsg === "request:fail ") {
      uni.switchTab({
        url: "/pages/index/index",
      });
      uni.showToast({
        title: "服务器已关闭",
        duration: 1000,
        icon: "none",
      });
    }
    //被后端全局异常捕获到
    else if (error.data.msg != null) {
      //未登录跳转
      let pages = getCurrentPages();
      let curPage = pages[pages.length - 1];
      let fullPath = curPage.route;
      if (error.data.code == 401 && fullPath != "pages/login/index") {
        uni.showModal({
          title: "提示",
          content: "请先登录",
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              uni.clearStorageSync();
              uni.navigateTo({
                url: "/pages/login/index",
              });
            }
          },
        });
      } else {
        uni.showToast({
          title: error.data.msg,
          duration: 1000,
          icon: "none",
        });
      }
    }
    //后端没有捕获到的异常
    else {
      if (error.data.message === "登录信息已过期，请重新登录") {
        uni.removeStorage({
          key: "userInfo",
          success() {
            uni.showModal({
              title: "提示",
              content: "登录信息已过期，请重新登录",
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  uni.navigateTo({
                    url: "/pages/login/index",
                  });
                }
              },
            });
          },
        });
      } else {
        uni.showToast({
          title: error.data.message,
          duration: 1000,
          icon: "none",
        });
      }
    }

    return Promise.resolve(error);
  }
);
export default http;
