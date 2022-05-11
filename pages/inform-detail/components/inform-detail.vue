<template>
	<view>
		<view v-if="inform.length == 0">
			<van-loading color="#0094ff" size="48rpx">加载中...</van-loading>
		</view>
		<view v-else class="detail">
			<view class="title">{{inform[0].labNewsnotice.title}}</view>
			<van-divider contentPosition="right" customStyle="border-color:#8a8a8a">
				<van-icon name="calendar-o" color="#1f8dd6d2" /><text
					class="date">{{inform[0].labNewsnotice.sendtime}}</text>
			</van-divider>
			<text class="message">
				{{inform[0].labNewsnotice.content}}
			</text>
			<view v-for="(item,index) in inform[0].labFilestorager" :key="index">
				<image :src="item.filepath"></image>
			</view>
			
			<!-- <text class="title">
				阅读量：{{inform[0].labNewsnotice.hitcnt}}
			</text> -->
		</view>
	</view>
</template>

<script>
	import {
		labNewsNoticeById
	} from "@/api/module.js"
	export default {
		props: ["informId"],
		data() {
			return {
				inform: '',
			}
		},
		mounted() {
			labNewsNoticeById(this.informId).then(res => {
				this.inform = res.data.data
				// console.log(res.data.data)
			})
		},
	}
</script>

<style lang="scss">
	@import "./style/inform-detail.scss"
</style>
