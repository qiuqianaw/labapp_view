<template>
	<view id="laboratory">
		<view v-if="list.length == 0">
			<van-loading color="#0094ff" size="48rpx">加载中...</van-loading>
		</view>
		<view v-else>
			<!-- <cuSearch></cuSearch> -->
			<view class="VerticalBox">
				<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop"
					style="height: 100vh">
					<view class="cu-item" :class="index == tabCur ? 'text-blue cur' : ''" v-for="(item, index) in list"
						:key="index" @tap="TabSelect" :data-id="item.seq">
						{{ item.labtype }}
					</view>
				</scroll-view>
				<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height: 100vh"
					:scroll-into-view="'main-' + mainCur" @scroll="VerticalMain">
					<view class="padding-top padding-lr" v-for="(item, index) in list" :key="index"
						:id="'main-' + (item.seq)">
						<view class="cu-bar solid-bottom bg-white">
							<view class="action">
								<text class="cuIcon-title text-blue"></text>
								{{ item.labtype }}
							</view>
						</view>
						<view class="cu-list menu">
							<view class="cu-item" v-for="(item2, index2) in item.resourceListList" :key="index2"
								@tap="selectLab(item2)" @show="lab">
								<view v-if="item2.isopen==1">
									<view class="content" v-if="item2.resourcetype==1">
										<view class="text-grey">
											<view class="cuIcon-video text-grey" style="color: #1f8dd6ad;"></view>
											{{ item2.resourcename }}
										</view>
									</view>
									<view class="content" v-else-if="item2.resourcetype==2">
										<view class="text-grey">
											<view class="cuIcon-musicfill text-grey" style="color: #1f8dd6ad;"></view>
											{{ item2.resourcename }}
										</view>
									</view>
									<view class="content" v-else>
										<view class="text-grey">
											<view class="cuIcon-file text-grey" style="color: #1f8dd6ad;"></view>
											{{ item2.resourcename }}
										</view>
									</view>
								</view>
								<view v-else-if="item2.isopen==0">
									<view class="content">
										<view class="text-grey">
											<view class="cuIcon-roundclosefill text-gray" />{{ item2.resourcename }}
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getResourceList,
	} from '@/api/module.js'
	export default {
		data() {
			return {
				list: [],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				resourceListList: [],
			}
		},
		// watch: {
		// 	tabCur(val) {
		// 		console.log('tabCur', {
		// 			val
		// 		})
		// 	},
		// 	mainCur(val) {
		// 		console.log('mainCur', {
		// 			val
		// 		})
		// 	},
		// 	verticalNavTop(val) {
		// 		console.log('verticalNavTop', {
		// 			val
		// 		})
		// 	},
		// },
		onLoad() {
			uni.showLoading({
				title: '加载中...',
				mask: true,
			})
			let list = []
			getResourceList().then((res) => {
				this.list = res.data.data
			})
			this.list = list
			this.listCur = list[0]
			
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			selectLab(item2) {
				// console.log('点击了该资源', item2)
				var params = JSON.stringify(item2)
				uni.navigateTo({
					url: '/pages/resource-detail/index?resourceid=' + item2.resourceid,
				})
			},

			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id
				this.mainCur = e.currentTarget.dataset.id
				// console.log(this.tabCur, this.mainCur)
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
		VerticalMain(e) {
		  let that = this
		  let tabHeight = 0
		  if (this.load) {
		    for (let i = 0; i < this.list.length; i++) {
		      let view = uni
		        .createSelectorQuery()
		        .select('#main-' + this.list[i].seq)
		      view
		        .fields(
		          {
		            size: true,
		          },
		          (data) => {
		              this.list[i].top = tabHeight;
		              tabHeight = tabHeight + data.height;
		              // console.log('data.height', data.height)
		              this.list[i].bottom = tabHeight;
		          }
		        )
		        .exec()
		    }
		    this.load = false
		  }
		  let scrollTop = e.detail.scrollTop + 10
		  for (let i = 0; i < this.list.length; i++) {
		    if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
		      this.verticalNavTop = (this.list[i].seq - 1) * 50
		      this.tabCur = this.list[i].seq
		      // console.log(scrollTop)
		      return false
		    }
		  }
		},
		
		},
	}
</script>

<style>
	@import './style/index.scss';
</style>
