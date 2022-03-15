<template>
	<view class="bottom">
		<view class="bottom-box">
			<view class="left">
				<image src="https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/youcheng/3.png"></image>
			</view>
			<view class="right">
				<view>
					做本地最好的电商平台
				</view>
				<view>
					公众号 友诚信息科技
				</view>
			</view>
			
		</view>
		<view class="best-us">
			<view>
				<text class="iconfont icon-huangguan"></text>
				<text>一手食材</text>
			</view>
			<view>
				<text class="iconfont icon-huangguan"></text>
				<text>一手食材</text>
			</view>
			<view>
				<text class="iconfont icon-huangguan"></text>
				<text>一手食材</text>
			</view>
			
		</view>
	</view>

</template>

<script>
</script>

<style lang="scss">
	.bottom{
		font-size: $uni-font-size-lg;
		color:$uni-text-color-grey;
		margin:$uni-spacing-col-lg 0;
		.bottom-box{
			text-align: center;	
			display: flex;
			align-items: center;
			justify-content: center;
			.left{
				image{
					width: 100rpx;
					height:100rpx
				}
			}
			.right{
				view{
					line-height: 50rpx;
				}
			}
		
		}
		.best-us{
					display: flex;
					justify-content: center;
					font-size: $uni-font-size-base;
					view{
						margin-right: $uni-spacing-row-lg;
					}
				}
	}

</style>
