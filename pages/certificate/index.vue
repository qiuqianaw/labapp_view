<template>
  <view>
    <certificate
      :loading="loading"
      :LabsaUsergetinfo="LabsaUsergetinfo"
    ></certificate>
  </view>
</template>

<script>
import certificate from "./components/certificate.vue";
import { getLabsaUsergetinfolist } from "@/api/module.js";
export default {
  components: {
    certificate: certificate,
  },
  data() {
    return {
      loading: null,
      LabsaUsergetinfo: "",
    };
  },
  methods: {},
  onShow() {
    this.loading = true;
    getLabsaUsergetinfolist().then((res) => {
      if (res.data.code == 200) {
        this.LabsaUsergetinfo = res.data.data;
      }
      this.loading = false;
    });
  },
};
</script>

<style>
</style>
