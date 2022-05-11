<template>
	<view id="index-outer" class="bg-gradual-blue padding radius text-center shadow-blur">
		<van-toast id="van-toast"/>
		<title></title>
		<view class="margin">
			<van-row>
				<van-col span="12"><button @click="toShowTeacher" class="cu-btn lg text-center shadow-blur">教师登录</button></van-col>
				<van-col span="12"><button @click="toShowStudent" class="cu-btn lg text-center shadow-blur">学生登录</button></van-col>				
			</van-row>
		</view>
		<login-box v-if="showTeacher" identity="teacher"></login-box>
		<login-box v-if="showStudent" identity="student"></login-box>
	</view>
</template>

<script>
	import title from "./components/title.vue";
	import loginBox from "./components/login-box.vue";
	import Toast from '@/wxcomponents/vant/toast/toast.js';
	export default {
		components: {
			"title":title, 
			"login-box":loginBox,
		},
		data(){
			return{
				showTeacher:true,
				showStudent:false
			}
		},
		methods:{
			toShowTeacher(){
				this.showTeacher = true,
				this.showStudent = false
			},
			toShowStudent(){
				this.showTeacher = false,
				this.showStudent = true
			}
		},
		onLoad(options) {
			if(options.code == 401)
				Toast.fail("请先登录")
			if(options.code == 500)
				Toast.fail("登录信息已过期，请重新登陆")
		}
	}
</script>

<style lang="scss">
	@import "./style/index.scss";
	@import '/colorui/main.css';
	@import '/colorui/icon.css';
</style>
