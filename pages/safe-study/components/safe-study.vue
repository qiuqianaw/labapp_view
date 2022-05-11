<template>
	<view>
		<view v-if="loading == true" class="margin">
		  <van-loading color="#0094ff" size="48rpx"
		    >正在加载...</van-loading
		  >
		</view>
		
		<view v-else>
			<view class="margin-top margin-right margin-left cu-bar solid-bottom bg-white">
			  <view class="action">
			    <text class="cuIcon-titles text-blue"></text
			    >描述信息
			  </view>
			</view>
			<view class="padding margin-right margin-left bg-white" v-if="LabsaStudylist.sadesc == null">暂无描述</view>
			<view v-else class="padding margin-right margin-left bg-white">{{LabsaStudylist.sadesc}}</view>
			<view class="margin-top margin-right margin-left cu-bar solid-bottom bg-white">
			  <view class="action">
			    <text class="cuIcon-titles text-blue"></text
			    >学习资源
			  </view>
			</view>
			<view class="cu-card" >
				<view class="cu-item shadow padding" v-if="LabsaStudylist.length==0">
					<van-empty description="暂无学习资料" />
				</view>
				<view v-else class="cu-item shadow padding" v-for="(item,index) in LabsaStudylist.lablearnResourceVOS" :key="index" @click="safeStudy(item)">
					<view class="text-df"><text class="cuIcon-file"></text>资源名称: {{item.resourcename}}</view>
					<view v-if="item.remark == null">
						<view class="text-sm text-gray"><van-icon />备注: 无</view>
					</view>
					<view v-else>
						<view class="text-sm text-gray"><van-icon />备注: {{item.remark}}</view>
					</view>
				</view>
			</view>
			<button class="cu-btn block bg-blue margin lg" @click="toExam">开始考试</button>
		</view>
	</view>
</template>

<script>
	export default{
		props:["said","LabsaStudylist","loading"],
		data(){
			return{
				
			}
		},
		methods:{
			safeStudy(item) {
				// console.log('点击了该资源', item)
				var params = JSON.stringify(item)
				uni.navigateTo({
					url: '/pages/resource-detail/index?resourceid=' + item.resourceid,
				})
			},
			// openFile(url){
			// 	uni.showLoading({
			// 		title:"正在打开文件"
			// 	})
			// 	uni.downloadFile({
			// 		url:url,
			// 		success: (res) => {
			// 			if (res.statusCode === 200) {
			// 				uni.openDocument({
			// 					filePath: res.tempFilePath, 
			// 					// 如果文件名包含中文，建议使用escape(res.tempFilePath)转码，防止ios和安卓客户端导致的差异
			// 					success: function(res) {
			// 						uni.hideLoading()
			// 					}
			// 				});
			// 			}
			// 		}
			// 	})
			// },
			toExam(){
				uni.navigateTo({
					url: "/pages/safe-exam/index?said="+this.said
				})
			}
		}
	}
</script>

<style>
</style>
