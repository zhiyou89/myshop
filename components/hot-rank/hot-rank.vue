<template>
	<view>
		<view class="hot-rank">
			<view class="top">
				<view class="title">24小时热销榜</view>
				<view class="sub-title">分分钟卖断货</view>
			</view>

			<view class="items">
				<view class="item">
					<view class="left">
						<image src="https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/youcheng/rank-one.png" 
						class="rank"></image>
						<image src="https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/youcheng/nav-1.png" alt=""
						 class="good_img">
					</view>
					<view class="right">
						<view class="price">
							<text class="icon-renminbi iconfont"></text>
							<text>56</text>
						</view>
						<view class="sell-count">
							<text>日售</text>
							<text>500</text>
						</view>
					</view>

				</view>
				<view class="item">
					<view class="left">
						<image src="https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/youcheng/rank-one.png" 
						class="rank"></image>
						<image src="https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/youcheng/nav-1.png" alt=""
						 class="good_img">
					</view>
					<view class="right">
						<view class="price">
							<text class="icon-renminbi iconfont"></text>
							<text>56</text>
						</view>
						<view class="sell-count">
							<text>日售</text>
							<text>500</text>
						</view>
					</view>
				
				</view>
				<view class="item">
					<view class="left">
						<image src="https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/youcheng/rank-one.png" 
						class="rank"></image>
						<image src="https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/youcheng/nav-1.png" alt=""
						 class="good_img">
					</view>
					<view class="right">
						<view class="price">
							<text class="icon-renminbi iconfont"></text>
							<text>56</text>
						</view>
						<view class="sell-count">
							<text>日售</text>
							<text>500</text>
						</view>
					</view>
				
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.hot-rank{
	width:310rpx;
	height: 505rpx;
	background: #FF9E39;
	padding:$uni-spacing-col-lg $uni-spacing-col-base;
	.top{
		color:white;
		font-weight: 700;

		.title{
			font-size: $uni-font-size-lg;
			letter-spacing: 4rpx;
		}
		.sub-title{
			font-size: $uni-font-size-base;
			padding: $uni-spacing-col-base 0;
			letter-spacing: 2rpx;
		}
	}
	.items{
		background: $uni-bg-color;
		padding:$uni-spacing-col-base 0 0 $uni-spacing-col-base;
		border-radius: $uni-border-radius-base;
		.item{
			display: flex;
			.left{
				overflow: hidden;
				position: relative;
				width:150rpx;
				.rank{
					position: absolute;
					left:0;
					top:0;
					z-index: 999;
					width: 50rpx;
					height: 50rpx;
				}
				.good_img{
					z-index: 998;
					width: 120rpx;
					height: 120rpx;
				}
			}
			.right{
				width: 200rpx;
				color: $uni-text-color-grey;
				line-height: 60rpx;
				.price{
					font-size: $uni-font-size-lg;
					color:$my-badge-red-color;
					font-weight: 800;
					.icon-renminbi{
						font-size: $uni-font-size-base;
					}
				}
				.sell-count{
					font-size: $uni-font-size-lg;
					color:$uni-text-color-grey;
					text{
						margin-left:$uni-spacing-col-sm;
					}
				}
			}
		}
	}
}
</style>
