<template>

	<view class="cart">
		
		<view class="cart-top">
			<!-- <view class="title-name">
				<text>购物车</text>
			</view> -->

<!-- 			<view class="notice">
				<view class="left">
					<text>还差</text>
					<text class="money">32.1</text>
					<text>块，可免配送费</text>
				</view>
				<view class="right" @click="goTo">
					<text>去凑单&nbsp;></text>
				</view>
				
			</view> -->
		</view>
		<view class="cart-empty" v-if="!cartData.length">
			<image src="https://youguan-1257044613.cos.ap-guangzhou.myqcloud.com/empty-cart.png" mode="widthFix"></image>
			<view class="">
				购物车空空如也
			</view>
			<view class="button" @click="goTo">
				去逛逛
			</view>
		</view>
		<block v-if="cartData.length">
			<checkbox-group @change="checkboxChange">
				<view class="cart-content" v-for="item in cartData" :key="item.id" 
				>
					<view class="checkbox-but">
						<label class="checkbox"><checkbox  style="transform:scale(0.7)" :checked="item.selectStatus" :value="item.product_describe+item.id"/></label>
					</view>
					<view class="img" @click="navigate_to('/pages/good/good?id='+item.id+'&category_id='+item.category_id)">
						<image :src="item.main_img_url"></image>
					</view>
					<view class="detail">
						<text class="content" @click="navigate_to('/pages/good/good?id='+item.id+'&category_id='+item.category_id)">{{item.product_describe}}</text>
						<view class="good-badge"><text>{{item.index_category_id}}</text></view>
						<view class="price-and-good-count">
							<view class="price">
								<text class="icon-renminbi iconfont">¥</text>
								<text>{{item.price}}</text>
							</view>
							<view class="good-count">
								<numberBox :value="item.counts" :productid = "item.id" @change="newVal"></numberBox>
							</view>
						</view>
					</view>
				</view>
			</checkbox-group>
			<!-- <ordered-controll :item="carArr"></ordered-controll> -->
			<view class="ordered-controll">
				<checkbox-group @change="changeBook">
					<label class="left-radio">
						<checkbox style="transform:scale(0.7)" value="cg" :checked="but_check"/> 全选
					</label>
				</checkbox-group>
				<view class="middle-count">
					<text>合计：</text>
					<text class="iconfont icon-renminbi">¥</text>
					<text class="count">
						{{account.account}}
					</text>
				
				</view>
				<view class="bottom-ordered" @click="submitPay" v-if="account.sum">
					<view class="my-button">
						<text>
							 结算({{account.sum}}件)
						</text>
					</view>
				</view>
			</view>
		</block>
	</view>

</template>

<script>
	import numberBox from 'components/uni-number-box/uni-number-box.vue'
	import cart from 'utils/cart.js'
	import data from '@/utils/data.js'
	// import orderedControll from 'components/ordered-controll/ordered-controll'
	export default {
		data() {
			return {
				pro_checked:false,
				but_check:false,
				cartData:[],
				shoppingProductAllCounts:0,
				account:{},
				productCount:1,
				allFlag: {
				    value: 'cb',
				    selectStatus: false
				}	
			}
		},
		onLoad: function(){

		},
		onShow: function() {

			this.account = cart.getCartAllPrice()
			this.doCartData()
		},
		onHide() {
		},
		components:{
			numberBox
		},

		methods: {
			navigate_to(url){
				uni.navigateTo({
					url
				})
			},
			goTo(){
				uni.switchTab({
					url:"/pages/index/index"
				})
			},
			newVal(e){
				let cartData = uni.getStorageSync(data.storageKeyForCart)
				for(let i=0;cartData.length>i;i++){
					if(cartData[i].id == e.productid){
						cartData[i].counts = e.newVal
					}
				}
				uni.setStorageSync(data.storageKeyForCart,cartData)
				this.account = cart.getCartAllPrice()
			},
			submitPay(){
				uni.navigateTo({
					url:'/pages/order/order-pay?from=cart&account='+this.account.account
				})
			},

			doCartData(){
				this.cartData = uni.getStorageSync(data.storageKeyForCart)
				let i=0;
				if(!this.cartData.length){
					return false
				}
				this.cartData.forEach(v=>{
					if(v.selectStatus){
						
						i++
						this.shoppingProductAllCounts +=v.counts
					}
				})
				  
				if(i==this.cartData.length){
					this.but_check = true
				}
			},
			checkboxChange (e) {
				  this.cartData.forEach((v)=>{
				  	v.selectStatus = false
					this.but_check = false
				  })
					if(e.detail.value.length){
						this.cartData.forEach((v,k)=>{
							e.detail.value.forEach(el=>{
								if(v.product_describe+v.id == el){
									v.selectStatus = true
								}
							})
						})
			
						if(this.cartData.length == e.detail.value.length){
							this.but_check = true
						}else{
							this.but_check = false
						}
						console.log(this.but_check)
						
					}
					uni.setStorageSync(data.storageKeyForCart,this.cartData)
					this.account = cart.getCartAllPrice()
			},
			changeBook(e){
				this.but_check = !this.but_check
				var bool = false
				if(e.detail.value.length !=0){
					bool = true
				}
				this.cartData.forEach(el=>{
					el.selectStatus = bool
				})
				uni.setStorageSync(data.storageKeyForCart,this.cartData)
				this.account = cart.getCartAllPrice()
			}
			
			
		
		}
	}
