<template>
	<view>
		<view v-if="loading == true" class="margin">
		  <van-loading color="#0094ff" size="48rpx"
		    >正在加载...</van-loading
		  >
		</view>
		<view v-else>
			<view v-if="questionnaires.length == 0">
				<view class="cu-card">
					<view class="cu-item shadow padding-top-sm">
						<van-empty description="暂无调查问卷" />
					</view>
				</view>
			</view>
			<view v-else>
				<block v-for="(item,index) in questionnaires" :key="index">
					<block v-if="item.paperrole == 1">
						<block v-if="item.isopen == 1">
							<div class="inform_box">
								<van-cell-group>
									<van-cell icon="clock-o" value="点击填写" use-label-slot
										size="large" :border=" false " is-link
										link-type="navigateTo" @click="questionnaireContent(item.paperid)">
										<template #title>
										    <span class="custom-title">{{item.papertitle}}</span>
										    <van-tag type="primary">学生</van-tag>
										</template>
										<view slot="label">
											<view>开始时间</view>
										    <view>{{item.starttime}}</view>
											<view>截止时间</view>
										    <view>{{item.endtime}}</view>
										</view>
									</van-cell>
								</van-cell-group>
							</div>
						</block>
						<block v-else-if="item.isopen == 2">
							<div class="inform_box">
								<van-cell-group>
									<van-cell icon="clock-o" value="已填完" use-label-slot
										size="large" :border=" false " is-link
										link-type="navigateTo" @click="questionnaireContent(item.paperid)">
										<template #title>
										    <span class="custom-title">{{item.papertitle}}</span>
										    <van-tag type="primary">学生</van-tag>
										</template>
										<view slot="label">
											<view>开始时间</view>
										    <view>{{item.starttime}}</view>
											<view>截止时间</view>
										    <view>{{item.endtime}}</view>
										</view>
									</van-cell>
								</van-cell-group>
							</div>
						</block>
						<block v-else>
							<div class="inform_box">
								<van-cell-group>
									<van-cell icon="close" value="已过期" use-label-slot
										data-id="item.id" size="large"
										border=" false ">
										<template #title>
										    <span class="custom-title">{{item.papertitle}}</span>
										    <van-tag type="primary">学生</van-tag>
										</template>
										<view slot="label">
											<view>开始时间</view>
										    <view>{{item.starttime}}</view>
											<view>截止时间</view>
										    <view>{{item.endtime}}</view>
										</view>
									</van-cell>
								</van-cell-group>
							</div>
						</block>
					</block>
					<block v-else-if="item.paperrole == 2">
						<block v-if="item.isopen == 1">
							<div class="inform_box">
								<van-cell-group>
									<van-cell icon="clock-o" value="点击填写" use-label-slot
										size="large" :border=" false " is-link
										link-type="navigateTo" @click="questionnaireContent(item.paperid)">
										<template #title>
										    <span class="custom-title">{{item.papertitle}}</span>
										    <van-tag type="primary">教师</van-tag>
										</template>
										<view slot="label">
											<view>开始时间</view>
										    <view>{{item.starttime}}</view>
											<view>截止时间</view>
										    <view>{{item.endtime}}</view>
										</view>
									</van-cell>
								</van-cell-group>
							</div>
						</block>
						<block v-else-if="item.isopen == 2">
							<div class="inform_box">
								<van-cell-group>
									<van-cell icon="clock-o" value="已填完" use-label-slot
										size="large" :border=" false " is-link
										link-type="navigateTo" @click="questionnaireContent(item.paperid)">
										<template #title>
										    <span class="custom-title">{{item.papertitle}}</span>
										    <van-tag type="primary">教师</van-tag>
										</template>
										<view slot="label">
											<view>开始时间</view>
										    <view>{{item.starttime}}</view>
											<view>截止时间</view>
										    <view>{{item.endtime}}</view>
										</view>
									</van-cell>
								</van-cell-group>
							</div>
						</block>
						<block v-else>
							<div class="inform_box">
								<van-cell-group>
									<van-cell icon="close" value="已过期" use-label-slot
										:label="item.starttime+' 至 '+item.endtime" data-id="item.id" size="large"
										border=" false ">
										<template #title>
										    <span class="custom-title">{{item.papertitle}}</span>
										    <van-tag type="primary">教师</van-tag>
										</template>
										<view slot="label">
											<view>开始时间</view>
										    <view>{{item.starttime}}</view>
											<view>截止时间</view>
										    <view>{{item.endtime}}</view>
										</view>
									</van-cell>
								</van-cell-group>
							</div>
						</block>
					</block>
					<block v-else>
						<block v-if="item.isopen == 1">
							<div class="inform_box">
								<van-cell-group>
									<van-cell icon="clock-o" value="点击填写" use-label-slot
										:label="item.starttime+' 至 '+item.endtime" size="large" :border=" false " is-link
										link-type="navigateTo" @click="questionnaireContent(item.paperid)">
										<template #title>
										    <span class="custom-title">{{item.papertitle}}</span>
										    <van-tag type="primary">全体</van-tag>
										</template>
										<view slot="label">
											<view>开始时间</view>
										    <view>{{item.starttime}}</view>
											<view>截止时间</view>
										    <view>{{item.endtime}}</view>
										</view>
									</van-cell>
								</van-cell-group>
							</div>
						</block>
						<block v-else-if="item.isopen == 2">
							<div class="inform_box">
								<van-cell-group>
									<van-cell icon="clock-o" value="已填完" use-label-slot
										size="large" :border=" false " is-link
										link-type="navigateTo" @click="questionnaireContent(item.paperid)">
										<template #title>
										    <span class="custom-title">{{item.papertitle}}</span>
										    <van-tag type="primary">全体</van-tag>
										</template>
										<view slot="label">
											<view>开始时间</view>
										    <view>{{item.starttime}}</view>
											<view>截止时间</view>
										    <view>{{item.endtime}}</view>
										</view>
									</van-cell>
								</van-cell-group>
							</div>
						</block>
						<block v-else>
							<div class="inform_box">
								<van-cell-group>
									<van-cell icon="close" value="已过期" use-label-slot
										:label="item.starttime+' 至 '+item.endtime" data-id="item.id" size="large"
										border=" false ">
										<template #title>
										    <span class="custom-title">{{item.papertitle}}</span>
										    <van-tag type="primary">全体</van-tag>
										</template>
										<view slot="label">
											<view>开始时间</view>
										    <view>{{item.starttime}}</view>
											<view>截止时间</view>
										    <view>{{item.endtime}}</view>
										</view>
									</van-cell>
								</van-cell-group>
							</div>
						</block>
					</block>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['loading','questionnaires'],
		methods: {
			questionnaireContent: function(value) {
				var questionnaireId = value
				uni.navigateTo({
					url: '/pages/questionnaire-content/index?questionnaireId=' + questionnaireId,
				});
			}
		}

	}
</script>

<style lang="scss">
	@import "./style/questionnaire-visitor";
</style>
