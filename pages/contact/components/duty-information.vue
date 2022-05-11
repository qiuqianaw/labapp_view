<template>
	<view>
		<view v-if="loading == true" class="margin">
		  <van-loading color="#0094ff" size="48rpx"
		    >正在加载...</van-loading
		  >
		</view>
		<view v-else>
			<view class="cu-card dynamic">
				<view class="cu-item shadow" v-if="LabcontactDutyinfo.length == 0">
					<van-empty description="暂无值班信息" />
				</view>
				<view class="cu-item shadow" v-else v-for="(item,index) in LabcontactDutyinfo" :key="index">
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<image
							  src="/static/logo.jpeg"
							  class="cu-avatar round lg"
							  mode="widthFix"
							>
							<view class="text-bold content flex-sub">
								<view>值班区域: {{item.dutyregion}}</view>
							</view>
						</view>
					</view>
					<view class="text-lg margin">
						<view class="margin-left">
							<van-row>
								<van-col span="6">值班地点</van-col>
								<van-col span="8">{{item.dutyplace}}</van-col>
							</van-row>
						</view>
					</view>
					<view class="text-lg margin">
						<view class="margin-left">
							<van-row>
								<van-col span="6">值班电话</van-col>
								<van-col span="8">{{item.dutyphone}}</van-col>
							</van-row>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getLabcontactDutyinfo } from "@/api/module.js";
export default {
  data() {
    return {
      loading: true,
      LabcontactDutyinfo: "",
    };
  },
  mounted() {
    getLabcontactDutyinfo().then((res) => {
      if (res.data.code == 200) {
        this.LabcontactDutyinfo = res.data.data;
      }
      this.loading = false;
    });
  },
};
</script>

<style lang="scss">
@import "./style/duty-information.scss";
</style>