</script>

<style lang="scss">
	.cart{
		margin:0 0 120rpx 0;
		.cart-empty{
			padding: 400rpx 0 0 0;
			color: $uni-text-color-grey;
			text-align: center;
			image{
				width: 25%;
			}
			.button{
				padding-top: $uni-spacing-col-lg;
				color:green;
			}
		}
		.cart-top{
			background: $uni-text-color-inverse;
			padding-bottom: $uni-spacing-col-lg;
			// border-top:1px solid $uni-border-color;
			.title-name{
				text-align: center;
				line-height: 50px;
				font-size: $uni-font-size-lg;
			}
			.notice{
				display: flex;
				justify-content: space-between;
				margin: 0 $uni-spacing-row-base;
				.money,.right{
					color:$my-badge-red-color;
				}
			}
		}

		.cart-content{
			display: flex;
			background:$uni-bg-color;
			margin:$uni-spacing-col-base $uni-spacing-row-base;
			border-radius: $uni-border-radius-lg;
			align-items: center;
			.checkbox-but{
				width:100rpx;
				padding-left: $uni-spacing-row-base;
			}
			.img{
				width: 150rpx;
				image{
					width:150rpx;
					height:150rpx;
				}
			}
			.detail{
				width: 600rpx;
				padding:$uni-spacing-col-base $uni-spacing-row-base;
				.content{
					font-weight: $my-font-werght-blod;
				}
				.good-badge{
					// padding:$uni-spacing-row-sm 0;
					font-size: 18rpx;
					color: $my-badge-red-color;
					margin:$uni-spacing-col-lg 0;
					text{
						margin: 0 $uni-spacing-col-sm 0 0 ;
						padding:$uni-spacing-col-sm $uni-spacing-col-base;
						border:1px solid $my-badge-red-color;
						border-radius: $uni-border-radius-base;
					}
				}
				.spec{
					padding-top:$uni-spacing-col-base;
					color:$uni-text-color-grey;
				}
				.price-and-good-count{
					display: flex;
					justify-content: space-between;
					// padding-top:$uni-spacing-row-base;
					.price{
						color:$my-badge-red-color;
						.icon-renminbi{
							font-size: 25rpx;
							padding-right: 5rpx;
						}
							
						text{
							font-weight:$my-font-werght-blod ;
							color:$my-badge-red-color;
							font-size: $uni-font-size-lg;
						}
					}
					.number-box{
						display: flex;
						border: 1px solid $uni-border-color;
						text-align: center;
						height: 50rpx;
						line-height: 50rpx;
						.iconfont{
							width: 40rpx;
							background-color: $uni-bg-color-grey;
						}
						.number{
							width: 40rpx;
							font-size: $uni-font-size-sm;
						}
					}
				}
			}
		}
	}
	
	.ordered-controll{
		z-index: 999;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;
		height: 100rpx;
		background: $uni-bg-color;
		border-top:1px solid $uni-border-color;
		line-height: 100rpx;
		.left-radio{
			.uni-radio{
				width: 30rpx;
				height: 30rpx;
			}
		}
		.middle-count{
			.icon-renminbi{
				font-size: 25rpx;
				color:$my-badge-red-color;
				padding-right: 5rpx;
				font-weight:$my-font-werght-blod ;
			}
				
			.count{
				font-weight:$my-font-werght-blod ;
				font-size: $uni-font-size-lg;
				color:$my-badge-red-color;
			}
		}
		.bottom-ordered{
			.my-button{
				text-align: center;
				text{
					border-radius: 2em;
					background: $my-icon-color;
					padding:20rpx 50rpx;
					color:$uni-text-color-inverse;
				}
			}
		}
	}


</style>
