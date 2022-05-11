<template>
	<view>
		<view class="cu-item shadow padding" v-if="deviceNameList.length == 0">
			<van-empty description="暂未管理实验室" />
		</view>
		<view v-else class="margin">
			<view class="cu-form-group">
				<view class="text-xl text-grey">必填项</view>
			</view>
			<view class="cu-form-group">
				<view class="title">实验室门牌*</view>
				<picker @change="LabChange" :range="deviceNameList">
					<view class="picker text-gray">
						{{deviceNameList[index]}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">控制动作*</view>
				<picker @change="ComChange" :range="commandList">
					<view class="picker text-gray">
						{{commandList[index2]}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group margin-top">
				<view class="text-xl text-grey">选填项</view>
			</view>
			<view class="cu-form-group">
				<view class="title">执行时间(精确到天)</view>
				<picker mode="date" :value="remoteControl.date" :start="date" :end="enddate" @change="DateChange">
					<view class="picker text-gray">
						{{remoteControl.date}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group" :hidden="showTime">
				<view class="title">时间选择</view>
				<picker mode="time" :value="remoteControl.time" :start="time" end="24:00" @change="TimeChange">
					<view class="picker text-gray">
						{{remoteControl.time}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">执行时长</view>
				<input :value="remoteControl.arg" type="number" @change="ArgChange" placeholder="请输入执行时间(1~60)" name="input"></input>
			</view>
			<view class="padding-top-xl">
				<view v-if="showButton">
					<button class="cu-btn block line-blue margin-tb-sm lg" disabled>启动</button>
				</view>
				<view v-else>
					<button class="cu-btn block bg-blue margin-tb-sm lg" type="" @click="SubmitData">启动</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		device_remote_control
	} from '@/api/module.js'
	export default {

		props: ['deviceNameList'],
		data() {
			return {
				remoteControl: {
					userid: uni.getStorageSync("userInfo").userid,
					labname: null,
					command: null,
					date: '请选择日期',
					time: '请选择时间',
					arg: null,
				},
				index: 0,
				commandList: ['请选择命令', '立即常开', '预约常开', '立即关'],
				index2: 0,
				date: null,
				enddate: null,
				time: null,
				showTime: true,
				showButton: true,
			}
		},
		watch: {
			remoteControl: {
				deep: true,
				handler(value) {
					var now = new Date()
					var year = now.getFullYear().toString(); //得到年份
					var month = (now.getMonth() + 1).toString(); //得到月份
					var day = now.getDate().toString(); //得到日期
					if (month.length == 1) {
						month = "0" + month;
					}
					if (day.length == 1) {
						day = "0" + day;
					}
					if (value.date == year + month + day) {
						var hour = now.getHours().toString(); //得到小时
						var min = now.getMinutes().toString(); //得到分钟
						if (hour.length == 1) {
							hour = "0" + hour;
						}
						if (min.length == 1) {
							min = "0" + min;
						}
						this.time = hour + ':' + min;
					} else {
						this.time = "00:00"
					}
					if (value.date != '请选择日期') {
						this.showTime = false
					} else {
						this.showTime = true
					}
					if (value.labname == null || value.labname == '请选择实验室' || value.command == null || value.command ==
						'请选择命令') {
						this.showButton = true
					} else {
						this.showButton = false
					}
				}
			}
		},
		methods: {
			getDate() {
				this.remoteControl.labname = null
				this.remoteControl.command = null
				this.index = 0
				this.index2 = 0
				this.remoteControl.date = '请选择日期'
				this.remoteControl.time = '请选择时间'
				this.remoteControl.arg = null
				var now = new Date()
				var year = now.getFullYear().toString(); //得到年份
				var month = (now.getMonth() + 1).toString(); //得到月份
				var day = now.getDate().toString(); //得到日期
				var hour = now.getHours().toString(); //得到小时
				var min = now.getMinutes().toString(); //得到分钟
				if (month.length == 1) {
					month = "0" + month;
				}
				if (day.length == 1) {
					day = "0" + day;
				}
				if (hour.length == 1) {
					hour = "0" + hour;
				}
				if (min.length == 1) {
					min = "0" + min;
				}

				this.date = year + '-' + month + '-' + day
				this.enddate = (now.getFullYear() + 100).toString() + '-' + month + '-' + day
				this.time = hour + ':' + min

			},
			LabChange(e) {
				this.index = e.detail.value
				this.remoteControl.labname = this.deviceNameList[this.index]
			},
			ComChange(e) {
				this.index2 = e.detail.value
				this.remoteControl.command = this.commandList[this.index2]
			},
			DateChange(e) {
				this.remoteControl.date = e.detail.value.replaceAll("-", "")
			},
			TimeChange(e) {
				this.remoteControl.time = e.detail.value
			},
			ArgChange(e) {
				this.remoteControl.arg = e.detail.value
			},
			SubmitData() {
				var remoteControl = JSON.parse(JSON.stringify(this.remoteControl))
				if (remoteControl.arg != null) {
					if (remoteControl.arg < 1 || remoteControl.arg > 60) {
						uni.showToast({
							icon: 'none',
							title: '请输入1~60的执行时间'
						})
						return
					}
				}
				if (remoteControl.date == '请选择日期') {
					remoteControl.date = null
				}
				if (remoteControl.time == '请选择时间') {
					remoteControl.time = null
				}
				if (remoteControl.arg == '') {
					remoteControl.arg = null
				}

				uni.showLoading({
					title: "正在启动"
				})
				device_remote_control(remoteControl).then(res => {
					if(res.data.code == '0'){
						uni.hideLoading()
						uni.showToast({
							title: '启动成功',
							duration: 1000
						})
						this.getDate()
					}
				})
			}
		},
		mounted() {
			this.getDate()
		}
	}
</script>

<style>

</style>
