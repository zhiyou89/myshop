<template>					
	<view class="items">
		<view class="item" v-for="(item, index) in productList" :key="index"
		 @click="navigate_to('/pages/good/good?id='+item.id+'&category_id='+item.category_id)">
			<image :src="item.main_img_url"></image>
			<view class="good-detail">{{item.product_describe}}</view>
			<view class="good-badge" v-if="(item.tags).length">
				<text>新客专享</text>
				<text>新客专享</text>
			</view>
			<view class="good-price-and-add-cart">
				<price-type 
				:priceFontSize="priceFontSize" 
				:iconRenminbiFontSize="iconRenminbiFontSize"
				:iconRenminbicolor="iconRenminbicolor"
				:price="goodPrice"
				></price-type>
				<view class="add-cart" @click.stop="navigate_to('/pages/menu/menu-detail')">
					<text class="icon-tianjia iconfont"></text>
				</view>
			</view>
			
		</view>

	
	</view>
</template>

<script>

	export default {
		props:['productList'],
		data() {
			return {
				showList:true
			}
		},
		components:{
			
		},
		methods: {
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
	.items{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 100%;
		.item{
			margin-bottom: $uni-spacing-col-base;
			width: 49%;
			padding-bottom: $uni-spacing-col-lg;
			background: white;
			border-radius: $uni-border-radius-base;
			overflow: hidden;
			image{
				width: 100%;
				height: 300rpx;
			}
			.good-detail{
				line-height: 40rpx;
				padding:$uni-spacing-col-sm $uni-spacing-col-base $uni-spacing-col-sm $uni-spacing-col-base;
				font-weight: $my-font-werght-blod;
			}
			.good-badge{
				padding:$uni-spacing-col-base $uni-spacing-col-sm $uni-spacing-col-base $uni-spacing-col-base;
				font-size: 18rpx;
				color: $my-badge-red-color;
				text{
					padding:$uni-spacing-col-sm $uni-spacing-col-base;
					border:1px solid $my-badge-red-color;
					border-radius: $uni-border-radius-base;
				}
			}
			.good-price-and-add-cart{
				display: flex;
				justify-content: space-between;
				height: 60rpx;
				line-height: 60rpx;
				margin:0 $uni-spacing-col-base;
				.add-cart{
					.icon-tianjia{
						font-size: 60rpx;
						color:$my-icon-color;
					}
				}
			}
		}
	}
</style>
