<template>
  <view>
    <view v-if="loading == true" class="margin">
      <van-loading color="#0094ff" size="48rpx">正在加载...</van-loading>
    </view>
    <view v-else>
      <view class="padding">
        <view class="cu-bar solid-bottom bg-white">
          <view class="action">
            <text class="cuIcon-titles text-blue"></text>基本信息
          </view>
        </view>
        <van-cell
          title="实验室位置(*)"
          :value="repairInfo.labposition"
          is-link
          @click="showPopup"
        />
        <van-popup :show="show" @close="onClose" position="bottom" round>
          <van-picker
            show-toolbar
            title="请选择实验室位置"
            :columns="labpositions"
            @cancel="onClose"
            @confirm="onConfirm"
          />
        </van-popup>
        <van-field
          data-title="equipname"
          :value="repairInfo.equipname"
          label="设备名称(*)"
          placeholder="请输入设备名称"
          @change="fieldOnChange"
        />
        <van-field
          data-title="equipid"
          :value="repairInfo.equipid"
          type="number"
          label="设备号"
          placeholder="请输入设备号"
          @change="fieldOnChange"
        />
        <van-field
          data-title="seatid"
          :value="repairInfo.seatid"
          type="number"
          label="座位号"
          placeholder="请输入座位号"
          @change="fieldOnChange"
        />
        <van-field
          data-title="assetno"
          :value="repairInfo.assetno"
          type="number"
          label="资产编号"
          placeholder="请输入资产编号"
          @change="fieldOnChange"
        />
      </view>
      <view class="padding">
        <view class="cu-bar solid-bottom bg-white">
          <view class="action">
            <text class="cuIcon-titles text-blue"></text>故障描述(*)
          </view>
        </view>
        <van-field
          data-title="faultdesc"
          :value="repairInfo.faultdesc"
          @change="fieldOnChange"
          autosize
          type="textarea"
          placeholder="请输入故障描述"
        />
      </view>
    </view>
    <view class="padding">
      <view class="cu-bar solid-bottom bg-white">
        <view class="action">
          <text class="cuIcon-titles text-blue"></text>上传照片(最多两张)
        </view>
      </view>
      <view class="bg-white">
        <span v-for="(item, index) in fileList" :key="index">
          <image
            class="upload-img margin-xs"
            :src="item"
            mode="scaleToFill"
          ></image>
        </span>
        <image class="upload-img margin-xs" @click="selectImg"></image>
      </view>
    </view>
    <button class="cu-btn block bg-blue margin-xl lg" @click="onSubmit">
      提交
    </button>
  </view>
</template>

