<template>
		<view class="number-box">
			<view class="iconfont" @click="sub(value)">-</view>
			<view class="number">{{value}}</view>
			<view class="iconfont" @click="add(value)">+</view>
		</view>
</template>

<script>
	export default {
		props:['number'],
		data() {
			return {
				
			};
		},
		methods:{
			sub(){
				
			},
			add(){
				
			}
		}
	}
</script>

<style lang="scss">
	.number-box{
		display: flex;
		border: 1px solid $uni-border-color;
		text-align: center;
		height: 50rpx;
		line-height: 50rpx;
		.iconfont{
			width: 40rpx;
			background-color: $uni-bg-color-grey;
		}
		.number{
			width: 40rpx;
			font-size: $uni-font-size-sm;
		}
	}
</style>
