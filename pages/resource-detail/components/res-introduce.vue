<template>
	<view class="top">
		<view class="text-grey">
			<view class="cu-bar solid-bottom bg-white">
				<view class="action">
					<text class="cuIcon-titles text-blue"></text>资源介绍
				</view>
			</view>
			<form>
				<view class="cu-form-group radius">
					<view class="title">资源名称: </view>
					<input disabled :placeholder="resource[0].resourcename" />
				</view>
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
					<view class="title">资源大小: </view>
					<input disabled :placeholder="resource[0].labFilestoragerList[0].filepath.length" />
				</view>
				<view class="cu-form-group radius" v-if="lab[0].status==1">
					<view class="title">完成情况: </view>
					<input disabled :placeholder="statusA" />
				</view>
				<view class="cu-form-group radius" v-else-if="lab[0].status==2">
					<view class="title">完成情况: </view>
					<input disabled :placeholder="statusB" />
				</view>
				<view class="cu-form-group radius" v-else>
					<view class="title">完成情况: </view>
					<input disabled :placeholder="statusC" />
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import {
		queryLablearn
	} from "@/api/module.js"
	export default {
		props: {
			resource:{
				type: Array,
				default: function (){
					return {}
				},
			},
			resourceid:''
		},
		data() {
			return {
				lab: '',
				typeA:"视频",
				typeB:"音频",
				typeC:"文本",
				typeD:"其他",
				usetypeA:"安全准入",
				usetypeB:"普通学习",
				statusA:"已学完",
				statusB:"学习中",
				statusC:"未学完",
			}
		},
		mounted() {
			const userInfo = uni.getStorageSync("userInfo")
			queryLablearn(userInfo.userid, this.resourceid).then(res => {
				this.lab = res.data.data
				// console.log(res)
			})
		}
	}
</script>

<style>
</style>
