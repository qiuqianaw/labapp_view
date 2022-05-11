<template>
  <web-view :url="url"></web-view>
</template>

<script>
import webView from "./components/web-view.vue";
import md5 from "@/utils/md5/md5.js";
import { BASE_URL } from "@/api/base-url.js";
export default {
  components: {
    "web-view": webView,
  },
  data() {
    return {
      url: "",
    };
  },
  onLoad(options) {
    //脱敏
  },
  methods: {
    insertParams(url) {
      let consid = "LMS";
      let accesskey = "lms123";
      // 时间戳 10位
      let timestamp = Date.parse(new Date()).toString().substr(0, 10);
      let rand = Math.floor(
        (Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 5)
      ).toString();
      let callback = BASE_URL + "/authsuccess";

      var sign = md5(accesskey + timestamp + rand);

      var newUrl =
        url +
        "?consid=" +
        consid +
        "&" +
        "sign=" +
        sign +
        "&" +
        "rand=" +
        rand +
        "&" +
        "timestamp=" +
        timestamp +
        "&" +
        "callback=" +
        callback;
      return newUrl;
    },
  },
};
</script>

<style></style>
