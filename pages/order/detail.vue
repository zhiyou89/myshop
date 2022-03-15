<template>
	<view class="order-detail">
		<view class="order-status">
			<view class="" v-for="(item ,index) in orderStatusInfo" :key="index" v-if="item.id==status">
				<block>
					<text class="iconfont icon-dunpai"></text>
					<text class="">{{item.title}}</text>
					<view>{{item.textInfo}}</view>
				</block>
				

			</view>

		</view>
		<view class="order-wrap">

			<view class="delivery" >
				<view class="part-wrap">
					<view>

					</view>
					<view class="content">
						<text>感谢在友诚生活商城购物，欢迎您的光临</text>
					</view>
					<view>
						<!-- <text class="iconfont icon-you"></text> -->
					</view>
				</view>

			</view>
			<view class="user">
				<view class="part-wrap">
					<view class="iconfont icon-location"></view>
					<view>
						<view class="user-detail">
							<text>{{userName}}{{sex}}</text>
							<text>{{telNumber}}</text>
						</view>
						<view class="address">
							{{address}}
						</view>
					</view>
				</view>

			</view>
			
			<view class="product" v-if="nowDeliverProduct.length">
				<view class="item-title">
					<view class="">
						即时配送商品
					</view>
<!-- 					<view class="">
						配送时间:{{orderData.snap_delivery.hope_time}}
					</view> -->
				</view>
				<view class="item" v-for="(item, index) in nowDeliverProduct" :key="index">

					<view class="part-wrap">
						<view class="img">
							<image :src="item.main_img_url" mode="widthFix"></image>
						</view>
						<view class="product-content">
							<text class="descript">{{item.name}}</text>
							<view class="count-and-guige">
								<view>
									<text>数量：</text>
									<text>{{item.count}}</text>
								</view>
<!-- 								<view>
									<text>规格：</text>
									<text>黄色</text>
									<text>不锈钢</text>
								</view> -->
							</view>
							<view class="price">
								<text>￥{{item.totalPrice}}</text>
							</view>
						</view>
					</view>
					<view class="my-button" v-if="item.status==1" >
						<button type="primary" size="mini" @click="confirm(item.id,orderID,3)">确认收货</button>
						<button type="warn" size="mini" @click="confirm(item.id,orderID,2)">申请退款</button>
					</view>
					<view class="my-button" v-if="item.status==2">
						<button type="warn" size="mini" disabled>退款中</button>
					</view>
					<view class="my-button" v-if="item.status==3" @click="jumpTo(item.id,orderID)">
						<button type="default" size="mini">评价</button>
					</view>
					<view class="my-button" v-if="item.status==5">
						<button type="primary" size="mini" disabled>退款完成</button>
					</view>
				</view>


			</view>
			
			
			<view class="product" v-if="tomorrowDeliverProduct.length">
				<view class="item-title">
					<view class="">
						隔天配送商品
					</view>
					<view class="">
						配送时间:{{orderData.snap_delivery.hope_time}}
					</view>
				</view>
				<view class="item"  v-for="(item, index) in tomorrowDeliverProduct" :key="index">

					<view class="part-wrap">
						<view class="img">
							<image :src="item.main_img_url" mode="widthFix"></image>
						</view>
						<view class="product-content">
							<text class="descript">{{item.name}}</text>
							<view class="count-and-guige">
								<view>
									<text>数量：</text>
									<text>{{item.count}}</text>
								</view>
<!-- 								<view>
									<text>规格：</text>
									<text>黄色</text>
									<text>不锈钢</text>
								</view> -->
							</view>
							<view class="price">
								<text>￥{{item.totalPrice}}</text>
							</view>
						</view>
					</view>
					<view class="my-button" v-if="item.status==1" >
						<button type="primary" size="mini" @click="confirm(item.id,orderID,3)">确认收货</button>
						<button type="warn" size="mini" @click="confirm(item.id,orderID,2)">申请退款</button>
					</view>
					<view class="my-button" v-if="item.status==2">
						<button type="warn" size="mini" disabled>退款中</button>
					</view>
					<view class="my-button" v-if="item.status==3" @click="jumpTo(item.id,orderID)">
						<button type="default" size="mini">评价</button>
					</view>
					<view class="my-button" v-if="item.status==5">
						<button type="primary" size="mini" disabled>退款完成</button>
					</view>
				</view>
			
			
			</view>
			
			<view class="product" v-if="realDeliverProduct.length">
				<view class="item-title">
					<view class="">
						实时物流商品
					</view>
