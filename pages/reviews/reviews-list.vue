<template>
	<view class="">
		<view class="item">
				<view class="top">
					<view>2020-10-11</view>
					<view class="top-but">
						<text>删除</text>
					</view>
				</view>
			
				<view class="detail">
					<view class="img">
						<image src="https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/youcheng/4.png">
						</image>
					</view>
					<view class="describe">
						<text>佳世客劳动法克雷登斯剪发卡洛斯</text>
						<text>佳世客劳动法克雷登斯剪发卡洛斯</text>
					</view>
					<view class="price">
						<text class="iconfont icon-renminbi"></text>
						<text>56.00</text>
					</view>
				</view>
				<view class="bottom-but" @click="navigate_to('/pages/reviews/reviews')">
					<view>评价</view>
				</view>
				<view class="price-and-count">
					<view class=""></view>
					<view>实付：56.00</view>
				</view>
			</view>
			<view class="item">
					<view class="top">
						<view>2020-10-11</view>
						<view class="top-but">
							<text>删除</text>
						</view>
					</view>
				
					<view class="detail">
						<view class="img">
							<image src="https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/youcheng/4.png">
							</image>
						</view>
						<view class="describe">
							<text>佳世客劳动法克雷登斯剪发卡洛斯</text>
							<text>佳世客劳动法克雷登斯剪发卡洛斯</text>
						</view>
						<view class="price">
							<text class="iconfont icon-renminbi"></text>
							<text>56.00</text>
						</view>
					</view>
					<view class="bottom-but" @click="navigate_to('/pages/reviews/reviews')">
						<view>评价</view>
					</view>
					<view class="price-and-count">
						<view class=""></view>
						<view>实付：56.00</view>
					</view>
				</view>
	</view>
	
		
	</template>


<script>
	
	export default{
		components:{
			
		},
		methods:{
			navigate_to(url){
				console.log(1)
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss">
	.item{
		background-color: $uni-bg-color;
		border-radius: $uni-border-radius-lg;
		margin: $uni-spacing-col-lg 0;
		.top, .price-and-count{
			display: flex;
			justify-content: space-between;
			padding: $uni-spacing-col-lg $uni-spacing-row-base;
			.top-but{
				.middle-border{
					padding:0 $uni-spacing-row-sm;
				}
			}
		}
	
		.detail{
			display: flex;
			justify-content: space-between;
			padding: 0 $uni-spacing-row-base;
			align-items: center;
			.img{
				width: 120rpx;
				height: 120rpx;
				image{
					width: 120rpx;
					height: 120rpx;
				}
			}
			.describe{
				padding: 0 $uni-spacing-row-lg;
			}
		}
		.bottom-but{
			display: flex;
			position: relative;
			height: 120rpx;
			view{
				position: absolute;
				right: $uni-spacing-row-base;
				top:$uni-spacing-col-lg;
				padding: 0 $uni-spacing-row-lg;
				height: 60rpx;
				line-height: 60rpx;
				border-radius: 2em;
				border:1px solid $my-icon-color;
			}
		}
		.price-and-count{
			border-top: 1px solid $uni-bg-color-grey;
		}
	}
</style>

