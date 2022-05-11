<template>
	<view>
		<view v-if="informArry.length == 0">
			<van-loading color="#0094ff" size="48rpx">加载中...</van-loading>
		</view>
		<view v-else class="commNewsModule">
			<view class="card" v-for="(item,index) in informArry" :key="index">
				<view class="card_news" @click="informdetail(item.nsnid)">
					<view class="card_title">
						<uni-icons type="smallcircle-filled" size="10" color="rgb(0, 129, 255)"></uni-icons>
						<text class="title">{{item.title}}</text>
					</view>
					<view class="card_content2">{{item.content}}</view>
					<view>
						<text class="type" v-if="item.type==1">新闻</text>
						<text class="type" v-else-if="item.type==2">公告</text>
						<text class="date">{{item.sendtime}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		queryNoticeByTime,
	} from "@/api/module.js"
	export default {
		data() {
			return {
				informArry: ''
			}
		},
		mounted() {
			queryNoticeByTime().then(res => {
				this.informArry = res.data.data
			})
		},
		methods: {
			informdetail: function(nsnid) {
				var informId = nsnid
				uni.navigateTo({
					url: '/pages/inform-detail/index?informId=' + informId,
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "./style/NewsInform.scss"
</style>