<!-- 					<view class="">
						<text>查看物流</text>
						<uni-icons type="arrowright" color="#999"></uni-icons>

					</view> -->
				</view>
				<view class="item" v-for="(item, index) in realDeliverProduct" :key="index">

					<view class="part-wrap">
						<view class="img">
							<image :src="item.main_img_url" mode="widthFix"></image>
						</view>
						<view class="product-content">
							<text class="descript">{{item.name}}</text>
							<view class="count-and-guige">
								<view>
									<text>数量：</text>
									<text>{{item.count}}</text>
								</view>
<!-- 								<view>
									<text>规格：</text>
									<text>黄色</text>
									<text>不锈钢</text>
								</view> -->
							</view>
							<view class="price">
								<text>￥{{item.totalPrice}}</text>
							</view>
						</view>
					</view>
					<view class="my-button" v-if="item.status==1" >
						<button type="primary" size="mini" @click="confirm(item.id,orderID,3)">确认收货</button>
						<button type="warn" size="mini" @click="confirm(item.id,orderID,2)">申请退款</button>
					</view>
					<view class="my-button" v-if="item.status==2">
						<button type="warn" size="mini" disabled>退款中</button>
					</view>
					<view class="my-button" v-if="item.status==3" @click="jumpTo(item.id,orderID)">
						<button type="default" size="mini">评价</button>
					</view>
					<view class="my-button" v-if="item.status==5">
						<button type="primary" size="mini" disabled>退款完成</button>
					</view>
				</view>
			
			
			</view>
			
			<view class="order-detail">
				<view class="order-detail-wrap">
					<view>
						<text class="name">订单编号：</text>
						<text>{{orderData.order_no}}</text>
					</view>
					<view>
						<text class="name">下单时间：</text>
						<text>{{orderData.create_time}}</text>
					</view>
					<view>
						<text class="name">支付方式：</text>
						<text>微信支付</text>
					</view>

					<view>
						<text class="name">配送方式：</text>
						<text>同城配送</text>
					</view>

				</view>
				
			</view>
			<view class="good-detail">
				<view class="good-detail-wrap">
					<view>
						<view>
							商品总额：
						</view>
						<view>
							￥{{orderData.total_price}}
						</view>
					</view>
					<view>
						<view>
							运费：
						</view>
						<view>
							-￥{{orderData.snap_delivery.price}}
						</view>
					</view>
					<view>
						<view>
							返积分：
						</view>
						<view>
							+{{credits}}
						</view>
					</view>

					<view class="good-price">
						<view></view><view>实付：<text>￥{{orderData.snap_delivery.price*1+orderData.total_price*1}}</text></view>
					</view>
					</view>
				</view>

			</view>
			<view class="pay-button" v-if="status==1">
				<button type="primary" @click="payOneTime">微信付款</button>
			</view>
		</view>

	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import order from 'utils/order.js'
	export default{
		data(){
			return{
				orderID:0,
				status:1,
				orderData:[],
				userName:'',
				telNumber:'',
				address:'',
				nowDeliverProduct:[],
				tomorrowDeliverProduct:[],
				realDeliverProduct:[],
				credits:0,
				sex:"男",
				orderStatusInfo:[
					{
						id:1,
						title:'待付款订单',
						textInfo:'',
						text:'超时订单将自动关闭'
					},
					{
						id:2,
						title:'已付款订单',
						textInfo:'',
						text:'订单已经完成付款，请耐心等待商品同城配送'
					},
					{
						id:3,
						title:'已完成订单',
						textInfo:'',
						text:'订单已经完成付款，请耐心等待商品同城配送'
					},
					{
						id:9,
						title:'退款/售后订单',
						textInfo:'',
						text:'您的请求已提交，请耐心等待平台处理'
					}

				]
			}
		},
		components:{
			uniIcons
		},
		methods:{
			jumpTo(id,orderid){
				uni.redirectTo({
					url:"/pages/reviews/reviews?product_id="+id+"&order_id="+orderid
				})
			},
			//判断是否改变订单转态，并删除该数据
			IfupdateOrderStatus(){
				
			},
			async confirm(id,orderid,status){
				console.log(status)
				if(status==3){
					uni.showModal({
						content:'您确定收货吗',
						success: (modal) => {
							if (modal.confirm) {
								this.updateOrderStatus(id,orderid,status)
							}
						}
					})
				}
				if(status==2){
					uni.showModal({
						content:'您确定要申请退款吗',
						success: (modal) => {
							if (modal.confirm) {
								this.updateOrderStatus(id,orderid,status)
							}
						}
					})
				}
			
			},
			
			//改变订单状态
			async updateOrderStatus(id,orderid,status){
				const res = await this.$myrequest({
					url:'/order/status',
					data:{
						product_id:id,
						order_id:orderid,
						status:status
					}
				})
				if(res.statusCode==200){
					let title = '操作成功'
					this.getOrderByID()
					if(status==2){
						title = "申请退款成功"
						uni.showToast({
							title:title
						})
					}else if(status==3){
						title ="收货成功"
						uni.showToast({
							title:title
						})
					}
				
				}
			},
			
			async payOneTime(){
				order.checkTokenOrGetToken()
				const payInfo = await this.$myrequest({
					url:'/pay/pre_order',
					method:'POST',
					data:{
						// 'id':554
						'id':this.orderID,
					}
				})
				if(payInfo.nonceStr && payInfo.paySign && payInfo.package){
					let that = this
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
								// that.delete(that.productArr)
								let orderID = placeOrderInfo.order_id
							}
						},
						fail: function (err) {
							console.log('fail:' + JSON.stringify(err));
							
						}
					});
				}
			},
			async getOrderByID(){
				const res = await this.$myrequest({
					url:'/order/one',
					data:{
						id:this.orderID
					}
				})
				this.orderData = res
				this.address = res.snap_address.nameByChooseAddress+res.snap_address.detailInfo
				this.userName = res.snap_address.userName
				this.telNumber = res.snap_address.telNumber
				if(res.snap_address.sexText==1){
					this.sex = "女士"
				}
				
				this.getNowDeliverProduct()
				this.getTomorrowDeliverProduct()
				this.getRealDeliverProduct()
				this.credits = parseInt(this.orderData.total_price)
			},
			//即时配送商品数据
			getNowDeliverProduct(){
				this.nowDeliverProduct = []
				for(let i=0;this.orderData.snap_items.length>i;i++){
					if(this.orderData.snap_items[i].index_category_id == "即时配送"){
						this.nowDeliverProduct.push(this.orderData.snap_items[i])
					}
				}
				
			},
			//隔天配送
			getTomorrowDeliverProduct(){
				this.tomorrowDeliverProduct = []
				for(let i=0;this.orderData.snap_items.length>i;i++){
					if(this.orderData.snap_items[i].index_category_id == "隔天配送"){
						this.tomorrowDeliverProduct.push(this.orderData.snap_items[i])
					}
				}
				
			},
			//实时物流
			getRealDeliverProduct(){
				this.realDeliverProduct = []
				for(let i=0;this.orderData.snap_items.length>i;i++){
					if(this.orderData.snap_items[i].index_category_id == "实时物流"){
						this.realDeliverProduct.push(this.orderData.snap_items[i])
					}
				}
				
			}
		},
		onLoad(options) {
			this.orderID = options.order_id
			this.status = options.status
			this.getOrderByID()


		}
	}
