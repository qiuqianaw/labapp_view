<template>
	<view  id="index-outer">
		<van-toast id="van-toast"/>
		<questionnaire-content :questionnaireId="questionnaireId" :loading="loading" :questionnaires="questionnaires"></questionnaire-content>
	</view>
</template>
<script>
	import {queryLabpaperById} from "@/api/module.js"
	import questionnaireContent from "./components/questionnaire-content.vue"
	export default {
		components: {
			"questionnaire-content": questionnaireContent,
		},
		data(){
			return {
				questionnaireId:"",
				loading: null,
				questionnaires: []
			}
		},
		onLoad(options) {
			this.questionnaireId = options.questionnaireId
		},
		onShow() {
			this.loading = true
			queryLabpaperById(this.questionnaireId).then(res => {
				if(res.data.code == 200){
					this.questionnaires = res.data.data
				}
				this.loading = false
				// console.log(res.data.data)
			})
		},
	}
</script>
<style lang="scss">
	@import "./style/index.scss";
</style>
