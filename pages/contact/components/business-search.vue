<template>
	<view>
		<view v-if="loading == true" class="margin">
		  <van-loading color="#0094ff" size="48rpx"
		    >正在加载...</van-loading
		  >
		</view>
		<view v-else>
			<view class="cu-card dynamic">
				<view class="cu-item shadow" v-if="LabcontactServiceinfo.length == 0">
					<van-empty description="暂无业务信息" />
				</view>
				<view class="cu-item shadow" v-else v-for="(item,index) in LabcontactServiceinfo" :key="index">
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<image
							  src="/static/logo.jpeg"
							  class="cu-avatar round lg"
							  mode="widthFix"
							>
							<view class="text-bold content flex-sub">
								<view>{{item.servicename}}</view>
							</view>
						</view>
					</view>
					<view class="text-lg margin text-center">{{item.servicecontact}}: {{item.servicephone}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getLabcontactServiceinfo } from "@/api/module.js";
export default {
  data() {
    return {
      loading: true,
      LabcontactServiceinfo: "",
    };
  },
  mounted() {
    getLabcontactServiceinfo().then((res) => {
      if (res.data.code == 200) {
        this.LabcontactServiceinfo = res.data.data;
      }
      this.loading = false;
    });
  },
};
</script>

<style lang="scss">
@import "./style/business-search.scss";
</style>
