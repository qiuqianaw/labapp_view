<template>
	<view id="index-outer">
		<course-num></course-num>
		<course-btn></course-btn>
	</view>
</template>

<script>
	import courseNum from "./components/course-num.vue";
	import courseBtn from "./components/course-btn.vue";
	export default {
		components: {
			"course-num": courseNum,
			"course-btn": courseBtn,
		}
	}
</script>

<style lang="scss">
	@import "./style/index.scss";
</style>
