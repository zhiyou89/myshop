<template>
	<view class="order-pay">
		<view class="address-detail">
			<navigator url="../address/address"  class="box" v-if="address.length">
				<view class="part-wrap" >
					<view class="address" >
						{{address[0].nameByChooseAddress}}{{address[0].detailInfo}}
					</view>
				
					<view class="name">
						<text>{{address[0].userName}}{{address[0].sexText==0?"先生":"女士"}}</text>
						<text>{{address[0].telNumber}}</text>
					</view>
				
				</view>
				<view class="edit-address iconfont icon-you">
					<uni-icons type="arrowright" size="20" color="#999"></uni-icons>
				</view>
			</navigator>



			<navigator url="../address/address-add" class="add-address" v-if="!address.length">
				<view class="content" >
					添加您要配送的地址
				</view>
				<view class="edit-address iconfont icon-you">
					<uni-icons type="arrowright" size="20" color="#999"></uni-icons>
				</view>
			</navigator>
		</view>

		<view class="order-list">
			<view class="item">
				
					
						<view class="name" v-if="nowDeliverProduct.length>0">
							即时配送商品
						</view>
						<block v-for="(item, index) in nowDeliverProduct" :key = "index" v-if="item.index_category_id=='即时配送'">
						<view class="box">
							<view class="img">
								<image :src="item.main_img_url" mode=""></image>
							</view>
							<view class="content">
								<view class="describe">
									
									<view>{{item.product_describe}}</view>
									
								</view>
								<view class="icon">
									<text>即时配送</text>
								</view>
								<view class="price-and-count">
									<view class="count" v-if="!productId">
										*{{item.counts}}
									</view>
									<view class="count" v-if="productId">
										*1
									</view>
									<price-type :price="item.price"></price-type>
								</view>
							</view>
						</view>
					
				</block>
			</view>
			<view class="item">
				
					
						<view class="name" v-if="tomorrowDeliverProduct.length>0">
							隔天配送商品
						</view>
						<block v-for="(item, index) in tomorrowDeliverProduct" :key = "index" v-if="item.index_category_id=='隔天配送'">
						<view class="box">
							<view class="img">
								<image :src="item.main_img_url" mode=""></image>
							</view>
							<view class="content">
								<view class="describe">
									
									<view>{{item.product_describe}}</view>
									
								</view>
								<view class="icon">
									<text>隔天配送</text>
								</view>
								<view class="price-and-count">
									<view class="count" v-if="!productId">
										*{{item.counts}}
									</view>
									<view class="count" v-if="productId">
										*1
									</view>
									<price-type :price="item.price"></price-type>
								</view>
							</view>
						</view>
					
				</block>
			</view>
			<view class="item">
				
					
						<view class="name" v-if="realDeliverProduct.length>0">
							实时物流商品
						</view>
						<block v-for="(item, index) in realDeliverProduct" :key = "index" v-if="item.index_category_id=='实时物流'">
						<view class="box">
							<view class="img">
								<image :src="item.main_img_url" mode=""></image>
							</view>
							<view class="content">
								<view class="describe">
									
									<view>{{item.product_describe}}</view>
									
								</view>
								<view class="icon">
									<text>实时物流</text>
								</view>
								<view class="price-and-count">
									<view class="count" v-if="!productId">
										*{{item.counts}}
									</view>
									<view class="count" v-if="productId">
										*1
									</view>
									<price-type :price="item.price"></price-type>
								</view>
							</view>
						</view>
					
				</block>
			</view>
			
		</view>


		
		<view class="order-price-deliver part">
			<view class="part-wrap">
				<view class="item" @click="chooseTime" v-if="tomorrowDeliverProduct.length">
					<view class="name">
						<text>隔天商品配送时间</text>
					</view>
					<view class="">
						<text>{{deliverTime}}</text>
						<text class="iconfont icon-you"></text>
					</view>
				</view>
				<view class="item">
					<view class="name">
						<text>配送费</text>
					</view>
					<view class="price">
						<text class="iconfont icon-renminbi"></text>
						<text>{{deliverFree}}</text>
					</view>
				</view>
				
				<view class="item">
					<view class="name">
						<text>优惠券</text>
					</view>
					<view class="price">
						<text>-</text>
						<text class="iconfont icon-renminbi"></text>
						<text>{{couponFree}}</text>
					</view>
				</view>
				
				
				
