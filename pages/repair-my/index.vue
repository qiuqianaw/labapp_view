<template>
	<view id="index-outer">
		<view>
			<view v-if="loading == true" class="margin">
				<van-loading color="#0094ff" size="48rpx">正在加载...</van-loading>
			</view>
			<view v-else>
				<van-tabs swipeable color="#1f8dd6d2">
					<van-tab :title="'报修中('+repairLength+')'">
						<repair :repair="repair" :repairImgsList="repairImgsList" :loading="loading" @random="randNum($event)"></repair>
					</van-tab>
					<van-tab :title="'已确认('+confirmedLength+')'">
						<confirmed :confirmed="confirmed" :confirmedImgsList="confirmedImgsList" :loading="loading" @random="randNum($event)"></confirmed>
					</van-tab>
					<van-tab :title="'已解决('+(repairedLength+unrepairedLength)+')'">
						<view class="margin-top-sm">
						<van-tabs class="margin-top" color="#1f8dd6d2" type="card">
							<van-tab :title="'已修复('+repairedLength+')'">
								<repaired :repaired="repaired" :repairedImgsList="repairedImgsList" :loading="loading" @random="randNum($event)"></repaired>
							</van-tab>
							<van-tab :title="'已报废('+unrepairedLength+')'">
								<unrepaired :unrepaired="unrepaired" :unrepairedImgsList="unrepairedImgsList" :loading="loading" @random="randNum($event)">
								</unrepaired>
							</van-tab>
						</van-tabs>
						</view>
					</van-tab>
				</van-tabs>
			</view>
		</view>
	</view>
</template>

<script>
	import repair from "./components/repair.vue";
	import repaired from "./components/repaired.vue";
	import unrepaired from "./components/unrepaired.vue";
	import confirmed from "./components/confirmed.vue";
	import {listByStatus} from '@/api/module.js'
	export default {
		components: {
			"repair": repair,
			"repaired": repaired,
			"unrepaired": unrepaired,
			"confirmed": confirmed
		},
		watch:{
			status(newvalue){
				if(newvalue == 4){
					this.loading = false
				}
			},
			random(newvalue){
				// console.log(newvalue)
				for (var i = 1; i <= 4; i++) {
					this.getData(i)
				}
			}
		},
		onShow() {
			this.loading = true
			for (var i = 1; i <= 4; i++) {
				this.getData(i)
			}
		},
		data() {
			return {
				loading: true,
				repair: null,
				confirmed: null,
				repaired: null,
				unrepaired: null,
				repairLength: 0,
				confirmedLength: 0,
				repairedLength: 0,
				unrepairedLength: 0,
				repairImgsList: [],
				confirmedImgsList: [],
				repairedImgsList: [],
				unrepairedImgsList: [],
				status: null,
				random: ''
			}
		},
		methods: {
			getData(status) {
				listByStatus(status).then(res => {
					if (res.data.code == 200) {
						if (status == 1) {
							this.repair = res.data.data
							this.repairLength = res.data.data.length
							// console.log(this.repair)
						} else if (status == 2) {
							this.confirmed = res.data.data
							this.confirmedLength = res.data.data.length
						} else if (status == 3) {
							this.repaired = res.data.data
							this.repairedLength = res.data.data.length
						} else {
							this.unrepaired = res.data.data
							this.unrepairedLength = res.data.data.length
						}
						for (var index in res.data.data) {
							if (res.data.data[index].imgs != null) {
								for (var index2 in res.data.data[index].imgs) {
									if (status == 1) {
										this.repairImgsList.push(res.data.data[index].imgs[index2].filepath)
									} else if (status == 2) {
										this.confirmedImgsList.push(res.data.data[index].imgs[index2].filepath)
									} else if (status == 3) {
										this.repairedImgsList.push(res.data.data[index].imgs[index2].filepath)
									} else {
										this.unrepairedImgsList.push(res.data.data[index].imgs[index2].filepath)
									}
								}
							}
						}
					
					}
					this.status = status
				})
			},
			randNum(val){
				this.random = val
			}
		},
	}
</script>

<style lang="scss">
	@import './style/index.scss';
</style>
