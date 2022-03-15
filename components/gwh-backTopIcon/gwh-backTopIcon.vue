<template>
		<view class="to-top" :style="{'display':(topState===true? 'block':'none')}" @click="top">
			<image src="https://youguan-1257044613.cos.ap-guangzhou.myqcloud.com/zhiding.png" mode="widthFix"></image>
		</view>
</template>

<script>
	export default {
		props:['topState'],
		methods:{
			top(){
				this.$emit('top')
			}
		}
	}
</script>

<style lang="scss">
	.to-top{
			position: fixed;
			right: 90rpx;
			bottom: 100rpx;
			z-index: 9999;
				opacity:0.9;
			image{
				width: 70rpx;
				height: 70rpx;
			}

		}
</style>

