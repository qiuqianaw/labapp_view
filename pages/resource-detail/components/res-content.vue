<template>
	<view class="bottom">
		<view class="text-grey">
			<view class="cu-bar solid-bottom bg-white">
				<view class="action">
					<text v-if="resource[0].resourcetype==1" class="cuIcon-video text-blue"></text>
					<text v-else-if="resource[0].resourcetype==2" class="cuIcon-musicfill text-blue"></text>
					<text v-else-if="resource[0].resourcetype==3||resource[0].resourcetype==4"
						class="cuIcon-file text-blue"></text>资源内容
				</view>
			</view>
		</view>
		<form>
			<view v-if="lab[0].status==1" class="cu-form-group radius" style="padding: 20rpx; margin-left: 5rpx;">
				<block v-if="resource[0].resourcetype == 4">
					<image :src="resource[0].labFilestoragerList[0].filepath" @ended="ended(resourceid)"></image>
				</block>
				<block v-else-if="resource[0].resourcetype == 3">
					<view class="cu-card">
						<button class="cu-item shadow padding"
							@click="openFile(resource[0].labFilestoragerList[0].filepath)">
							<view class="text-df">
								<text class="cuIcon-file " style="color: #5555ff;"></text>
								资源名称: {{resource[0].resourcename}}
							</view>
						</button>
					</view>
				</block>
				<block v-else-if="resource[0].resourcetype == 1">
					<video id="myVideo" class="myvideo" :data-id="resource[0].resourceid"
						:src="resource[0].labFilestoragerList[0].filepath" @timeupdate="timeupdate"
						:show-progress="false" @ended="ended(resourceid)" controls></video>
				</block>
				<block v-else-if="resource[0].resourcetype == 2">
					<audio :src="resource[0].labFilestoragerList[0].filepath" :action="audioAction" :poster="logo"
						:name="resource[0].resourcename" :author="null" @ended="ended(resourceid)"
						@timeupdate="timeupdate" controls></audio>
				</block>
			</view>

			<view v-else class="cu-form-group radius" style="padding: 20rpx; margin-left: 5rpx;">
				<block v-if="resource[0].resourcetype == 4">
					<image :src="resource[0].labFilestoragerList[0].filepath" @click="save" @ended="ended(resourceid)">
					</image>
				</block>
				<block v-else-if="resource[0].resourcetype == 3">
					<view class="cu-card">
						<button class="cu-item shadow padding"
							@click="openFile(resource[0].labFilestoragerList[0].filepath)" @ended="ended(resourceid)">
							<view class="text-df">
								<text class="cuIcon-file " style="color: #5555ff;"></text>
								资源名称: {{resource[0].resourcename}}
							</view>
						</button>
					</view>
				</block>
				<block v-else-if="resource[0].resourcetype == 1">
					<video id="myVideo" class="myvideo" :data-id="resource[0].resourceid"
						:src="resource[0].labFilestoragerList[0].filepath" @timeupdate="timeupdate"
						:show-progress="false" @click="save" @ended="ended(resourceid)" controls></video>
				</block>
				<block v-else-if="resource[0].resourcetype == 2">
					<audio :src="resource[0].labFilestoragerList[0].filepath" :action="audioAction" :poster="logo"
						:name="resource[0].resourcename" :author="null" @click="save" @ended="ended(resourceid)"
						@timeupdate="timeupdate" controls></audio>
				</block>
			</view>
		</form>
	</view>


	</view>
</template>

<script>
	import {
		queryLablearn,
		UpdateRecord,
		labLearnrecord
	} from "@/api/module.js"
	export default {
		props: {
			resource: {
				type: Array,
				default: function() {
					return {}
				},
			},
			resourceid: ''
		},
		data() {
			return {
				lab: '',
				modalName: null,
				size: 256,
				borderSize: 15,
				labLearnrecords: [],
				audioAction: {
					method: 'pause',
				},
				logo: "/static/logo.jpeg",
				videoContext: {},
			}
		},
		mounted() {
			const userInfo = uni.getStorageSync("userInfo")
			queryLablearn(userInfo.userid, this.resourceid).then(res => {
				this.lab = res.data.data
				// console.log(res)
			})
		},
		created() {
			// 创建视频实例指向视频控件
			this.videoContext = uni.createVideoContext('myVideo');
		},
		methods: {
			save() {
				this.copyprotries()
				labLearnrecord(this.labLearnrecords).then(res => {
					// console.log(res.data.data)
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			ended(resourceid) {
				UpdateRecord(resourceid).then(res => {
					if (res.data.code == 200) {
						// console.log("完成学习");
					}
				})
			},

			onLoad: function(options) {
				this.initial_time = '0' //视频进度
			},
			timeupdate: function(e) {
				let currentTime = Number(e.detail.currentTime);
				// console.log('播放进度条改变', currentTime)
			},
			openFile(url) {
				this.copyprotries()
				// console.log(this.labLearnrecords)
				labLearnrecord(this.labLearnrecords)
				uni.showLoading({
					title: "正在打开文件"
				})
				uni.downloadFile({
					url: url,
					success: (res) => {
						if (res.statusCode === 200) {
							uni.openDocument({
								filePath: res.tempFilePath,
								// 如果文件名包含中文，建议使用escape(res.tempFilePath)转码，防止ios和安卓客户端导致的差异
								success: function(res) {
									uni.hideLoading()
								}
							});
						}
					}
				})
			},
			copyprotries() {
				const userInfo = uni.getStorageSync("userInfo")
				let labLearnrecord = {
					userno: userInfo.userid,
					username: userInfo.username,
					resourceid: this.resource[0].resourceid,
					status: 2,
				}
				this.labLearnrecords.push(labLearnrecord);
			},

		},
	}
</script>
<style lang="scss">
	@import "./style/res-content.scss";
</style>
