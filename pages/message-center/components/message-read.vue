<template>
	<view>
		<view v-if="loading == true" class="margin">
			<van-loading color="#0094ff" size="48rpx">正在加载...</van-loading>
		</view>
		<view v-else>
			<view v-if="cardArr.length == 0">
				<van-empty description="暂无已读消息" />
			</view>
			<view v-else class="commNewsModule">
				<view class="delete_all" @tap="showModal" data-target="DeleteAll">一键删除
				</view>

				<view class="cu-modal" :class="modalName=='DeleteAll'?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">提示</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl">
							确定全部删除?
						</view>
						<view class="cu-bar bg-white justify-center">
							<button class="cu-btn bg-red margin-right " @tap="hideModal">取消</button>
							<button class="cu-btn bg-blue " @tap="deleteAll">确定</button>
						</view>
					</view>
				</view>

				<view class="card" v-for="(item,index) in cardArr" :key="index">
					<view class="card_news">
						<view class="card_title">
							<uni-icons type="smallcircle-filled" size="10"></uni-icons>
							<text class="title">{{item.msgtitle}}</text>
							<text class="date">{{item.recordtime}}</text>
						</view>
						<view class="card_content2">{{item.msgcontent}}</view>
						<view class="yihang">
							<view class="card_lookmore" @tap="showModal" data-target="Modal">点击查看
							</view>
							<view class="card_delete" @tap="showModal" data-target="ModalDelete">删除
							</view>
						</view>
						<view class="cu-modal" :class="modalName=='ModalDelete'?'show':''">
							<view class="cu-dialog">
								<view class="cu-bar bg-white justify-end">
									<view class="content">提示</view>
									<view class="action" @tap="hideModal">
										<text class="cuIcon-close text-red"></text>
									</view>
								</view>
								<view class="padding-xl">
									确定删除此条信息?
								</view>
								<view class="cu-bar bg-white justify-center">
									<button class="cu-btn bg-red margin-right " @tap="hideModal">取消</button>
									<button class="cu-btn bg-blue " @tap="deletemsg(item)">确定</button>
								</view>
							</view>
						</view>

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
									<button class="cu-btn bg-blue " @tap="hideModal">确定</button>
								</view>
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
		DeleteAll,
		// Read,
		Delete
	} from "@/api/module.js"
	export default {
		props: ['loading', 'cardArr'],
		data() {
			return {
				modalName: null,
			}
		},
		methods: {
			deletemsg(item) {
				Delete(item.messageid).then(res => {
					if (res.data.code == 200) {
						// console.log("删除成功")
					}
				})
				this.modalName = null;
			},
			deleteAll() {
				DeleteAll().then(res => {
					if (res.data.code == 200) {
						// console.log("删除成功")
					}
				})
				this.modalName = null;
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
		}
	}
</script>

<style lang="scss">
	@import "./style/message-read.scss";
</style>
