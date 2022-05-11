<template>
  <view>
    <view class="cu-card">
      <van-dialog
        use-slot
        title="报修单状态修改"
        show-cancel-button
        use-slot
        :show="show"
        @close="onClose"
        @confirm="onSubmit"
      >
        <view>
          <van-field :value="repairInfo.repid" label="编号" disabled />
          <van-radio-group :value="repairInfo.status" @change="toChange">
            <van-cell title="报修中" clickable data-name="1" @click="onClick">
              <van-radio slot="right-icon" name="1"></van-radio>
            </van-cell>
            <van-cell title="已确认" clickable data-name="2" @click="onClick">
              <van-radio slot="right-icon" name="2"></van-radio>
            </van-cell>
            <van-cell title="已解决" clickable data-name="3" @click="onClick">
              <van-radio slot="right-icon" name="3"></van-radio>
            </van-cell>
            <van-cell title="已放弃" clickable data-name="4" @click="onClick">
              <van-radio slot="right-icon" name="4"></van-radio>
            </van-cell>
          </van-radio-group>
          <!-- <van-stepper :value="markInfo.prjscore" @change="onChange" integer min="0" max="10" /> -->
          <van-field
            :value="repairInfo.assetno"
            data-type="assetno"
            type="number"
            label="资产编号"
            placeholder="请输入资产编号"
            @change="onChange"
          />
          <van-field
            :value="repairInfo.operatedesc"
            data-type="operatedesc"
            label="处理描述"
            placeholder="请输入处理描述"
            @change="onChange"
          />
          <van-field
            :value="repairInfo.operatetime"
            label="操作时间"
            disabled
          />
        </view>
      </van-dialog>
      <view class="cu-item shadow padding-top-sm" v-if="unrepaired.length == 0">
        <van-empty description="暂无报修单" />
      </view>
      <view
        class="cu-item shadow padding-top-sm"
        v-for="(item, index) in unrepaired"
        :key="index"
        v-else
      >
        <view @click="changeState(item)">
          <van-cell icon="todo-list-o">
            <template #title>
              <span class="custom-title">报修编号: {{ item.repid }}</span>
              <van-tag v-if="item.status == 1" type="warning">报修中</van-tag>
              <van-tag v-if="item.status == 2" type="primary">已确认</van-tag>
              <van-tag v-if="item.status == 3" type="success">已解决</van-tag>
              <van-tag v-if="item.status == 4" type="danger">已放弃</van-tag>
              <view>
                <span v-if="item.operateuser != null" class="margin-right-sm">
                  <van-tag plain type="primary"
                    >处理人编号:{{ item.operateuser }}</van-tag
                  >
                </span>
                <span
                  v-if="item.operateusername != null"
                  class="margin-right-sm"
                >
                  <van-tag plain type="primary"
                    >处理人姓名:{{ item.operateusername }}</van-tag
                  >
                </span>
                <span v-if="item.operatetime != null" class="margin-right-sm">
                  <van-tag plain type="primary"
                    >操作时间:{{ item.operatetime }}</van-tag
                  >
                </span>
                <span v-if="item.operatedesc != null" class="margin-right-sm">
                  <van-tag plain type="primary"
                    >处理描述:{{ item.operatedesc }}</van-tag
                  >
                </span>
              </view>
            </template>
          </van-cell>
          <van-cell :label="'实验室位置: ' + item.labposition" />
          <van-cell :label="'报修设备: ' + item.equipname" />
          <van-cell :label="'设备编号: ' + item.equipid" />
          <van-cell :label="'座位号: ' + item.seatid" />
          <van-cell :label="'资产编号: ' + item.assetno" />
          <van-cell :label="'故障描述: ' + item.faultdesc" />
          <van-cell :label="'报修时间: ' + item.reporttime" />
          <van-cell :label="'报修人帐号: ' + item.reportuser" />
          <van-cell :label="'报修人姓名: ' + item.reportusername" />
        </view>
        <view class="flex text-center">
          <van-image
            class="flex-sub"
            v-for="(item2, index2) in item.imgs"
            lazy-load
            width="100"
            height="100"
            :src="item2.filepath"
            :key="index2"
            :data-src="item2.filepath"
            @click="toPreview"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { updateRepaire } from "@/api/module.js";
export default {
  props: ["unrepaired", "unrepairedImgsList"],
  data() {
    return {
      show: false,
      repairInfo: "",
    };
  },
  methods: {
    changeState(item) {
      this.repairInfo = JSON.parse(JSON.stringify(item));
      this.show = true;
    },
    toPreview(event) {
      var src = event.currentTarget.dataset.src; //获取data-src
      //图片预览
      uni.previewImage({
        current: src, // 当前显示图片的http链接
        urls: this.unrepairedImgsList, // 需要预览的图片http链接列表
      });
    },
    toChange(event) {
      this.repairInfo.status = event.detail;
    },
    onClick(event) {
      this.repairInfo.status = event.currentTarget.dataset.name;
    },
    onChange(event) {
      // console.log(event)
      if (event.currentTarget.dataset.type == "operatedesc") {
        this.repairInfo.operatedesc = event.detail;
      }
      if (event.currentTarget.dataset.type == "assetno") {
        this.repairInfo.assetno = event.detail;
      }
    },
    onSubmit() {
      // console.log(this.repairInfo)
      if (this.repairInfo.operatedesc != null) {
        if (this.repairInfo.operatedesc.length > 2000) {
          uni.showToast({
            icon: "none",
            title: "处理描述不能过长",
          });
          return;
        }
      }
      if (this.repairInfo.operatedesc != null) {
        if (this.repairInfo.assetno.length > 100) {
          uni.showToast({
            icon: "none",
            title: "资产编号不能过长",
          });
          return;
        }
      }
      uni.showLoading({
        title: "正在修改",
      });
      updateRepaire(this.repairInfo).then((res) => {
        uni.hideLoading();
        this.$emit("random", Math.random());
      });
    },
    onClose() {
      this.show = false;
    },
  },
  mounted() {},
};
</script>
