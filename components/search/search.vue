<template>
	<view class="search" @click="search">
		<view class="input_wrap">
			 <text class="icon-sousuo iconfont"></text>
			<text>{{searchText}}</text>
		</view>
	</view>
</template>

<script>
	export default{
		props:['searchText'],
		methods:{
			search(){
				uni.navigateTo({
					url:"/pages/search/search"
				})
			}
		}
	}
</script>

<style lang="scss">
	.search{
		height: 33px;
		text-align: center;
		width: 100%;
		.input_wrap{
			display: flex;
			justify-content: center;
			height: 33px;
			width:100%;
			margin:0 0 $uni-spacing-col-base 0;
			line-height: 33px;
			border-radius: 2em;
			background: white;
		}
		text{
			color: $my-font-gray-color;
			font-size: $uni-font-size-sm;
		}
		.icon-sousuo{
			font-size: 28rpx;
			padding:3rpx $uni-spacing-row-sm  0 0;
		}
	}
</style>
