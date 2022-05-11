<template>
	<view class="course_num">
		<view class="title">可取消节次:</view>
		<view class="nums">
			<view class="num">
				<van-checkbox shape="square" bind:change="">
					2020-07-04 12节
				</van-checkbox>
			</view>
			<view class="num">
				<van-checkbox shape="square" bind:change="">
					2020-07-04 34节
				</van-checkbox>
			</view>
			<view class="num">
				<van-checkbox shape="square" bind:change="">
					2020-07-08 78节
				</van-checkbox>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	@import "./style/course-num.scss";
</style>
