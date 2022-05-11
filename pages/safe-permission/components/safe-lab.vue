<template>
	<view>
		<view v-if="loading == true" class="margin">
				<van-loading color="#0094ff" size="48rpx"
				>正在加载...</van-loading
				>
		</view>
		<view v-else>
			<view class="text-center margin padding-sm bg-white">
				<view class="text-bold text-lg">
					点击项目开始答题 
					<text class="lg text-gray cuIcon-writefill"></text>
				</view>
			</view>
			<view class="cu-card">
				<view class="cu-item shadow padding-xl" v-if="LabsaInfoListLab.length == 0">
					<van-empty description="暂无安全准入考试" />
				</view>
				<view class="cu-item shadow padding-xl" v-else>
					<view class="text-bold text-lg">
						<van-row>
							<van-col span="18">认证项目</van-col>
							<van-col span="6">状态</van-col>
						</van-row>
					</view>
					<view class="margin-top-sm text-df" v-for="(item,index) in LabsaInfoListLab" :key="index">
						<view class="text-gray" v-if="item.sastatus == 0">
							<van-row>
								<view>
									<van-col class="margin-top-xl" span="18">{{item.saname}}</van-col>
								</view>
								<view>
									<van-col span="6">已停用</van-col>
								</view>
							</van-row>
						</view>
						<view v-else>
							<van-row>
								<navigator :url="'/pages/safe-study/index?said='+item.said">
									<van-col class="margin-top-xl" span="18">{{item.saname}}</van-col>
								</navigator>
								<view class="text-green" v-if="item.ispass">
									<van-col span="6">已通过</van-col>
								</view>
								<view v-else class="text-red" >
									<van-col span="6">未通过</van-col>
								</view>
							</van-row>
						</view>
						
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		watch: {
		  LabsaInfoListLab() {
		    this.loading = false
		  },
		},
		data() {
			return {
				loading: true,
			}
		},
		props: {
		  LabsaInfoListLab: {
		    type: Array,
		    default: function () {
		      return []
		    },
		  },
		},
	}
</script>

<style>
</style>