<!-- 				<view class="price-count">
					<view class="price-count-wrap">
						<view>合计</view>
						<view class="price">
							<text class="iconfont icon-renminbi"></text>
							<text>10</text>
						</view>
					</view>

				</view> -->
			</view>
	
		</view>
		
		<view class="bottom-button part">
			<view class="part-wrap bottom-wrap">
				<view class="count-price">
					<text class="money-count">付款合计：</text>
					<text class="iconfont icon-renminbi"></text>
					<text>{{account/100}}</text>
				</view>
				<view class="my-button" @click="pay">
					提交订单
				</view>
			</view>

		</view>
			<uniPopup ref="popup" type="bottom">
				<view class="popup-box">
					<view class="wrap">
						<view class="left">
							隔天配送时间
						</view>
						<view class="right">
							<view class="" v-for="(item,index) in timeArr" :key="index" @click="_deliverTime(item)">
								{{item}}
							</view>
			
						</view>
					</view>			
				</view>
			</uniPopup>
	</view>

</template>

<script>
	import cart from 'utils/cart.js'
	import data from 'utils/data.js'
	import order from 'utils/order.js'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	import priceType from "@/components/price-type/price-type"
	export default{
		data(){
			return{
				from:'',
				productId:0,
				productOne:[],
				productArr:[],
				account:0,
				deliverTime:'7:00-9:00',
				deliverFree:3,
				couponFree:0,
				payMoney:0,
				nowDeliverProduct:[],
				realDeliverProduct:[],
				tomorrowDeliverProduct:[],
				dataArr:[],
				address:[],
				timeArr:['7:00-9:00','9:00-11:00','11:00-13:00','13:00-15:00','15:00-17:00','17:00-19:00','19:00-21:00']
			}
		},
		components:{
			uniPopup,
			uniTag,
			priceType
		},
		
		methods:{
			//购物车角标
			cartIcon(){
				
			},
			chooseTime(){
				this.$refs.popup.open()
			},
			_deliverTime(time){
				this.deliverTime = time
				this.$refs.popup.close()
			},
			async getProductOne(callBack){
					const res = await this.$myrequest({
						url:'/product',
						data:{
							'id':this.productId
						}
					})
			
				this.productOne = res
				let product = []
				
				product.push({
					id:this.productOne.id,
					price:this.productOne.price,
					index_category_id:this.productOne.index_category_id,
					main_img_url:this.productOne.main_img_url,
					counts:1,
				})
				console.log(product)
				if(this.productOne.index_category_id=='即时配送'){
					this.nowDeliverProduct = product
				}
				if(this.productOne.index_category_id=='隔天配送'){
					this.tomorrowDeliverProduct = product
				}
				if(this.productOne.index_category_id=='实时物流'){
					this.realDeliverProduct = product
				}
					callBack && callBack()
			},
			chooseAddress(){
				let that = this
				that.address = uni.getStorageSync(data.storageKeyForAddress)
				if(that.address.length<=0){
					uni.chooseAddress({
						success(res){
							let address = []
							let arr = {
								type:0,
								nameByChooseAddress:res.cityName+res.countyName,
								detailInfo:res.detailInfo,
								userName:res.userName,
								telNumber:res.telNumber
							}
							address.push(arr)
							uni.setStorageSync(data.storageKeyForAddress,address)
							that.address = address
							
						},
						fail(res){
							uni.showToast({
								title:'获取地址失败',
								duration:2000
							})
						}
					})
				}
			},


    /*购物车中是否已经存在该商品*/
    _isHasThatOne(id,arr){
        var item,
            result={index:-1};
        for(let i=0;i<arr.length;i++){
            item=arr[i];
			console.log(item.id,'itemid')
			console.log(id,'id')
            if(item.id==id) {
                result = {
                    index:i,
                    data:item
                };
                break;
            }
        }
        return result;
    },


    /*
    * 删除某些商品
    */
    delete(ids){
        if(!(ids instanceof Array)){
            ids=[ids];
        }
        var cartData=uni.getStorageSync(data.storageKeyForCart);

        for(let i=0;i<ids.length;i++) {
            var hasInfo = this._isHasThatOne(ids[i].id, cartData);
            if (hasInfo.index != -1) {
                cartData.splice(hasInfo.index, 1);  //删除数组某一项
            }
        }
        uni.setStorageSync(data.storageKeyForCart,cartData);
    },
			async pay(){
				
				let that = this
				order.checkTokenOrGetToken()
				if(this.address.length<=0){
					uni.showToast({
						title:'送货地址不能为空',
						duration:2000
					})
					return false
				}
				let delivery = {
					'hope_time':this.deliverTime,
					'price':this.deliverFree
				}
				 let token = uni.getStorageSync(data.storageKeyForToken);
				 let products = []
				 for(let i=0;i<this.productArr.length;i++){
				 	products.push({
				 		product_id:this.productArr[i].id,
				 		count:this.productArr[i].counts
				 	})
				 }				

				 const placeOrderInfo = await this.$myrequest({
				 	url:'/place_order',
					method:'POST',
				 	data:{
				 		'products':products,
				 		'delivery':delivery,
						'address':this.address[0]
				 	}
				 })
				 
				 console.log(placeOrderInfo)

				if(placeOrderInfo.pass){
					
					const payInfo = await this.$myrequest({
						url:'/pay/pre_order',
						method:'POST',
						data:{
							// 'id':554
							'id':placeOrderInfo.order_id,
						}
					})



						if(payInfo.nonceStr && payInfo.paySign && payInfo.package){
							that.delete(that.productArr)
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: payInfo.timeStamp.toString(),
								nonceStr: payInfo.nonceStr,
								package: payInfo.package,
								signType: payInfo.signType,
								paySign: payInfo.paySign,
								success: function (res) {
									console.log(res)
									if(res.errMsg=="requestPayment:ok"){
										let orderID = placeOrderInfo.order_id
										uni.showToast({
											title:'订单支付成功',
										})
										setTimeout(()=>{
											uni.redirectTo({
												url:"/pages/order/detail?status=3&order_id="+placeOrderInfo.order_id
											})
										},1500)
									}
								},
								fail: function (err) {
									uni.showToast({
										title:'订单支付失败',
										icon:'none'
									})
									
									setTimeout(()=>{
										uni.redirectTo({
											url:"/pages/order/detail?status=1&order_id="+placeOrderInfo.order_id
										})
									},1500)

									console.log('fail:' + JSON.stringify(err));
									
								}
							});
						}
				}
			}
		},
		onLoad(options) {
			let setting = uni.getStorageSync('setting')
			this.deliverFree = setting.delivery_free
			// this.chooseAddress()
			this.from = options.from
			if(options.from=='good'){
				this.productId = options.product_id
				this.getProductOne()
				this.productArr.push({
					id:this.productId,
					counts:1
				})
			}else{
				this.nowDeliverProduct = cart.getNowDeliverProduct()
				this.realDeliverProduct = cart.getRealDeliverProduct()
				this.tomorrowDeliverProduct = cart.getTomorrowDeliverProduct()
				this.productArr = cart.getPayProductFromStorageSync()
			}
			let myaccount = options.account*100+this.deliverFree*100-this.couponFree*100
			this.account = myaccount.toFixed(2)
			
		},
		onShow() {
			this.address = uni.getStorageSync(data.storageKeyForAddress)
		},
		onHide() {
console.log('onhide')
		}
	}