</script>

<style lang="scss">
	.order-detail{
		.order-status{
			text-align: center;
			font-size: $uni-font-size-lg;
			height: 200rpx;
			background-image: url('https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/youcheng/bg.png');
			background-size: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			view{
				padding-top:$uni-spacing-col-base;
			}
		}
		.order-wrap{
			font-size: $uni-font-size-sm;
			margin-bottom: 100rpx;
			.delivery{
				padding: $uni-spacing-col-lg 0;
				background-color: $uni-bg-color;
				border-radius: $uni-border-radius-lg;
				.content{
					padding:0  0 0 $uni-spacing-row-base;
					font-weight: $my-font-werght-blod;
					line-height: 50rpx;
				}
				.part-wrap{
					padding: 0 $uni-spacing-row-base;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

			}
		}
		.user{
			background-color: $uni-bg-color;
			margin-top: $uni-spacing-col-lg;
			border-radius: $uni-border-radius-lg;
			.part-wrap{
				display: flex;
				padding: $uni-spacing-col-lg $uni-spacing-row-base;
			}
			.icon-location{
				padding-top: 5rpx;
			}
			.address{
				font-size: $uni-font-size-sm;
				color: $uni-text-color-grey;
			}
			.user-detail{
				margin-bottom: $uni-spacing-col-sm;
				text{
					padding:0 $uni-spacing-row-base 0 0;
				}
			}
			view{
				padding:0 $uni-spacing-row-base 0 0;
			}
		}
		.product{
			margin-top: $uni-spacing-col-lg;
			.item-title{
				display: flex;
				justify-content: space-between;
				padding: $uni-spacing-col-base;
				background-color: white;
			}
			.item{
				background-color: $uni-bg-color;
				padding:$uni-spacing-row-sm $uni-spacing-row-base $uni-spacing-row-sm $uni-spacing-row-base;
				border-bottom:1px solid $uni-bg-color-grey;

				.part-wrap{

					display: flex;
					.img{
						width: 120rpx;
						height: 120rpx;
						overflow: hidden;
						padding: 0 $uni-spacing-row-lg 0 0;
						image{
							width: 100%;
						}
					}
					.product-content{
						line-height: 40rpx;
						font-size: $uni-font-size-sm;
						.descript{
							font-weight: $my-font-werght-blod;
						}
						.count-and-guige{
							display: flex;
							color:$uni-text-color-grey;
							view{
								padding: 0 $uni-spacing-row-base 0 0;
								text{
									padding: 0 $uni-spacing-row-sm 0 0;
								}
							}
						}
						.price{
							font-weight: $my-font-werght-blod;
						}
					}
				}
				.my-button{
					padding: $uni-spacing-col-lg 0 0 0;
					text-align: right;
					button{
						margin-left: $uni-spacing-row-base;
					}
				}
			}

		}
		.order-detail{
			background-color: $uni-bg-color;
			margin-top: $uni-spacing-col-lg;
			border-radius: $uni-border-radius-lg;
			.order-detail-wrap{
				padding: $uni-spacing-col-lg $uni-spacing-row-base;
				view{
					line-height: 70rpx;
					.name{
						color: $uni-text-color-grey;
					}
					text{
						padding: 0 $uni-spacing-row-lg 0 0;
					}
				}

			}

		}
		
		.good-detail{
			background-color: $uni-bg-color;
			margin-top: $uni-spacing-col-lg;
			border-radius: $uni-border-radius-lg;
			.good-detail-wrap{
				padding: $uni-spacing-col-lg $uni-spacing-row-base;
				.good-price{
					border-top: 1px solid $uni-bg-color-grey;
					text{
						color:$my-badge-red-color;
					}
				}
				view{
					display: flex;
					justify-content: space-between;
					line-height: 70rpx;
				}
			}
		}
		.pay-button{
				 position:fixed;
			     bottom:0px;
			     width:100%;
			     height:auto;
			     z-index:999;
			     overflow:hidden;
				 button{
					 border-radius: none;
				 }
		}
	}
</style>
