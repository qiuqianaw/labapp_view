<template>
	<view>
		<view v-if="loading == true" class="margin">
		  <van-loading color="#0094ff" size="48rpx"
		    >正在加载...</van-loading
		  >
		</view>
		<view v-else>
			<van-dialog
			  show-cancel-button
			  use-slot
			  title="成绩修改"
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
					  <!-- <van-stepper :value="markInfo.prjscore" @change="onChange" integer min="0" max="10" /> -->
					    <van-field
					      :value="markInfo.prjscore"
						  label="分数"
					      placeholder="请输入分数"
						  type="number"
					      @change="onChange"
					    />
						<van-field
						  :value="markInfo.recordtime"
						  label="操作时间"
						  disabled
						/>
				  </view>
			</van-dialog>
		</view>
		</van-action-sheet>
		<view class="cu-card text-center">
			<view v-if="userInfo.rolename==='学生'">
				<view class="margin-top margin-right margin-left cu-bar solid-bottom bg-white">
				  <view class="action">
				    <text class="cuIcon-titles text-blue"></text
				    >注: 学号只显示后两位。
				  </view>
				</view>
			</view>
			<view v-else>
				<view class="margin-top margin-right margin-left cu-bar solid-bottom bg-white">
				  <view class="action">
				    <text class="cuIcon-titles text-blue"></text
				    >注:学号显示后两位,点击学生修改任务成绩。
				  </view>
				</view>
			</view>
			<!-- <view class="margin text-bold bg-white">※注: 学号只显示后两位</view> -->
			<view class="cu-item shadow padding-top-sm padding-bottom-sm">
				<view class="flex">
					<view class="flex-sub">学号</view>
					<view class="flex-sub">姓名</view>
					<view class="flex-sub" v-for="(item,index) in LabcourseStutaskinfoList" :key="index">任务{{item.taskid}}</view>
					<view class="flex-sub">成绩</view>
				</view>
				<view v-if="LabcourseStuprjscoreinfo.length == 0">
					<view class="flex margin-top-sm">
						<view class="flex-sub">无</view>
						<view class="flex-sub">无</view>
						<view class="flex-sub">无</view>
					</view>
				</view>
				<view v-else>
					<view v-if="userInfo.rolename==='学生'">
						<view class="flex margin-top-sm" v-for="(item,index) in LabcourseStuprjscoreinfo" :key="index">
							<view class="flex-sub">{{item.studentno.substr(item.studentno.length-2,2)}}</view>
							<view class="flex-sub">{{item.studentname}}</view>
							<view class="flex-sub" v-for="(item2,index2) in item.labcourseStutaskinfoList" :key="index2">
								<view v-if="item2.isfinish == null">
									(空)
								</view>
								<view v-else-if="item2.isfinish == 1">
									<van-icon name="success" color="green"/>
								</view>
								<view v-else>
									<van-icon name="cross" color="red"/>
								</view>
							</view>
							<view v-if="item.prjscore!=null" class="flex-sub">{{item.prjscore}}</view>
							<view v-else class="flex-sub">(空)</view>
						</view>
					</view>
					<view v-else>
						<view class="flex margin-top-sm" v-for="(item,index) in LabcourseStuprjscoreinfo" :key="index" @click="onPopShow(item)">
							<view class="flex-sub">{{item.studentno.substr(item.studentno.length-2,2)}}</view>
							<view class="flex-sub">{{item.studentname}}</view>
							<view class="flex-sub" v-for="(item2,index2) in item.labcourseStutaskinfoList" :key="index2">
								<view v-if="item2.isfinish == null">
									(空)
								</view>
								<view v-else-if="item2.isfinish == 1">
									<van-icon name="success" color="green"/>
								</view>
								<view v-else>
									<van-icon name="cross" color="red"/>
								</view>
							</view>
							<view v-if="item.prjscore!=null" class="flex-sub">{{item.prjscore}}</view>
							<view v-else class="flex-sub">(空)</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getLabcourseStuprjscoreinfoByParams,getLabcourseStutaskinfoByParams,saveLabcourseStuprjscoreinfo} from '@/api/module.js'
	export default {
		props: ["academicyearno", "termno", "courseno", "prjno", "expclassno","random"],
		watch:{
			random(){
				getLabcourseStuprjscoreinfoByParams(this.academicyearno,this.termno,this.courseno,this.prjno,this.expclassno).then( res=>{
					if(res.data.code == 200){
						this.LabcourseStuprjscoreinfo = res.data.data
						// console.log(res.data.data)
						if(res.data.data.length!=0){
							this.LabcourseStutaskinfoList = res.data.data[0].labcourseStutaskinfoList
						}
					}
				})
			}
		},
		data() {
			return {
				loading:true,
				LabcourseStuprjscoreinfo: '',
				LabcourseStutaskinfoList: '',
				show: false,
				markInfo:'',
				checked: true,
				userInfo:'',
			}
		},
		mounted() {
			this.userInfo = uni.getStorageSync("userInfo")
			getLabcourseStuprjscoreinfoByParams(this.academicyearno,this.termno,this.courseno,this.prjno,this.expclassno).then( res=>{
				if(res.data.code == 200){
					this.LabcourseStuprjscoreinfo = res.data.data
					// console.log(res.data.data)
					if(res.data.data.length!=0){
						this.LabcourseStutaskinfoList = res.data.data[0].labcourseStutaskinfoList
					}
				}
				this.loading = false
			})
			
		},
		methods:{
			onSubmit(){
				if(this.markInfo.prjscore<0||this.markInfo.prjscore>10||!(/(^[0-9]\d*$)/.test(this.markInfo.prjscore))){
					uni.showToast({
						icon:'none',
						title:'请输入0-10的整数'
					})
					return
				}
				uni.showLoading({
					title: '正在修改'
				})
				saveLabcourseStuprjscoreinfo(this.markInfo).then( res=>{
					uni.hideLoading()
					uni.showLoading({
						title: '正在更新'
					})
					getLabcourseStuprjscoreinfoByParams(this.academicyearno,this.termno,this.courseno,this.prjno,this.expclassno).then( res=>{
						if(res.data.code == 200){
							// console.log(res.data.data)
							this.LabcourseStuprjscoreinfo = res.data.data
							// console.log(res.data.data)
							if(res.data.data.length!=0){
								this.LabcourseStutaskinfoList = res.data.data[0].labcourseStutaskinfoList
								this.onClose()
							}
					
						}
						uni.hideLoading()
						uni.showToast({
							title:'更新成功',
							duration: 300
						})
					})
					
				})
			},
			onClose(){
				this.show = false
			},
			onPopShow(item){
				this.markInfo = JSON.parse(JSON.stringify(item));
				this.show = true
			},
			onChangeTask(value,index){
				if(value == 1){
					this.markInfo.labcourseStutaskinfoList[index].isfinish = 0
					return
				}
				this.markInfo.labcourseStutaskinfoList[index].isfinish = 1
			},
			onChange(event){
				this.markInfo.prjscore = event.detail
			}
		}
	};
</script>

<style lang="scss">
	@import "./style/exper-project.scss";
</style>
