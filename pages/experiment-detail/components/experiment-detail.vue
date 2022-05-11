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
					<van-cell :label="LabcourseExpassign.academicyearno+'年第'+LabcourseExpassign.termno+'学期'" icon="label-o">
						<template #title>
						    <span class="custom-title">课程名称：{{ LabcourseExpassign.coursename }}</span>
						    <span v-if="LabcourseExpassign.categoryno === '1'">
						    	<van-tag type="danger">{{ LabcourseExpassign.categoryname }}</van-tag>
						    </span>
						    <span v-else>
						    	<van-tag type="primary">{{ LabcourseExpassign.categoryname }}</van-tag>
						    </span>
						</template>
					</van-cell>
				</view>
				<van-cell title="实验课程信息:" :border="false" icon="info-o"></van-cell>
				<view class="margin-left-xl">
					<van-cell :label="'开课单位: '+LabcourseExpassign.departname" :border="false"></van-cell>
					<van-cell :label="'开课系部: '+LabcourseExpassign.majorname" :border="false"></van-cell>
					<van-cell :label="'课程总学时: '+LabcourseExpassign.totalclasshours" :border="false"></van-cell>
					<van-cell :label="'实验学时: '+LabcourseExpassign.experimenthours" :border="false"></van-cell>
					<van-cell :label="'教学起止周: '+LabcourseExpassign.teachweeks" :border="false"></van-cell>
					<van-cell :label="'实验周次: '+LabcourseExpassign.experimentweeks" :border="false"></van-cell>
					<van-cell :label="'使用软硬件设备: '+LabcourseExpassign.equipments" :border="false"></van-cell>
					<van-cell :label="'所属实验室: '+LabcourseExpassign.labname" :border="false"></van-cell>
					<van-cell :label="'任课教师: '+LabcourseExpassign.teachername" :border="false"></van-cell>
					<van-cell :label="'实验指导老师1: '+LabcourseExpassign.instructor1name" :border="false"></van-cell>
					<van-cell :label="'实验指导老师2: '+LabcourseExpassign.instructor2name" :border="false"></van-cell>
					<van-cell :label="'合班信息: '+LabcourseExpassign.unionclassinfo" :border="false"></van-cell>
					<view v-if="LabcourseExpassign.stuclassify == 1">
						<van-cell label="学生类别: 本科生" :border="false"></van-cell>
					</view>
					<view v-else-if="LabcourseExpassign.stuclassify == 2">
						<van-cell label="学生类别: 专科生" :border="false"></van-cell>					
					</view>
					<view v-else-if="LabcourseExpassign.stuclassify == 3">
						<van-cell label="学生类别: 专升本" :border="false"></van-cell>				
					</view>
					<view v-else-if="LabcourseExpassign.stuclassify == 4">
						<van-cell label="学生类别: 留学生" :border="false"></van-cell>				
					</view>
					<view v-else-if="LabcourseExpassign.stuclassify == 5">
						<van-cell label="学生类别: 继续教育" :border="false"></van-cell>				
					</view>
					<view v-else>
						<van-cell label="学生类别:研究生" :border="false"></van-cell>				
					</view>
					<van-cell :label="'实验班级: '+LabcourseExpassign.expclassname" :border="false"></van-cell>
					<van-cell :label="'上课人数: '+LabcourseExpassign.stunum" :border="false"></van-cell>
					<van-cell :label="'班级所属专业: '+LabcourseExpassign.classmajorname" :border="false"></van-cell>
					<van-cell :label="'上课地点: '+LabcourseExpassign.labroom" :border="false"></van-cell>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getLabcourseExpassignByParams} from '@/api/module.js'
	export default{
		props: ["academicyearno", "termno", "courseno", "expclassno"],
		data(){
			return{
				loading:true,
				LabcourseExpassign:''
			}
		},
		mounted() {
			getLabcourseExpassignByParams(this.academicyearno,this.termno,this.courseno,this.expclassno).then( res=> {
				 if(res.data.code == 200){
					this.LabcourseExpassign = res.data.data
				}
				this.loading = false
			})
		}
	}
</script>

<style lang="scss">
	@import './style/experiment-detail.scss';
</style>
