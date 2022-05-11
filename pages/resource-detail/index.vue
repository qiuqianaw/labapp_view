<template>
	<view id="index-outer">
		<view v-if="resource[0].isopen==1">
			<res-introduce :resource="resource" :resourceid="resourceid"></res-introduce>
			<res-content :resource="resource" :resourceid="resourceid"></res-content>
		</view>
		<view class="cu-item shadow padding-top-sm" v-else-if="resource[0].isopen==0">
			<van-empty description="该资源暂时无法获取" />
		</view>
	</view>
</template>

<script>
	import {
		queryResourceById,
	} from "@/api/module.js"
	import resIntroduce from "./components/res-introduce.vue";
	import resContent from "./components/res-content.vue";
	export default {
		components: {
			"res-introduce": resIntroduce,
			"res-content": resContent,
		},
		data() {
			return {
				resourceid: "",
				resource:''
			}
		},
		mounted() {
			queryResourceById(this.resourceid).then(res => {
				this.resource = res.data.data
			})
		},
		onLoad(options) {
			this.resourceid = options.resourceid
		},
	}
</script>

<style lang="scss">
	@import "./style/index.scss";
</style>
