<template>
	<view class="recommend">
		<view class="items">
		
			<view class="item" v-for="(item,index) in items" :key="index" 
			@click="navigate_to('/pages/good/good?id='+item.id+'&category_id='+item.category_id)">
				<view class="">
					<view class="img">
						<image :src="item.main_img_url"></image>
					</view>
					<view class="name">
						<text>{{item.name}}</text>
					</view>
				</view>
		
				<view class="price-and-add">
					<view class="price">
						<view class="m-price">
							<text class="iconfont icon-renminbi"></text>
							<text class="count">{{item.price}}</text>
						</view>
						<view class="y-price">
							<text class="iconfont icon-renminbi"></text>
							<text class="count">{{item.market_price}}</text>
						</view>
					</view>
					<view class="add-but" @click.stop="addCart(item.id)">
						<uni-icons type="plus-filled" color="#0A800A" size="20"></uni-icons>
					</view>
				</view>
		
			</view>	
			</view>
		</view>
		
	</view>

</template>

<script>
	export default{
		props:['items'],
		methods:{
			navigate_to(url){
				uni.navigateTo({
					url
				})
			},

			addCart(id){
				this.$emit('addCart', {
					id
				})
			}
		}
	}
</script>

<style lang="scss">
	.recommend{
		.items{
			display: flex;
			flex-wrap: wrap;
			width: 100%;
			padding: 0 15rpx;
			.item{
				width:232rpx;
				margin: $uni-spacing-col-base 5rpx 0 5rpx;
				font-size: $uni-font-size-sm;
				background-color: $uni-bg-color;
				border-radius: $uni-border-radius-base;
				overflow: hidden;
				display: flex;
				justify-content: space-between;
				flex-direction:column;
				.img{
					width:232rpx;
					height: 232rpx;
					image{
						width:232rpx;
						height: 232rpx;
					}
				}
				.name{
					padding-top: $uni-spacing-col-base;
				}
				.price-and-add{
					// padding: 0 $uni-spacing-row-sm;
					display: flex;
					justify-content: space-between;
					.price{
						line-height: 40rpx;
						.m-price{
							font-size: $uni-font-size-base;
							color: $my-badge-red-color;
							font-weight: $my-font-werght-blod;
						}
						.y-price{
							color: $uni-text-color-grey;
							text-decoration:line-through;
							font-size: $uni-font-size-sm;
						}
					}
					.add-but{
						line-height: 80rpx;
						.icon-tianjia{
							font-size: 40rpx;
							color:$my-icon-color;
						}
					}
				}
			}
		}
		
	}

</style>
