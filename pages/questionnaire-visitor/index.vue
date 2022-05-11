<template>
	<view id="index-outer">
		<questionnaire-visitor :loading="loading" :questionnaires="questionnaires"></questionnaire-visitor>
	</view>
</template>

<script>
	import {
		queryLabpaper,
		labpaperanswerGetByUserno
	} from "@/api/module.js"
	import questionnaireVisitor from "./components/questionnaire-visitor.vue";
	export default {
		components: {
			"questionnaire-visitor": questionnaireVisitor,
		},
		watch:{
			count(newvalue){
				if(newvalue == this.questionnaires.length){
					this.loading = false
				}
			}
		},
		data() {
			return {
				loading: null,
				questionnaires: "",
				count: 1
			}
		},
		onShow() {
			this.loading = true
			this.count = 1
			queryLabpaper().then(res => {
				// console.log(res.data.data)
				if(res.data.code == 200){
					this.questionnaires = res.data.data
				}
				if(this.questionnaires.length == 0){
					this.loading = false
					return
				}
				for (var i = 0; i < this.questionnaires.length; i++) {
					labpaperanswerGetByUserno(this.questionnaires[i].paperid).then(res => {
						if (res.data.data == null){
							return
						}
						for (var j = 0; j < this.questionnaires.length; j++) {
							if (this.questionnaires[j].paperid == res.data.data[0].paperid) {
								this.questionnaires[j].isopen = 2
							}
						}
						this.count ++
					})
				}
			})
		},
	}
</script>

<style lang="scss">
	@import "./style/index.scss";
</style>
