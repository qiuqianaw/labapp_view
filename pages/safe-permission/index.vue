<template>
	<view id="index-outer">
		<van-tabs swipeable color="#1f8dd6d2">
			<van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o" text="获得的证书请在(我的—安全证书)里查看" />
			<van-tab title="全部">
				<safe-all :LabsaInfoList="LabsaInfoList" />
			</van-tab>
			<van-tab title="实验室准入">
				<safe-lab :LabsaInfoListLab="LabsaInfoListLab" />
			</van-tab>
			<van-tab title="特种设备准入">
				<safe-eq :LabsaInfoListEq="LabsaInfoListEq" />
			</van-tab>
		</van-tabs>
	</view>
</template>

<script>
	import safeAll from './components/safe-all.vue'
	import safeLab from './components/safe-lab.vue'
	import safeEq from './components/safe-eq.vue'
	import {
		getLabsaInfoList,
		getLabsaInfoListBySatype
	} from '@/api/module.js'

	export default {
		components: {
			'safe-all': safeAll,
			'safe-lab': safeLab,
			'safe-eq': safeEq,
		},
		data() {
			return {
				LabsaInfoList: null,
				LabsaInfoListEq: null,
				LabsaInfoListLab: null,
				loading: null
			}
		},
		onShow() {
			this.loading = true
			getLabsaInfoList().then((res) => {
				if (res.data.code == 200) {
					this.LabsaInfoList = res.data.data
					getLabsaInfoListBySatype('2').then(res => {
						if (res.data.code == 200) {
							this.LabsaInfoListEq = res.data.data
							getLabsaInfoListBySatype('1').then(res=>{
								if(res.data.code == 200){
									this.LabsaInfoListLab = res.data.data
									this.loading = false
								}
							})
						}
					})
				}
			})
		},
	}
</script>

<style lang="scss">
	@import './style/index.scss';
</style>
