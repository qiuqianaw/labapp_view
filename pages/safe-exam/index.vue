<template>
	<view  id="index-outer">
		<van-toast id="van-toast"/>
		<safe-exam :said="said" :loading="loading" :LabsaExaminfo="LabsaExaminfo"></safe-exam>
	</view>
</template>
<script>
	import safeExam from "./components/safe-exam.vue"
	import {
		getLabsaExaminfoBySaid,
	} from '@/api/module.js'
	export default {
		components: {
			"safe-exam": safeExam,
		},
		data(){
			return {
				said:"",
				loading: null,
				LabsaExaminfo: '',
			}
		},
		onLoad(options) {
			this.said = options.said
		},
		onShow() {
			this.loading = true
			getLabsaExaminfoBySaid(this.said).then((res) => {
				if (res.data.code == 200) {
					// console.log(res.data.data)
					this.LabsaExaminfo = res.data.data
				}
				this.loading = false
			})
		},
	}
</script>

<style lang="scss">
	@import "./style/index.scss";
</style>
