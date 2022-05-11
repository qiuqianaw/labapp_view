<template>
	<view id="index-outer">
		<NewsInform></NewsInform>
	</view>
</template>
<script>
	import NewsInform from "./components/NewsInform.vue";
	export default {
		components: {
			"NewsInform": NewsInform,
		},
		data() {
			return {}
		}
	}
</script>

<style lang="scss">
	@import "./style/index.scss"
</style>
