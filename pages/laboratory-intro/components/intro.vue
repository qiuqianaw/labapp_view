<template>
  <view>
    <!-- 基本信息 -->
    <basic-info :lab="lab"></basic-info>
    <!-- 图文介绍 -->
    <detail-info
      v-if="labDetail.equipmentdesc != null && labDetail.functiondesc != null"
      :labDetail="labDetail"
    ></detail-info>
    <!-- 语音介绍 -->
    <audio-info
      v-if="labDetail.audiourl != null"
      :labDetail="labDetail"
      :lab="lab"
    ></audio-info>
    <!-- VR 体验 -->
    <vr-info
      v-if="labDetail.vrqrcode != null && labDetail.vrqrcode != ''"
      :labDetail="labDetail"
      :lab="lab"
    ></vr-info>
  </view>
</template>

<script>
import { getLabDetailById } from '@/api/module.js'

import basicInfo from './basic-info.vue'
import detailInfo from './detail-info.vue'
import audiolInfo from './audio-info.vue'
import vrlInfo from './vr-info.vue'

export default {
  components: {
    'basic-info': basicInfo,
    'detail-info': detailInfo,
    'audio-info': audiolInfo,
    'vr-info': vrlInfo,
  },
  data() {
    return {
      labDetail: null,
      show: false,
    }
  },
  props: {
    lab: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  mounted() {
    getLabDetailById(this.lab.labid).then((res) => {
      if (res.data.code === 200) {
        this.labDetail = res.data.data
        console.log(this.labDetail)
      }
    })
  },
  methods: {},
}
</script>

<style></style>
