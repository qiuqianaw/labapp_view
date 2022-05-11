<template>
	<view class="qr_code">
		<image :src="qrCode"></image>
	</view>
</template>

<script>
	import {
		getQrcode
	} from "@/api/module.js"
	export default {
		data() {
			return {
				qrCode: '',
				time: null
			}
		},
		mounted() {
			this.queryQrcode();
			this.time = setInterval(this.queryQrcode, 5000);

		},
		methods: {
			queryQrcode() {
				const userInfo = uni.getStorageSync("userInfo");
				getQrcode(userInfo.userid).then(res => {
			    this.qrCode = res.data.data
					// console.log(res.data);
				})
				this.qrCode = null;
			},
		},
		destroyed() {
			clearInterval(this.time)
		}
	}
</script>

<style lang="scss">
	@import "./style/qr-code"
</style>
