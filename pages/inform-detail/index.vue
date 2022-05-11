<template>
	<view id="index-outer">
		<inform-detail :informId= "informId"></inform-detail>
	</view>
</template>

<script>
	import informDetail from "./components/inform-detail.vue";
	export default {
		components: {
			"inform-detail": informDetail,
		},
		data(){
			return {
				informId: ""
			}
		},
		onLoad(options) {
			this.informId = options.informId
		},
	}
</script>

<style lang="scss">
	@import "./style/index.scss"
</style>
