<template>
	<view>
		<view class="cu-card">
			<view class="cu-item shadow padding" v-if="deviceList.length == 0">
				<van-empty description="暂未管理实验室" />
			</view>
			<view v-else class="margin-bottom-xl">
				<view class="cu-item shadow padding-top padding-lr" v-for="(item,index) in deviceList" :key="index">
					<view>
						<van-cell>
							<template #title>
								<view class="margin-top-sm">
									<span class="custom-title"><text class='cuIcon-title text-blue text-lg'></text>实验室:
										{{ item.device_name }}</span>
									<span>
										<van-tag type="primary">类型: {{ item.device_hardtype }}</van-tag>
									</span>
								</view>
								<view class="text-grey">
									<view class="margin-sm">ip地址: {{item.device_ip}}</view>
									<view v-if="item.device_status!=null">
										<view v-if="item.device_status.indexOf('在线')!=-1" class="margin-sm text-green">状态: {{item.device_status}}</view>
										<view v-else class="margin-sm text-red">状态: {{item.device_status}}</view>
									</view>
									<view v-else class="margin-sm">
										状态: 无
									</view>
									<view class="margin-sm">用途: {{item.device_usetype}}</view>
									<view class="margin-sm">部门: {{item.device_department}}</view>
									<view class="margin-sm">描述: {{item.device_desc}}</view>
								</view>
							</template>
						</van-cell>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['deviceList'],
		data() {
			return {

			}
		},
		methods: {

		},
		mounted() {

		}
	}
</script>

<style>

</style>
