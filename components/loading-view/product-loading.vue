<template>
	<view class="product-loading">
		<view class="box">
			<image src="https://youguan-1257044613.cos.ap-guangzhou.myqcloud.com/hamster.gif" mode=""></image>
			<view>
				加载中...
			</view>
		</view>

	</view>
</template>

<script>
</script>

<style lang="scss">
	.product-loading{
		margin:$uni-spacing-row-lg 0;
		.box{
			width: 200rpx;
			margin: 0 auto;
			display: flex;
			text-align: center;
			font-size: $uni-font-size-sm;
			image{
				padding-right: 20rpx;
				height: 40rpx;
				width: 40rpx;
			}
		}

	}
</style>