<script>
import {
  getLabInformationList,
  uploadFile,
  saveLabRepairinfo,
} from "@/api/module.js";
export default {
  data() {
    return {
      fileList: [],
      show: false,
      labpositions: [],
      repairInfo: {
        labposition: "",
        equipname: "",
        equipid: "",
        seatid: "",
        assetno: "",
        faultdesc: "",
        status: 1,
        files: [],
      },
      loading: true,
    };
  },
  mounted() {
    this.loading = true;
    getLabInformationList().then((res) => {
      var labs = res.data.data;
      for (var i = 0; i < labs.length; i++) {
        this.labpositions.push(labs[i].labroom);
      }
      var temp = [];
      for (var i = 0; i < this.labpositions.length; i++) {
        if (temp.indexOf(this.labpositions[i]) === -1) {
          temp.push(this.labpositions[i]);
        }
      }
      this.labpositions = temp;
      this.loading = false;
    });
  },
  methods: {
    selectImg() {
      var that = this;
      uni.chooseImage({
        count: 2,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: function (res) {
          //res.tempFilePaths 返回图片本地文件路径列表
          var tempFilePaths = res.tempFilePaths;
          for (var index in tempFilePaths) {
            that.fileList.push(tempFilePaths[index]);
          }
          if (that.fileList.length > 2) {
            for (var i = 0; i <= that.fileList.length - 2; i++) {
              that.fileList.shift();
            }
          }
        },
      });
    },
    fieldOnChange(event) {
      if (event.currentTarget.dataset.title === "equipname") {
        this.repairInfo.equipname = event.detail;
      }
      if (event.currentTarget.dataset.title === "equipid") {
        this.repairInfo.equipid = event.detail;
      }
      if (event.currentTarget.dataset.title === "seatid") {
        this.repairInfo.seatid = event.detail;
      }
      if (event.currentTarget.dataset.title === "assetno") {
        this.repairInfo.assetno = event.detail;
      }
      if (event.currentTarget.dataset.title === "faultdesc") {
        this.repairInfo.faultdesc = event.detail;
      }
    },
    onConfirm(event) {
      this.repairInfo.labposition = event.target.value;
      this.show = false;
    },
    showPopup(e) {
      this.show = true;
    },
    onClose() {
      this.show = false;
    },
    onSubmit() {
      if (
        this.repairInfo.labposition == null ||
        this.repairInfo.labposition == ""
      ) {
        uni.showToast({
          icon: "none",
          title: "实验室位置不能为空",
        });
        return;
      }
      if (
        this.repairInfo.equipname == null ||
        this.repairInfo.equipname == ""
      ) {
        uni.showToast({
          icon: "none",
          title: "设备名称不能为空",
        });
        return;
      }
      // if(this.repairInfo.equipid == null||this.repairInfo.equipid == ''){
      // 	uni.showToast({
      // 		icon:'none',
      // 		title:'设备编号不能为空'
      // 	})
      // 	return
      // }
      // if(this.repairInfo.seatid == null||this.repairInfo.seatid == ''){
      // 	uni.showToast({
      // 		icon:'none',
      // 		title:'座位号不能为空'
      // 	})
      // 	return
      // }
      // if(this.repairInfo.assetno == null||this.repairInfo.assetno == ''){
      // 	uni.showToast({
      // 		icon:'none',
      // 		title:'资产编号不能为空'
      // 	})
      // 	return
      // }
      if (
        this.repairInfo.faultdesc == null ||
        this.repairInfo.faultdesc == ""
      ) {
        uni.showToast({
          icon: "none",
          title: "故障描述不能为空",
        });
        return;
      }
      if (this.repairInfo.equipname.length > 100) {
        uni.showToast({
          icon: "none",
          title: "设备名称不能过长",
        });
        return;
      }
      if (this.repairInfo.equipid.length > 100) {
        uni.showToast({
          icon: "none",
          title: "设备号不能过长",
        });
        return;
      }
      if (this.repairInfo.seatid.length > 50) {
        uni.showToast({
          icon: "none",
          title: "座位号不能过长",
        });
        return;
      }
      if (this.repairInfo.assetno.length > 100) {
        uni.showToast({
          icon: "none",
          title: "资产编号不能过长",
        });
        return;
      }
      if (this.repairInfo.faultdesc.length > 2000) {
        uni.showToast({
          icon: "none",
          title: "故障描述不能过长",
        });
        return;
      }
      if (this.fileList.length == 0) {
        uni.showLoading({
          title: "正在提交",
        });
        saveLabRepairinfo(this.repairInfo).then((res) => {
          uni.hideLoading();
          if (res.data.code == 200) {
            uni.showToast({
              title: "提交成功",
              duration: 1000,
            });
            let second = 1;
            const timer = setInterval(() => {
              second--;
              clearInterval(timer);
              uni.switchTab({
                url: "/pages/index/index",
              });
            }, 1000);
          }
        });
        return;
      }
      uni.showLoading({
        title: "正在上传文件",
      });
      for (var index in this.fileList) {
        uploadFile(this.fileList[index]).then((res) => {
          uni.hideLoading();
          var dataObject = JSON.parse(res[1].data);
          this.repairInfo.files.push(dataObject.data);
          if (this.repairInfo.files.length == this.fileList.length) {
            uni.showLoading({
              title: "正在提交",
            });
            saveLabRepairinfo(this.repairInfo).then((res) => {
              uni.hideLoading();
              if (res.data.code == 200) {
                uni.showToast({
                  title: "提交成功",
                  duration: 1000,
                });
                let second = 1;
                const timer = setInterval(() => {
                  second--;
                  clearInterval(timer);
                  uni.switchTab({
                    url: "/pages/index/index",
                  });
                }, 1000);
              }
            });
          }
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import "./style/failure-describe";
</style>
