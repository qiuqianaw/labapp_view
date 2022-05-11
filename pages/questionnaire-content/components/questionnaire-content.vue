<template>
	<view>
		<view v-if="loading == true" class="margin">
		  <van-loading color="#0094ff" size="48rpx"
		    >正在加载...</van-loading
		  >
		</view>
		<view v-else class="q-box">
			<view class="q-title">
				<van-cell-group>
					<van-cell :title="questionnaires.paperdesc" icon="info-o" size="large" :border="false" />
				</van-cell-group>
			</view>
			<view class="q-content">
				<van-cell-group>
					<block v-for="(item,index) in questionnaires.labpaperQuestionVOS" :key="index">
						<block v-if="item.labpaperSubject.topicname == 'radio'">
							<van-cell :title="(index+1)+ '.' +item.labpaperSubject.subtitle" size="large" />
							<van-radio-group :value="item.answer" @change="onChange" :data-location="index"
								:data-subjectid="item.labpaperSubject.subjectid"
								v-for="(item2,index2) in item.labpaperSubjectItems" :key="index2">
								<van-radio :name="item2.itemid">
									<van-cell :title="item2.itemid+'、'+item2.itemvalue" :border="false" />
								</van-radio>
							</van-radio-group>
		
							<van-cell :border="false" />
						</block>
						<block v-else-if="item.labpaperSubject.topicname == 'picker'">
							<van-cell :title="(index+1)+ '.' +item.labpaperSubject.subtitle" :value="item.answer"
								size="large" is-link @click="showPopup" />
							<van-popup :show="show" @close="onClose" position="bottom" round>
								<van-picker show-toolbar title="请选择课程" :columns="item.labpaperSubjectSelections"
									:data-subjectid="item.labpaperSubject.subjectid" :data-location="index"
									@cancel="onCancel" @confirm="onConfirm" />
							</van-popup>
						</block>
						<block v-else-if="item.labpaperSubject.topicname == 'checkbox'">
							<van-cell :title="(index+1)+'.'+item.labpaperSubject.subtitle + '(多选)'" size="large" />
							<van-checkbox-group :value="item.answer" @change="onChange" :data-location="index"
								:data-subjectid="item.labpaperSubject.subjectid"
								v-for="(item3,index3) in item.labpaperSubjectItems" :key="index3">
								<van-checkbox :name="item3.itemid">
									<van-cell :title="item3.itemid+'、'+item3.itemvalue" :border="false" />
								</van-checkbox>
							</van-checkbox-group>
							<van-cell :border="false" />
						</block>
						<block v-else-if="item.labpaperSubject.topicname == 'textarea'">
							<van-cell :title="(index+1)+'.'+item.labpaperSubject.subtitle" size="large" />
							<van-field :value="item.answer" type="textarea" autosize placeholder="请输入文字" :border="true"
								:data-location="index" :data-subjectid="item.labpaperSubject.subjectid"
								@change="fieldOnChange" />
							<van-cell :border="false" />
						</block>
					</block>
				</van-cell-group>
				<button class="cu-btn block bg-blue margin lg" @click="submitdata">提交</button>
			</view>	
		</view>
	</view>
</template>

<script>
	import { queryLabpaperById, labpaperanswerToSubmit } from "@/api/module.js"
	import Toast from '@/wxcomponents/vant/toast/toast.js';
	export default {
		props: ["questionnaireId", "loading", "questionnaires"],
		data() {
			return {
				show: false,
				labpaperanswers: []
			}
		},
		methods: {
			onChange(event) {
				var index = event.target.dataset.location
				var subjectid = event.target.dataset.subjectid
				// console.log(index, subjectid, event.detail)	
				this.copyProperties(index, subjectid, event.detail)
			},
			showPopup(e) {
				this.show = true;
			},
			onClose() {
				this.show = false
			},
			fieldOnChange(event) {
				let index = event.target.dataset.location
				let subjectid = event.target.dataset.subjectid
				this.copyProperties(index, subjectid, event.detail)
			},
			submitdata() {
				// console.log(this.labpaperanswers)
				for (var index in this.questionnaires.labpaperQuestionVOS) {
					if (this.questionnaires.labpaperQuestionVOS[index].answer == null) {
						Toast("有题目未填写")
						return
					}
					if(this.questionnaires.labpaperQuestionVOS[index].answer.length>500){
						Toast('填空题答案不能过长')
						return
					}
				}
				uni.showLoading({
					title:"正在提交"
				})
				labpaperanswerToSubmit(this.labpaperanswers).then(res => {
					uni.hideLoading()
					if(res.data.code == 200){
						Toast.success('提交成功')
						let second = 1;
						const timer = setInterval(() => {
							second--;
							clearInterval(timer);
							uni.navigateBack({
								delta:1
							})
						}, 1000);
					}
				})
			},
			onConfirm(event) {
				var subjectid = event.target.dataset.subjectid
				var index = event.target.dataset.location
				var value = event.detail.value
				this.copyProperties(index, subjectid, value)
				this.onClose();
			},
			onCancel() {
				this.onClose();
			},
			copyProperties(index,subjectid,answer){
				this.questionnaires.labpaperQuestionVOS[index].answer = answer
				for(var i=0;i<this.labpaperanswers.length;i++){
					if(this.labpaperanswers[i].subjectid == subjectid){
						this.labpaperanswers[i].answer = answer.toString()
						return
					}
				}
				const userInfo = uni.getStorageSync("userInfo")
				let labpaperanswer = {
					userno: userInfo.userid,
					username: userInfo.username,
					paperid: this.questionnaires.paperid,
					subjectid: subjectid,
					answer: answer.toString(),				
				}
				this.labpaperanswers.push(labpaperanswer)
			}
			
		},		
	}
</script>

<style lang="scss">
	@import "./style/questionnaire-content.scss";
</style>
