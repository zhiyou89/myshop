<template>
	<view class="collection-list">
		<view class="items" v-if="shouCangStorage.length">
			<view class="item" v-for="(item,index) in shouCangStorage" :key="index" @click="jumpMenu(item.id)">
				<view class="left">
					<image :src="item.menu_img_or_vedio_url" mode="widthFix"></image>
				</view>
				<view class="right">
					<view class="name">
						<text>{{item.menu_name}}</text>
					</view>
					<view class="detail">
						<text v-for="(menuItem,menuIndex) in item.menu_items" :key="menuIndex">{{menuItem}}</text>
					</view>
					<view class="menu-food">
						<text v-for="(product,productIndex) in item.menu_find_product">{{product.product_one.name}}</text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="!shouCangStorage.length" class="no-message">
			<image src="https://youguan-1257044613.cos.ap-guangzhou.myqcloud.com/empty-shoucang.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import data from 'utils/data.js'
	export default{
		data(){
			return{
				shouCangStorage:[]
			}
		},
		methods:{
			jumpMenu(id){
				uni.navigateTo({
					url: '/pages/menu/menu-detail?id='+id+'&category_id='+5
				})
			}
		},
		onShow(){
			  this.shouCangStorage = uni.getStorageSync(data.storageKeyForSouCang)
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $uni-bg-color;
		.collection-list{
			margin: 0 $uni-spacing-row-base;
			.no-message{
				text-align: center;
				image{
					width: 35%;
					padding: 300rpx 0 0 0;
				}
			}
			.items{
				//box-shadow: 0px 0px 8px 0px rgba(34,23,20,0.23);
				.item{
					padding: $uni-spacing-col-lg $uni-spacing-row-base;
					border-radius: $uni-border-radius-lg;
					display: flex;
					justify-content: space-between;
					box-shadow: 0px 0px 8px 0px rgba(34,23,20,0.23);
					margin:$uni-spacing-col-base 0 0 0;
					align-items: center;
					.left{
						width: 40%;
						image{
							width: 100%;
							height: 260rpx;
							border-radius: $uni-border-radius-lg;
						}
					}
					.right{
						width: 60%;
						line-height: 40rpx;
						margin:0 0 0 $uni-spacing-row-base;
						.name{
							font-size: $uni-font-size-lg;
							font-weight: $my-font-werght-blod;
							line-height: 40rpx;
						}
						.detail{
							padding-bottom: $uni-spacing-col-lg;
							border-bottom: 1px solid $uni-border-color;
							text{
								font-size: $uni-font-size-sm;
								padding-right: $uni-font-size-base;
							}
						}
						.menu-food{
							padding-top: $uni-spacing-col-lg;
							color:$uni-text-color-grey;
							text{
								padding-right: $uni-font-size-base;
								font-size: $uni-font-size-sm;
							}
						}
					}
				}
			}
		}
	}

</style>
