<template>
	<view id="index-outer">
		<van-tabs swipeable color="#1f8dd6d2">
			<van-tab title="项目卡">
				<exper-prjcard :academicyearno="academicyearno" :termno="termno" :courseno="courseno" :prjno="prjno">
				</exper-prjcard>
			</van-tab>
			<view v-if="info.rolename == '学生'">
				<van-tab title="实验成绩">
					<exper-project :academicyearno="academicyearno" :termno="termno" :courseno="courseno" :prjno="prjno"
						:expclassno="expclassno"></exper-project>
				</van-tab>
			</view>
			<view v-else>
				<van-tab title="学生名单">
					<exper-student :academicyearno="academicyearno" :termno="termno" :courseno="courseno" :prjno="prjno" @random="randNum($event)"
						:expclassno="expclassno"></exper-student>
				</van-tab>
				<van-tab title="修改学生成绩">
					<exper-project :random="random" :academicyearno="academicyearno" :termno="termno" :courseno="courseno" :prjno="prjno"
						:expclassno="expclassno"></exper-project>
				</van-tab>
			</view>
		</van-tabs>
	</view>
</template>

<script>
	import experPrjcard from "./components/exper-prjcard.vue";
	import experProject from "./components/exper-project.vue";
	import experStudent from "./components/exper-student.vue";
	export default {
		components: {
			"exper-prjcard": experPrjcard,
			"exper-project": experProject,
			"exper-student": experStudent
		},
		data() {
			return {
				academicyearno: '',
				termno: '',
				courseno: '',
				prjno: '',
				expclassno: '',
				info: '',
				random:''
			}
		},
		mounted() {
			this.info = uni.getStorageSync("userInfo")
		},
		onLoad(options) {
			this.academicyearno = options.academicyearno
			this.termno = options.termno
			this.courseno = options.courseno
			this.prjno = options.prjno
			this.expclassno = options.expclassno
		},
		methods:{
			randNum(val){
				this.random = val
			}
		}
	}
</script>

<style lang="scss">
	@import "./style/index.scss";
</style>
