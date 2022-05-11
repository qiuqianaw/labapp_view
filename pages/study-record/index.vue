<template>
	<view>
		<view v-if="loading == false" class="margin">
			<van-loading color="#0094ff" size="48rpx">正在加载...</van-loading>
		</view>
		<view v-else>
			<view v-if="RecordArr.length == 0" class="cu-item shadow padding-top-sm">
				<van-empty description="暂无学习记录" />
			</view>
			<view v-else>
				<view class="cu-form-group radius" style="display: flex;margin-bottom: 10rpx;">
					<view style="display: flex;">
					<view class="cuIcon-title text-red"></view><view>学习总个数:{{RecordArr.length}}个</view>
					</view>
					<view v-if="Studying == 0" style="display: flex;">
						<view class="cuIcon-title text-green"></view><view>学习中:0个</view>
					</view>
					<view v-else style="display: flex;">
						<view class="cuIcon-title text-green"></view><view>学习中:{{Studying}}个</view>
					</view>
					<view v-if="Studied == 0" style="display: flex;">
						<view class="cuIcon-title text-green"></view>已完成:0个
					</view>
					<view v-else style="display: flex;">
						<view class="cuIcon-title text-blue"></view>已完成:{{Studied}}个
					</view>
				</view>
				<view v-for="(item,index) in RecordArr" :key="index">
					<view class="text-grey recordBox" v-if="item.status == 1">
						<view class="cu-bar solid-bottom bg-white">
							<view class="action">
								<text class="cuIcon-titles text-blue"></text>{{item.lablearnResources[0].resourcename}}
							</view>
						</view>
						<form>
							<view class="cu-form-group radius" v-if="resource[0].resourcetype == 1">
								<view class="title">资源类型: </view>
								<input disabled :placeholder="typeA" />
							</view>
							<view class="cu-form-group radius" v-else-if="resource[0].resourcetype == 2">
								<view class="title">资源类型: </view>
								<input disabled :placeholder="typeB" />
							</view>
							<view class="cu-form-group radius" v-else-if="resource[0].resourcetype == 3">
								<view class="title">资源类型: </view>
								<input disabled :placeholder="typeC" />
							</view>
							<view class="cu-form-group radius" v-else>
								<view class="title">资源类型: </view>
								<input disabled :placeholder="typeD" />
							</view>
							<view class="cu-form-group radius" v-if="resource[0].usetype==1">
								<view class="title">使用类型: </view>
								<input disabled :placeholder="usetypeA" />
							</view>
							<view class="cu-form-group radius" v-else>
								<view class="title">使用类型: </view>
								<input disabled :placeholder="usetypeB" />
							</view>
							<view class="cu-form-group radius" v-if="item.status==1">
								<view class="title">完成情况: </view>
								<input disabled :placeholder="statusA" />
							</view>
							<view class="cu-form-group radius" v-else-if="item.status==0">
								<view class="title">完成情况: </view>
								<input disabled :placeholder="statusB" />
							</view>

							<view class="cu-form-group radius">
								<view class="title">上次学习时间: </view>
								<input disabled :placeholder="item.learntime" />
							</view>
						</form>
					</view>

					<view class="text-grey recordBox" v-else-if="item.status == 2">
						<view class="cu-bar solid-bottom bg-white">
							<view class="action">
								<text class="cuIcon-titles text-green"></text>{{item.lablearnResources[0].resourcename}}
							</view>
						</view>
						<form>
							<view class="cu-form-group radius" v-if="resource[0].resourcetype == 1">
								<view class="title">资源类型: </view>
								<input disabled :placeholder="typeA" />
							</view>
							<view class="cu-form-group radius" v-else-if="resource[0].resourcetype == 2">
								<view class="title">资源类型: </view>
								<input disabled :placeholder="typeB" />
							</view>
							<view class="cu-form-group radius" v-else-if="resource[0].resourcetype == 3">
								<view class="title">资源类型: </view>
								<input disabled :placeholder="typeC" />
							</view>
							<view class="cu-form-group radius" v-else>
								<view class="title">资源类型: </view>
								<input disabled :placeholder="typeD" />
							</view>
							<view class="cu-form-group radius" v-if="resource[0].usetype==1">
								<view class="title">使用类型: </view>
								<input disabled :placeholder="usetypeA" />
							</view>
							<view class="cu-form-group radius" v-else>
								<view class="title">使用类型: </view>
								<input disabled :placeholder="usetypeB" />
							</view>
							<view class="cu-form-group radius">
								<view class="title">完成情况: </view>
								<input disabled :placeholder="statusB" />
							</view>
							<!-- <view class="cu-form-group radius">
					<view class="title">完成情况: </view>
					<input disabled :placeholder="statusB" />
				</view> -->

							<view class="cu-form-group radius">
								<view class="title">上次学习时间: </view>
								<input disabled :placeholder="item.learntime" />
							</view>
						</form>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		RecordStudied,
		RecordStudying,
		Record
	} from "@/api/module.js"
	export default {
		data() {
			return {
				loading: false,
				RecordArr: '',
				Studied: '',
				Studying: '',
				statusA: "已学完",
				statusB: "学习中",
				usetypeA: "安全准入",
				usetypeB: "普通学习",
				typeA: "视频",
				typeB: "音频",
				typeC: "文本",
				typeD: "其他",
			}
		},
		mounted() {
			this.loading = true
			Record().then(res => {
					this.loading = true
					this.RecordArr = res.data.data
					// console.log(res.data.data)
				}),
				RecordStudied().then(res => {
					this.Studied = res.data.data.length
					// console.log(res.data.data.length)
				}),
				RecordStudying().then(res => {
					this.Studying = res.data.data.length
					// console.log(res.data.data.length)
				})
		},
	}
</script>

<style lang="scss">
	@import "./style/index.scss";
</style>
