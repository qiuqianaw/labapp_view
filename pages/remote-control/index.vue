<template>
	<view>
		<view>
			<view v-if="loading == true" class="margin">
				<van-loading color="#0094ff" size="48rpx">正在加载...</van-loading>
			</view>
			<view v-else>
				<van-tabs swipeable color="#1f8dd6d2">
					<van-tab title="远程控制">
						<remote-control :deviceNameList="deviceNameList"></remote-control>
					</van-tab>
					<van-tab title="记录查询">
						<record-data :deviceNameRecord="deviceNameRecord"></record-data>
					</van-tab>
					<van-tab title="门禁列表">
						<device-list :deviceList="deviceList"></device-list>
					</van-tab>
				</van-tabs>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		query_device_list
	} from '@/api/module.js'
	import deviceList from './components/device-list.vue'
	import remoteControl from './components/remote-control.vue'
	import recordData from './components/record-data.vue'
	export default {
		components: {
			"device-list": deviceList,
			"remote-control": remoteControl,
			"record-data": recordData
		},
		data() {
			return {
				deviceList: [],
				loading: null,
				deviceNameList: [],
				deviceNameRecord: []
			}
		},
		methods: {
			getData() {
				this.loading = true
				query_device_list().then(res => {
					if (res.data.code == "0") {
						this.deviceList = res.data.items
					}
					this.getName()
					this.loading = false
				})

			},
			getName() {
				this.deviceNameList.push('请选择实验室')
				for (var index in this.deviceList) {
					if (this.deviceList[index].device_status != null) {
						// console.log(this.deviceList)
						if (this.deviceList[index].device_status.indexOf('离线') == -1 && (this.deviceList[index]
							.device_hardtype == '中控型' || this.deviceList[index]
							.device_hardtype == '独立型')) {
							this.deviceNameList.push(this.deviceList[index].device_name)
						}
					}else{
						if(this.deviceList[index].device_hardtype == '中控型' || this.deviceList[index].device_hardtype == '独立型'){
							this.deviceNameList.push(this.deviceList[index].device_name)
						}
					}
					this.deviceNameRecord.push(this.deviceList[index].device_name)
				}
			}
		},
		onShow() {
			this.getData()
		}
	}
</script>

<style>
</style>
