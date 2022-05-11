<template>
	<view>
		<view v-if="loading == true" class="margin">
		  <van-loading color="#0094ff" size="48rpx"
		    >正在加载...</van-loading
		  >
		</view>
		<view v-else class="cu-card">
			<view class="cu-item shadow padding-top-sm">
				<view>
					<van-cell :label="LabcourseExpprjcard.academicyearno+'年第'+LabcourseExpprjcard.termno+'学期'" icon="coupon-o">
						<template #title>
						    <view class="custom-title">项目名称：{{ LabcourseExpprjcard.prjname }}</view>
							<span v-if="LabcourseExpprjcard.expclassify === '1'">
						    	<van-tag type="danger">实验类别:专业</van-tag>
						    </span>
						    <span v-else>
						    	<van-tag type="danger">实验类别:专业基础</van-tag>
						    </span>
							<span v-if="LabcourseExpprjcard.exptype === '1'">
								<van-tag type="primary">实验类型:基础应用性</van-tag>
							</span>
							<span v-else>
								<van-tag type="primary">实验类型:验证性</van-tag>
							</span>
							<span v-if="LabcourseExpprjcard.stuclassify === '1'">
								<van-tag type="success">学生类别:本科</van-tag>
							</span>
							<span v-else-if="LabcourseExpprjcard.stuclassify === '2'">
								<van-tag type="success">学生类别:专科</van-tag>
							</span>
							<span v-else-if="LabcourseExpprjcard.stuclassify === '3'">
								<van-tag type="success">学生类别:专升本</van-tag>
							</span>
							<span v-else-if="LabcourseExpprjcard.stuclassify === '4'">
								<van-tag type="success">学生类别:留学生</van-tag>
							</span>
							<span v-else-if="LabcourseExpprjcard.stuclassify === '5'">
								<van-tag type="success">学生类别:继续教育</van-tag>
							</span>
							<span v-else>
								<van-tag type="success">学生类别:研究生</van-tag>
							</span>
						</template>
					</van-cell>
				</view>
				<van-cell title="项目信息:" :border="false" icon="info-o"></van-cell>
				<view class="margin-left-xl">
					<van-cell :label="'课程名称: '+LabcourseExpprjcard.coursename" :border="false"></van-cell>
					<van-cell :label="'面向专业: '+LabcourseExpprjcard.majorname" :border="false"></van-cell>
					<van-cell :label="'实验者人数: '+LabcourseExpprjcard.expstunum" :border="false"></van-cell>
					<van-cell :label="'循环班数: '+LabcourseExpprjcard.circulclassnum" :border="false"></van-cell>
					<van-cell :label="'每班组数: '+LabcourseExpprjcard.teamnum" :border="false"></van-cell>
					<van-cell :label="'首开日期(教学周): '+LabcourseExpprjcard.startweek" :border="false"></van-cell>
					<view v-if="LabcourseExpprjcard.ismodify === '1'">
						<van-cell :label="'更新内容: '+LabcourseExpprjcard.modinfo" :border="false"></van-cell>
					</view>
					<van-cell :label="'实验任务描述: '+LabcourseExpprjcard.taskdesc" :border="false"></van-cell>
					<van-cell :label="'任务数量: '+LabcourseExpprjcard.tasknum" :border="false"></van-cell>
					<van-cell :label="'上课地点: '+LabcourseExpprjcard.labroom" :border="false"></van-cell>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getLabcourseExpprjcardByParams} from '@/api/module.js'
	export default{
		props: ["academicyearno", "termno", "courseno", "prjno"],
		data(){
			return{
				loading:true,
				LabcourseExpprjcard: ''
			}
		},
		mounted() {
			getLabcourseExpprjcardByParams(this.academicyearno,this.termno,this.courseno,this.prjno).then( res=> {
				if(res.data.code == 200){
					this.LabcourseExpprjcard = res.data.data
				}
				this.loading = false
			})
		}
	}
</script>

<style lang="scss">
	@import "./style/exper-prjcard.scss";
</style>
