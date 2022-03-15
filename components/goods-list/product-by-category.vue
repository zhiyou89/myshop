<template>
	<view class="product-by-categary">
		<view class="items">

			<view class="item" v-for="(item,index) in productList" :key="index" 
			@click="navigate_to('/pages/good/good?id='+item.id+'&category_id='+item.category_id)">
				<view class="top">
					<image :src="item.main_img_url" mode="widthFix"></image>
					<view class="product-descript">
						{{item.product_describe}}
					</view>

				</view>
				<view>
					<view class="good-badge">
						<text>{{item.index_category_id}}</text>
					</view>
					<view class="bottom">
						<price-type
						:priceFontSize="priceFontSize" 
						:iconRenminbiFontSize="iconRenminbiFontSize"
						:iconRenminbicolor="iconRenminbicolor"
						:price="item.price"
						></price-type>
						<view class="add-cart" @click.stop="add(item)">
							<uni-icons type="plus-filled" color="#0A800A" size="30"></uni-icons>
						</view>
								
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import priceType from "components/price-type/price-type"
	import cart from '../../utils/cart.js'
	import data from '../../utils/data.js'
	export default{
		props:['productList'],
		data() {
			return {
				priceFontSize:32,
				iconRenminbiFontSize:24,
				goodPrice:78,
				iconRenminbicolor:"#F80606",
				cartText:0,
				flash:false
			}
		},
		methods:{
			navigate_to(url){
				uni.navigateTo({
					url
				})
			},


			add(item){
				cart.add(item,1)
				// for(let i=0;this.productList.length>i;i++){
				// 	if(id == this.productList[i].id){
				// 		cart.add(this.productList[i],1)
				// 	}
				// }
				uni.showToast({
					title:'加入购物车成功'
				})
			}
		},
		created() {

		},
		components:{
			priceType
		},
		onShow(){

		}
	}
</script>

<style lang="scss">
	.product-by-categary{
		width: 100%;
		display: flex;
		flex-direction:column;
		.box{
			width: 49%
		}
		.items{
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			
			.item{
				background-color: $uni-bg-color;
				padding-bottom: $uni-spacing-col-base;
				font-size: $uni-font-size-sm;
				display: flex;
				flex-direction:column;
				justify-content: space-between;
				width: 49%;
				margin:$uni-spacing-col-sm 0;
				.top{
					image{
						width: 100%;
						height: 300rpx;
					}
					.product-descript{
						line-height: 40rpx;
						padding-left: $uni-spacing-row-base;
					}
					
				}
				.good-badge{
					// padding:$uni-spacing-col-base $uni-spacing-col-sm $uni-spacing-col-base $uni-spacing-col-base;
					font-size: 18rpx;
					color: $my-badge-red-color;
					margin:$uni-spacing-col-base 0;
					text{
						margin: 0 $uni-spacing-col-sm 0 0 ;
						padding:$uni-spacing-col-sm $uni-spacing-col-base;
						border:1px solid $my-badge-red-color;
						border-radius: $uni-border-radius-base;
					}
				}
			.bottom{
				padding: 0 $uni-spacing-row-base;
				display: flex;
				justify-content: space-between;
				height: 60rpx;
				line-height: 60rpx;
				// margin:0 $uni-spacing-col-base;
				.add-cart{
					.icon-tianjia{
						font-size: 50rpx;
						color:$my-icon-color;
					}
				}
			}

			}
		}
	}
</style>
