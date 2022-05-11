<template>
	<view class="btns">
		<view class="btn1">
			<view class="btn11">
				<van-button color="#1f8dd6d2" type="primary">取消选中预约</van-button>
			</view>
			<view class="btn11">
				<van-button color="#1f8dd6d2" type="primary">取消剩余所有</van-button>
			</view>
		</view>
		<view class="btn2">
			<van-button color="#1f8dd6d2" type="primary" bind:click="goto_lab_reserve">续约</van-button>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	@import "./style/course-btn.scss";
</style>
