<template>
	<view class="inform-box" id="inform_box_outer">
		<view class="fun_title">通知公告</view>
		<view class="van-notice-bar" v-for="(item,index) in inform.slice(0,3)" :key="index">
			<van-notice-bar mode="link" :scrollable="false" :text="item.labNewsnotice.title" color="#606266" background="#fff"
				@click="informdetail(item.labNewsnotice.nsnid)" />
		</view>
		<div class="xiangqing" @click="getmore">
			查看更多
		</div>
	</view>
</template>

<script>
	export default {
		props:['inform'],
		methods: {
			getmore() {
				uni.navigateTo({
					url:'/pages/inform/index'
				})
			},
			informdetail: function(value) {
				var informId = value
				uni.navigateTo({
					url: '/pages/inform-detail/index?informId='+informId,
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "./style/inform.scss";
</style>
