<template>
	<view class="items">

		<view class="item" v-for="(item,index) in items" :key="index" @click="jumpTo(item.id,item.category_id)">
			<block >

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
				<view class="add-but" @click="addCart(item.id)">
					<text class="iconfont icon-tianjia"></text>
				</view>
			</view>
			
			</block>
		</view>	
		</view>
	</view>
</template>

<script>
	export default{
		props:['items'],
		data(){
			return{

			}
		},
		methods:{
			addCart(id){
				this.$emit('addCart', {
					id
				})
			},
			jumpTo(id,category_id){
				uni.navigateTo({
					url:'/pages/good/good?id='+id+'&category_id='+category_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.items{
		display: flex;

		flex-wrap: wrap;
		width: 100%;
		.item{
			width: 32.5%;
			margin-top: $uni-spacing-col-lg;
			font-size: $uni-font-size-sm;
			background-color: $uni-bg-color;
			border-radius: $uni-border-radius-base;
			overflow: hidden;
			display: flex;
			flex-direction:column;
			justify-content: space-between;
			.img{
				width: 100%;
				image{
					width: 100%;
				}
			}
			.name{
				padding: 0 $uni-spacing-row-sm;
			}
			.price-and-add{
				padding: 0 $uni-spacing-row-sm;
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
</style>
