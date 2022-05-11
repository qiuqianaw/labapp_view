<template>
	<view>
		<view class="cu-card">
			<view class="cu-item shadow padding-top-sm" v-if="repaired.length == 0">
				<van-empty description="暂无报修单" />
			</view>
			<view class="cu-item shadow padding-top-sm" v-for="(item,index) in repaired" :key="index" v-else>
				<van-cell icon="todo-list-o">
					<template #title>
						 <view class="custom-title">报修编号: {{ item.repid }}</view>
						 <span class="margin-right-sm"><van-tag type="success">处理人编号:{{item.operateuser}}</van-tag></span>
						 <span class="margin-right-sm"><van-tag type="success">处理人姓名:{{item.operateusername}}</van-tag></span>
						 <span class="margin-right-sm"><van-tag plain type="success">操作时间:{{item.operatetime}}</van-tag></span>
						 <span v-if="item.operatedesc != null" class="margin-right-sm"><van-tag plain type="success">处理描述:{{item.operatedesc}}</van-tag></span>
					</template>
				</van-cell>
				<van-cell :label="'实验室位置: '+item.labposition" />
				<van-cell :label="'报修设备: '+item.equipname" />
				<van-cell :label="'设备编号: '+item.equipid" />
				<van-cell :label="'座位号: '+item.seatid" />
				<van-cell :label="'资产编号: '+item.seatid" />
				<van-cell :label="'故障描述: '+item.faultdesc" />
				<van-cell :label="'报修时间: '+item.reporttime"/>
				<van-cell :label="'报修人帐号: '+item.reportuser" />
				<van-cell :label="'报修人姓名: '+item.reportusername" />
				<view class="flex text-center">
					<van-image class="flex-sub" v-for="(item2,index2) in item.imgs" lazy-load width="100" height="100"
					:src="item2.filepath" :key="index2" :data-src="item2.filepath" @click="toPreview"/>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props: ['repaired','repairedImgsList'],
		data(){
			return{

			}
		},
		mounted() {
			
		},
		methods: {
			toPreview(event){
				var src = event.currentTarget.dataset.src//获取data-src
				//图片预览
				uni.previewImage({
					 current: src, // 当前显示图片的http链接
					 urls: this.repairedImgsList // 需要预览的图片http链接列表
				})
			}
		}
	}
</script>

<style>
</style>