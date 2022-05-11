<template>
	<view>
		<view v-if="cardArr.length == 0" class="cu-item shadow padding-top-sm">
			<van-empty description="暂无未读消息" />
		</view>
		<view v-else :key="menuKey" class="commNewsModule">
			<view class="update_all" @tap="updateAll" data-target="DeleteAll">一键已读
			</view>
			<view class="card" v-for="(item,index) in cardArr" :key="index">
				<view class="card_news">
					<view class="card_title">
						<uni-icons :color="'rgb(0, 129, 255)'" type="smallcircle-filled" size="10"></uni-icons>
						<text class="title">{{item.msgtitle}}</text>
						<text class="date">{{item.recordtime}}</text>
					</view>
					<view class="card_content2">{{item.msgcontent}}</view>
					<view class="card_lookmore" @tap="showModal" data-target="Modal">点击查看</view>

					<view class="cu-modal" :class="modalName=='Modal'?'show':''">
						<view class="cu-dialog">
							<view class="cu-bar bg-white justify-end">
								<view class="content">{{item.msgtitle}}</view>
								<view class="action" @tap="hideModal">
									<text class="cuIcon-close text-red"></text>
								</view>
							</view>
							<view class="padding-xl">
								{{item.msgcontent}}
							</view>
							<view class="cu-bar bg-white justify-center">
								<button class="cu-btn bg-blue " @tap="update(item)">确定</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		UpdateAll,
		Unread,
		Update
	} from "@/api/module.js"
	export default {
		data() {
			return {
				menuKey: 1,
				modalName: null,
				cardArr: '',
			}
		},
		mounted() {
			Unread().then(res => {
				if (res.data.code == 200) {
					this.cardArr = res.data.data
				}
			})
		},
		methods: {
			updateAll() {
				UpdateAll().then(res => {
					if (res.data.code == 200) {
						Unread().then(res => {
							if (res.data.code == 200) {
								this.cardArr = res.data.data
							}
						})
					}
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			update(item) {
				Update(item.messageid).then(res => {
					if (res.data.code == 200) {
						// console.log("已读")
						Unread().then(res => {
							if (res.data.code == 200) {
								this.cardArr = res.data.data
							}
						})
					}
				})
				this.modalName = null;
			},

		},
	}
</script>

<style lang="scss">
	@import "./style/message-unread.scss"
</style>
