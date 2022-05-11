<template>
	<view>
		<van-dialog use-slot title="数据量过多" :show="showDialog" show-cancel-button @close="onClose">
			<van-empty image="error" description="暂不支持访问1000条以上的数据" />
		</van-dialog>
		<view class="cu-card">
			<view class="cu-item shadow padding" v-if="deviceNameRecord.length == 0">
				<van-empty description="暂未管理实验室" />
			</view>
			<view class="margin" v-else>
				<view class="cu-form-group">
					<view class="title">实验室门牌*</view>
					<picker @change="LabChange" :range="deviceNameRecord">
						<view class="picker text-gray">
							{{deviceNameRecord[index]}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">查询日期*</view>
					<picker mode="date" :value="recordData.date" :start="date" :end="enddate" @change="DateChange">
						<view class="picker text-gray">
							{{recordData.date}}
						</view>
					</picker>
				</view>
				<view class="padding-top-sm">
					<view v-if="showButton">
						<button class="cu-btn block line-blue margin-tb-sm lg" disabled>查询</button>
					</view>
					<view v-else>
						<button class="cu-btn block bg-blue margin-tb-sm lg" type="" @click="SubmitData">查询</button>
					</view>
				</view>
				<view v-if="recordDatas != null">
					<view class="cu-card">
						<view class="cu-item shadow" v-if="recordDatas.length == 0">
							<van-empty description="暂无记录" />
						</view>
						<view v-else class="margin-bottom-xl">
							<view class="cu-item shadow margin-top-sm" v-for="(item,index) in recordDatas" :key="index">
								<view>
									<van-cell>
										<template #title>
											<view class="margin-top-sm">
												<span class="custom-title"><text
														class='cuIcon-title text-blue text-lg'></text>时间:
													{{ item.datetime }}</span>
												<span>
													<span v-if="item.type == '系统'">
														<van-tag type="primary">类型: {{ item.type }}</van-tag>
													</span>
													<span v-else-if="item.type == 'NFC'">
														<van-tag color="#f47920">类型: {{ item.type }}</van-tag>
													</span>
													<span v-else-if="item.type == '远程'">
														<van-tag color="#008792">类型: {{ item.type }}</van-tag>
													</span>
													<span v-else>
														<van-tag type="success">类型: {{ item.type }}</van-tag>
													</span>
												</span>
											</view>
											<view class="text-grey">
												<view class="margin-sm">教工号/学号: {{item.user_id}}</view>
												<view class="margin-sm">姓名: {{item.user_name}}</view>
												<view v-if="item.user_department!=null" class="margin-sm">部门: {{item.user_department}}</view>
												<view v-if="item.user_class!=null" class="margin-sm">专业班级: {{item.user_class}}</view>
												<view class="margin-sm">结果: {{item.result}}</view>
												<view class="margin-sm">描述: {{item.desc}}</view>
												<van-divider contentPosition="center" fontSize="11">
												  第{{index+1}}条,共{{recordDatas.length}}条
												</van-divider>
											</view>
										</template>
									</van-cell>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		query_record_data
	} from '@/api/module.js'
	export default {
		props: ['deviceNameRecord'],
		data() {
			return {
				recordData: {
					labname: null,
					date: null,
				},
				recordDatas: null,
				index: 0,
				date: null,
				enddate: null,
				showButton: true,
				showDialog: false
			}
		},
		watch: {
			recordData: {
				deep: true,
				handler(value) {
					if (value.labname == null || value.labname == '请选择实验室') {
						this.showButton = true
					} else {
						this.showButton = false
					}
				}
			}
		},
		methods: {
			getDate() {
				this.recordData.labname = null
				this.index = 0
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
				this.date = '2000-1-1'
				this.enddate = year + '-' + month + '-' + day
				this.recordData.date = year + month + day
			},
			LabChange(e) {
				this.index = e.detail.value
				this.recordData.labname = this.deviceNameRecord[this.index]
			},
			DateChange(e) {
				this.recordData.date = e.detail.value.replaceAll("-", "")
			},
			SubmitData() {
				var recordData = JSON.parse(JSON.stringify(this.recordData))
				uni.showLoading({
					title: "正在查询"
				})
				query_record_data(this.recordData.labname, this.recordData.date).then(res => {
					if (res.data.code == '0') {
						uni.hideLoading()
						// console.log(res.data.items)
						if (res.data.items.length > 1000) {
							this.showDialog = true
							return
						}
						this.recordDatas = res.data.items
					}
				})
			},
			onClose() {
				this.showDialog = false
			},
		},
		mounted() {
			this.getDate()
		}
	}
</script>

<style>

</style>
