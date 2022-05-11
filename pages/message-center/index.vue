<template>
	<view id="index-outer">
		<van-tabs swipeable color="#1F8DD6">
			<van-tab title="未读消息">
				<message-unread></message-unread>
			</van-tab>
			<van-tab title="已读消息">
				<message-read :cardArr="cardArr" :loading="loading" @refresh="getData"></message-read>
			</van-tab>
		</van-tabs>

	</view>
</template>

<script>
	import messageUnread from "./components/message-unread.vue";
	import messageRead from "./components/message-read.vue";
	import {
		Read
	} from "@/api/module.js"
	export default {
		components: {
			"message-unread": messageUnread,
			"message-read": messageRead,
		},
		data() {
			return {
				model1: false,
				model2: true,
				imgUrls: '',
				loading: true,
				cardArr:'',
			}
		},
		onShow(){
			this.getData()
		},
		onPullDownRefresh() {
			// console.log('refresh');
			const _this = this
			setTimeout(function() {
				_this.getData()
				uni.stopPullDownRefresh();
			}, 1);
		},
		methods: {
			getData() {
				this.loading = true
				Read().then(res => {
					if (res.data.code == 200) {
						this.cardArr = res.data.data
					}
				})
				this.loading = false
			},
		}
	}
</script>

<style lang="scss">
	@import "./style/index.scss";
</style>
