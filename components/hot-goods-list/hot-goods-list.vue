<template>
	<view class="">
		<view class="hot-goods-list"  v-for="(item, index) in indexHot" :key="index" @click="jump(item.id,item.category_id)">
			<image class="hot-imgae" :src="item.main_img_url" mode="widthFix">
			</image>
			<view class="wrap">
				<view class="good-detail">
					{{item.product_describe}}
				</view>
				
				<view class="price-and-but">
					<view class="price">
						<text class="iconfont icon-renminbi"></text>
						<text class="count">{{item.price}}</text>
					</view>
					<view class="but">
						<text>购买</text>
					</view>
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	export default{
		props:['indexHot'],
		methods:{
			jump(id,category_id){

				uni.navigateTo({
					url:'/pages/good/good?id='+id+'&category_id='+category_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.hot-goods-list{
		.hot-imgae{
			width:710rpx;
			border-radius: $uni-border-radius-base;
		}
		.wrap{
			padding:$uni-spacing-col-base $uni-spacing-col-base $uni-spacing-col-lg $uni-spacing-col-base;
			.good-detail{
				font-weight: $my-font-werght-blod;
				line-height: 50rpx;
				letter-spacing: 3rpx;
				font-size: $uni-font-size-lg;
			}
			.price-and-but{
				padding:$uni-spacing-col-base 0;
				display: flex;
				justify-content: space-between;
				.price{
					color:$my-badge-red-color;
					font-weight: $my-font-werght-blod;
					.icon-renminbi{
						padding-left: $uni-spacing-col-sm;
					}
					.count{
						font-size: $uni-font-size-lg;
					}
					
				}
				.but{
					font-size: $uni-font-size-base;
					padding-top:10rpx;
					text{
						border-radius: $uni-border-radius-base;
						border:1px solid $my-icon-color;
						padding:15rpx $uni-spacing-row-lg;
					}
				}
			}
		}

	}
</style>
