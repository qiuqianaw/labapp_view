<template>
	<view>
		<view v-if="loading == true" class="margin">
			<van-loading color="#0094ff" size="48rpx">正在加载...</van-loading>
		</view>
		<view v-else class="q-box">
			<view v-if="LabsaExaminfo == null">
				<van-empty description="暂无考试" />
			</view>
			<view v-else>
				<view class="q-title">
					<van-cell-group>
						<van-cell v-if="LabsaExaminfo.examdesc == null" :label="'描述: 无'" icon="info-o" size="large"
							:border="false">
							<template #title>
								<view class="custom-title">标题: {{ LabsaExaminfo.examtitle }}</view>
								<van-tag type="primary">通过分数: {{ LabsaExaminfo.passscore }}分</van-tag>
							</template>
						</van-cell>
						<van-cell v-else :label="'描述: ' + LabsaExaminfo.examdesc" icon="info-o" size="large"
							:border="false">
							<template #title>
								<view class="custom-title">标题: {{ LabsaExaminfo.examtitle }}</view>
								<van-tag type="primary">通过分数: {{ LabsaExaminfo.passscore }}分</van-tag>
							</template>
						</van-cell>
					</van-cell-group>
				</view>
				<view class="q-content">
					<van-cell-group>
						<block v-for="(item, index) in LabsaExaminfo.labsaSubjectVO" :key="index">
							<block v-if="item.topicname == 'radio'">
								<van-cell :title="index + 1 + '.' + item.subtitle" size="large" />
								<van-radio-group :value="item.answer" @change="onChange" :data-location="index"
									:data-subjectid="item.subjectid" v-for="(item2, index2) in item.labsaSubjectitems"
									:key="index2">
									<van-radio :name="item2.itemid">
										<van-cell :title="item2.itemid + '、' + item2.itemvalue" :border="false" />
									</van-radio>
								</van-radio-group>

								<van-cell :border="false" />
							</block>
							<block v-else-if="item.topicname == 'checkbox'">
								<van-cell :title="index + 1 + '.' + item.subtitle + '(多选)'" size="large" />
								<van-checkbox-group :value="item.answer" @change="onChange" :data-location="index"
									:data-subjectid="item.subjectid" v-for="(item3, index3) in item.labsaSubjectitems"
									:key="index3">
									<van-checkbox :name="item3.itemid">
										<van-cell :title="item3.itemid + '、' + item3.itemvalue" :border="false" />
									</van-checkbox>
								</van-checkbox-group>
								<van-cell :border="false" />
							</block>
							<block v-else-if="item.topicname == 'textarea'">
								<van-cell :title="index + 1 + '.' + item.subtitle" size="large" />
								<van-field :value="item.answer" type="textarea" autosize placeholder="请输入文字"
									:border="true" :data-location="index" :data-subjectid="item.subjectid"
									@change="fieldOnChange" />
								<van-cell :border="false" />
							</block>
						</block>
					</van-cell-group>
					<button class="cu-btn block bg-blue margin lg" @click="submitdata">
						提交
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getLabsaExaminfoBySaid,
		toBatchAndtoIssueCertificate,
	} from '@/api/module.js'
	import Toast from '@/wxcomponents/vant/toast/toast.js'
	export default {
		props: ['said','loading','LabsaExaminfo'],
		data() {
			return {
				show: false,
				labsaanswers: [],
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
				this.show = true
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
				for (var index in this.LabsaExaminfo.labsaSubjectVO) {
					if (this.LabsaExaminfo.labsaSubjectVO[index].answer == null) {
						Toast('答案不能为空')
						return
					}
					if(this.LabsaExaminfo.labsaSubjectVO[index].answer.length>500){
						Toast('填空题答案不能过长')
						return
					}
				}
				uni.showLoading({
					title: '正在提交',
				})
				toBatchAndtoIssueCertificate(this.labsaanswers).then((res) => {
					uni.hideLoading()
					if (res.data.code == 200) {
						if (res.data.data == true) {
							Toast.success('恭喜您通过考试！')
						} else {
							Toast.fail('很遗憾没有通过考试！')
						}
						let second = 1
						const timer = setInterval(() => {
							second--
							clearInterval(timer)
							uni.navigateBack({
								//uni.navigateTo跳转的返回，默认1为返回上一级
								delta: 2,
							})
						}, 1000)
					}
				})
			},
			onConfirm(event) {
				var subjectid = event.target.dataset.subjectid
				var index = event.target.dataset.location
				var value = event.detail.value
				
				this.copyProperties(index, subjectid, value)
				this.onClose()
			},
			onCancel() {
				this.onClose()
			},
			copyProperties(index, subjectid, answer) {
				this.LabsaExaminfo.labsaSubjectVO[index].answer = answer
				for (var i = 0; i < this.labsaanswers.length; i++) {
					if (this.labsaanswers[i].subjectid == subjectid) {
						this.labsaanswers[i].answer = answer.toString()
						return
					}
				}
				const userInfo = uni.getStorageSync('userInfo')
				let labsaanswer = {
					userno: userInfo.userid,
					username: userInfo.username,
					userrole: null,
					examid: this.LabsaExaminfo.examid,
					subjectid: subjectid,
					answer: answer.toString(),
					isright: null,
				}
				this.labsaanswers.push(labsaanswer)
			},
		},
	}
</script>

<style lang="scss">
	@import './style/safe-exam.scss';
</style>
