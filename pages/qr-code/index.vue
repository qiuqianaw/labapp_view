<template>
	<view id="index-outer">
		<qr-code></qr-code>
		<qr-use></qr-use>
	</view>
</template>

<script>
	import qrCode from "./components/qr-code.vue";
	import qrUse from "./components/qr-use.vue";
	export default {
		components: {
			"qr-code": qrCode,
			"qr-use": qrUse,
		},
	}
</script>

<style lang="scss">
	@import "./style/index"
</style>
