<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		props:["url"],
		data() {
			return {

			}
		},
	}
</script>

<style>
</style>
