<template>
	<view id="index-outer">
		<experiment-detail :academicyearno="academicyearno" :termno="termno" :courseno="courseno" :expclassno="expclassno" />
	</view>
</template>

<script>
	import {experimentDetail} from './components/experiment-detail.vue'
	export default {
		components:{
			'experiment-detail': experimentDetail,
		},
		data(){
			return{
				academicyearno: '',
				termno: '',
				courseno: '',
				expclassno: ''
			}
		},
		onLoad(options) {
			this.academicyearno = options.academicyearno
			this.termno = options.termno
			this.courseno = options.courseno
			this.expclassno = options.expclassno
		}
	}
</script>

<style lang="scss">
	@import "./style/index.scss";
</style>
