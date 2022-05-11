<template>
	<view id="index-outer">
		<safe-study :said="said" :loading="loading" :LabsaStudylist="LabsaStudylist"></safe-study>
	</view>
</template>

<script>
	import {getLabsaStudylist} from '@/api/module.js'
	import safeStudy from './components/safe-study.vue'
	export default {
		components: {
			'safe-study': safeStudy
		},
		data(){
			return{
				said:'',
				loading: null,
				LabsaStudylist:''
			}
		},
		onLoad(options) {
			this.said = options.said
		},
		onShow() {
			this.loading = true
			getLabsaStudylist(this.said).then(res => {
				if(res.data.code == 200){
					this.LabsaStudylist = res.data.data
				}
				this.loading = false
			})
		},
	}
</script>

<style lang="scss">
	@import "./style/index.scss";
</style>