</script>

<style lang="scss">
	.order-pay{
		.order-list{
			.item{
				background-color: white;
				margin: $uni-spacing-col-lg 0;
				.name{
					padding: $uni-spacing-col-base 0 $uni-spacing-col-base $uni-spacing-col-base;
					border-bottom: 1px dotted $uni-text-color-disable;
				}
				.box{
					display: flex;
					align-items: center;
					padding:$uni-spacing-col-base 0;
					.img{
						image{
							width: 150rpx;
							height: 150rpx;
						}
					}
					.content{
						width: 630rpx;
						padding:$uni-spacing-col-base;
						border-bottom: 1rpx solid $uni-bg-color-grey;
						.describe{
							
						}
						.icon{
							padding:$uni-spacing-col-base 0;
							text{
								padding: 5rpx 15rpx;
								border-radius: 2em;
								background-color: $uni-color-error;
								font-size: $uni-font-size-sm;
								color: white;
							}
						}
						.price-and-count{
							display: flex;
							justify-content: space-between;
							padding: 0 $uni-spacing-col-base 0 0;
							.count{
								color:$uni-color-error;
							}
						}
					}
	
				}
			}
		}
		.popup-box{
			background-color: white;
			.wrap{
				
				display: flex;
				.left{
					padding:$uni-spacing-col-base $uni-spacing-col-lg 0 $uni-spacing-col-lg;
				}
				.right{
					border-left: 1px solid $uni-text-color-grey;
					view{
						border-bottom: 1rpx solid $uni-bg-color-grey;
						padding:$uni-spacing-col-base 0 $uni-spacing-col-base $uni-spacing-col-lg;
					}
				}
			}
			.mybutton{
				text-align: center;
				padding: $uni-spacing-col-lg 0 0 0;
				button{
					width: 80%;
				}
			}
		}
		.part{
			background-color: $uni-bg-color;
			border-radius: $uni-border-radius-lg;
			.part-wrap{
				padding: $uni-spacing-col-lg $uni-spacing-row-base;
			}
		}
		
		.address-detail{
			line-height: 50rpx;
			padding: $uni-spacing-col-lg $uni-spacing-row-base 0 $uni-spacing-row-base;
			.name{
				text{
					padding-right: $uni-spacing-row-base;
				}
			}
			.box{
				display: flex;
				justify-content: space-between;
			}
			.icon-you{

				color:$uni-text-color-grey;
			}
			.add-address{
				// padding-top: $uni-spacing-col-lg;
				display: flex;
				justify-content: space-between;
				.content{
					width: 90%;
					text-align: center;
					
				}
			}
		}

		
		.order-price-deliver{
			margin-bottom: 150rpx;
			.item{
				display: flex;
				justify-content: space-between;
				line-height: 80rpx;
				border-bottom: 1rpx solid $uni-bg-color-grey;
				.icon-you{
					padding-left: 10rpx;
					color:$uni-text-color-grey
				}
				.price{
					color: $my-badge-red-color;
					font-size: $uni-font-size-lg;
					.icon-renminbi{
						font-size: $uni-font-size-sm;
					}
				}
			}
			.price-count{
				
				position: relative;
				height: 60rpx;
				line-height: 80rpx;
				.price-count-wrap{
					display: flex;
					position: absolute;
					top:0;
					right: 0;
					.price{
						text-align: right;
						color:$my-badge-red-color;
						padding-left: $uni-spacing-col-base;
						.icon-renminbi{
							font-size: $uni-font-size-sm;
						}
					}
				}

			}
		}
		.bottom-button{
			position: fixed;
			bottom:0;
			left:0;
			width: 100%;
			.bottom-wrap{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.count-price{

					.money-count{
						font-size: $uni-font-size-base;
					}
				}
				.my-button{
					padding: $uni-spacing-col-base $uni-spacing-row-lg;
					background-color: $my-icon-color;
					border-radius: 2em;
					color:$uni-text-color-inverse;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
				}
				
			}

		}
	}
</style>
