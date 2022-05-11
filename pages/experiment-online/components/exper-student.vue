<template>
	<view>
		<view v-if="loading == true" class="margin">
			<van-loading color="#0094ff" size="48rpx">正在加载...</van-loading>
		</view>
		<view v-else>
			<van-dialog show-cancel-button use-slot title="初始化成绩" :show="show" @close="onClose" id="van-dialog"
				@confirm="onSubmit">
				<view class="margin text-content">
					初始化成绩仅会将未录分的学生的成绩<span class="text-red">初始化</span>,您确认初始化学生成绩吗？
				</view>
			</van-dialog>
			<!-- <van-dialog
			  show-cancel-button
			  use-slot
			  title="成绩录入"
			  :show="show"
			  @close="onClose"
			  @confirm="onSubmit"
			>
				  <view>
					  <van-field
					    :value="markInfo.studentno"
					    label="学号"
					    disabled
					  />
					  <van-field
					    :value="markInfo.studentname"
					    label="姓名"
					    disabled
					  />
					  <view v-for="(item,index) in markInfo.labcourseStutaskinfoList" :key="index" center :title="'任务'+item.taskid">
							<view class="flex" @click="onChangeTask(item.isfinish,index)">
								<view class="text-lg flex-sub margin-left"><text class="cuIcon-writefill"></text>任务{{item.taskid}}</view>
								<view class="flex-twice"><van-switch :checked="item.isfinish==1" size="24" /></view>
							</view>
					  </view>
					    <van-field
					      :value="markInfo.prjscore"
						  label="分数"
					      placeholder="请输入分数"
						  type="number"
					      @change="onChange"
					    />
				  </view>
			</van-dialog> -->
			</van-action-sheet>
			<view class="cu-card text-center">
				<view>
					<view class="margin-top margin-right margin-left cu-bar solid-bottom bg-white">
						<view class="action">
							<text class="cuIcon-titles text-blue"></text>注:点击按钮初始化学生成绩。
							<view @click="initData">
								<van-button icon="records" type="info" size="small" round>
									点击初始化
								</van-button>
							</view>

						</view>
					</view>
				</view>
				<!-- <view class="margin text-bold bg-white">※注: 学号只显示后两位</view> -->
				<view class="cu-item shadow padding-top-sm padding-bottom-sm">
					<view class="flex">
						<view class="flex-sub">学号</view>
						<view class="flex-sub">姓名</view>
					</view>
					<view v-if="LabcourseStuexpinfos.length == 0">
						<view class="flex margin-top-sm">
							<view class="flex-sub">无</view>
							<view class="flex-sub">无</view>
						</view>
					</view>
					<view v-else>
						<view class="flex margin-top-sm" v-for="(item,index) in LabcourseStuexpinfos" :key="index">
							<view class="flex-sub">{{item.studentno}}</view>
							<view class="flex-sub">{{item.studentname}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getLabcourseStuByParams,
		saveLabcourseStuprjscoreinfos
	} from '@/api/module.js'
	export default {
		props: ["academicyearno", "termno", "courseno", "prjno", "expclassno"],
		data() {
			return {
				loading: true,
				LabcourseStuexpinfos: '',
				LabcourseStutaskinfo: '',
				show: false,
				markInfo: '',
				markInfos: [],
				checked: true,
			}
		},
		mounted() {
			getLabcourseStuByParams(this.academicyearno, this.termno, this.courseno, this.prjno, this.expclassno).then(res => {
					if (res.data.code == 200) {
						// console.log(res.data.data)
						this.LabcourseStuexpinfos = res.data.data.labcourseStuexpinfos
						this.LabcourseStutaskinfo = res.data.data.labcourseExpprjcard
					}
					this.loading = false
				})

		},
		methods: {
			onSubmit() {
				// if (this.markInfo.prjscore < 0 || this.markInfo.prjscore > 10 || !(/(^[0-9]\d*$)/.test(this.markInfo
				// 		.prjscore))) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '请输入0-10的整数'
				// 	})
				// 	return
				// }
				uni.showLoading({
					title:'正在初始化'
				})
				saveLabcourseStuprjscoreinfos(this.markInfos).then(res => {
					this.$emit("random", Math.random())
					uni.hideLoading()
					uni.showToast({
						title: '初始化成功'
					})
				})
			},
			initData() {
				this.markInfos = []
				for (var index in this.LabcourseStuexpinfos) {
					var item = this.LabcourseStuexpinfos[index]
					var labcourseStutaskinfoList = []
					for (var i = 1; i <= this.LabcourseStutaskinfo.tasknum; i++) {
						var labcourseStutaskinfo = {
							academicyearno: this.LabcourseStutaskinfo.academicyearno,
							termno: this.LabcourseStutaskinfo.termno,
							courseno: this.LabcourseStutaskinfo.courseno,
							coursename: this.LabcourseStutaskinfo.coursename,
							classno: item.classno,
							expclassno: item.expclassno,
							studentno: item.studentno,
							studentname: item.studentname,
							classname: item.classname,
							prjno: this.LabcourseStutaskinfo.prjno,
							prjname: this.LabcourseStutaskinfo.prjname,
							taskid: i,
							isfinish: null,
							taskscore: null,
							recordtime: ''
						}
						labcourseStutaskinfoList.push(labcourseStutaskinfo)
					}
					var markInfo = {
						academicyearno: this.LabcourseStutaskinfo.academicyearno,
						termno: this.LabcourseStutaskinfo.termno,
						courseno: this.LabcourseStutaskinfo.courseno,
						coursename: this.LabcourseStutaskinfo.coursename,
						classno: item.classno,
						expclassno: item.expclassno,
						studentno: item.studentno,
						studentname: item.studentname,
						classname: item.classname,
						prjno: this.LabcourseStutaskinfo.prjno,
						prjname: this.LabcourseStutaskinfo.prjname,
						prjscore: null,
						recordtime: '',
						labcourseStutaskinfoList: labcourseStutaskinfoList
					};
					this.markInfos.push(markInfo)
				}
				// console.log(this.markInfos)
				this.show = true
			},
			onClose(){
				this.show = false
			},
			// onPopShow(item){
			// 	var labcourseStutaskinfoList = []
			// 	for(var i=1; i<=this.LabcourseStutaskinfo.tasknum; i++){
			// 		var labcourseStutaskinfo = {
			// 			academicyearno: this.LabcourseStutaskinfo.academicyearno,
			// 			termno: this.LabcourseStutaskinfo.termno,
			// 			courseno: this.LabcourseStutaskinfo.courseno,
			// 			coursename: this.LabcourseStutaskinfo.coursename,
			// 			classno: item.classno,
			// 			expclassno: item.expclassno,
			// 			studentno: item.studentno,
			// 			studentname: item.studentname,
			// 			classname: item.classname,
			// 			prjno: this.LabcourseStutaskinfo.prjno,
			// 			prjname: this.LabcourseStutaskinfo.prjname,
			// 			taskid: i,
			// 			isfinish: 0,
			// 			taskscore: 0,
			// 			recordtime: ''
			// 		}
			// 		labcourseStutaskinfoList.push(labcourseStutaskinfo)
			// 	}
			// 	this.markInfo = {
			// 		academicyearno: this.LabcourseStutaskinfo.academicyearno,
			// 		termno: this.LabcourseStutaskinfo.termno,
			// 		courseno: this.LabcourseStutaskinfo.courseno,
			// 		coursename: this.LabcourseStutaskinfo.coursename,
			// 		classno: item.classno,
			// 		expclassno: item.expclassno,
			// 		studentno: item.studentno,
			// 		studentname: item.studentname,
			// 		classname: item.classname,
			// 		prjno: this.LabcourseStutaskinfo.prjno,
			// 		prjname: this.LabcourseStutaskinfo.prjname,
			// 		prjscore: 0,
			// 		recordtime: '',
			// 		labcourseStutaskinfoList: labcourseStutaskinfoList
			// 	};
			// 	this.show = true
			// },
			// onChangeTask(value,index){
			// 	if(value == 1){
			// 		this.markInfo.labcourseStutaskinfoList[index].isfinish = 0
			// 		return
			// 	}
			// 	this.markInfo.labcourseStutaskinfoList[index].isfinish = 1
			// },
			// onChange(event){
			// 	this.markInfo.prjscore = event.detail
			// }
		}
	};
</script>

<style lang="scss">
	@import "./style/exper-project.scss";
</style>
