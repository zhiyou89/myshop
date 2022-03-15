<template>
	<view class="order">
		<view class="order-status-title">
			<view class="status-text" v-for="(item, index) in statusText" :key="index" @click="getOrderStaus(item.id)">
				<view :class="{'active':item.id==orderStatus}">
					{{item.text}}
				</view>
			</view>
		</view>
		<view class="item" v-for="(item, index) in orderInfo" :key="index" v-if="orderInfo.length"
		 @click="navigate_to('/pages/order/detail?order_id='+item.id+'&status='+item.status)">
			<view class="price-and-count">
				
				<view class="">共{{item.total_count}}种商品</view>
				<uni-icons type="arrowright" color="#999"></uni-icons>
			</view>
			<view class="top" >
				<view>{{item.create_time}}</view>
				<view class="top-but" >
					<text v-if="item.status==5">已取消</text>
					<text class="middle-border" v-if="item.status==5">|</text>
					<!-- <uni-icons type="trash" color="#999"></uni-icons> -->
				</view>
			</view>


			<view class="detail">
				<view class="img">
					<image :src="item.snap_img">
					</image>
				</view>
				<view class="describe">
					<text>{{item.snap_name}}</text>

				</view>
				<view class="price">
					<text class="iconfont icon-renminbi"></text>
					<text>{{item.total_price}}</text>
				</view>
			</view>
			<view class="box-button" v-if="item.status==1">
				<button type="primary" size="mini" @click.stop="payOneTime(item.id)">购买</button>
				<button type="warn" size="mini" @click.stop="cancel(item.id)">取消订单</button>
			</view>
		</view>
		<view class="no-message" v-if="!orderInfo.length">
			<image src="https://youguan-1257044613.cos.ap-guangzhou.myqcloud.com/empty-list.png" mode="widthFix"></image>
		</view>

	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default{
		data(){
			return{
				orderData:[],
				orderInfo:[],
				// page:1,
				orderStatus:1,
				classActive:false,
				flash:false,
				statusText:[
					{
						id:1,
						text:'待付款'
					},
					{
						id:2,
						text:'已付款'
					},
					{
						id:3,
						text:'已完成'
					},
					{
						id:4,
						text:'退款/售后'
					},
					{
						id:10,
						text:'全部'
					}
				]
			}
		},
		components: {
			uniIcons
		},

		methods:{
			jumpTo(id){
				uni.navigateTo({
					url:'/pages/reviews/reviews?id='+id
				})
			},
			
			//取消订单
			cancel(id){
				uni.showModal({
					content:'您要取消订单吗',
					success: (modal) => {
						if(modal.confirm){
							uni.request({
								url:"https://www.yjcloudcomputing.com/api/v1/order/cancel",
								data:{
									id:id
								},
								success:(res)=>{
									if(res.data.status==200){
										uni.showToast({
											title:res.data.msg,
											success: (res) => {
												setTimeout(()=>{
													uni.switchTab({
														url:"/pages/about-us/about-us"
													})
												},1000)
											}
										})
										

										
									}
								}
							})
						}
					}
				})
			},
			
			/*购物车中是否已经存在该商品*/
			_isHasThatOne(id,arr){
			    var item,
			        result={index:-1};
			    for(let i=0;i<arr.length;i++){
			        item=arr[i];

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
			//支付
			async payOneTime(order_id){
				const payInfo = await this.$myrequest({
					url:'/pay/pre_order',
					method:'POST',
					data:{
						// 'id':554
						'id':order_id,
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
								that.delete(that.productArr)
								let orderID = placeOrderInfo.order_id
							}
						},
						fail: function (err) {
							console.log('fail:' + JSON.stringify(err));
							uni.showToast({
								title:"付款失败",
								icon:'none'
							})
						}
					});
				}

			},

			//初始化order数组
			intOrderData(status){

				if(!this.isHas(status)){
					this.orderData.push({
						page:1,
						status:status,
						flash:false,
						data:[]
					})
				}
			},
			// 下拉修改页码
			editPage(status,page){
				for(let i=0;this.orderData.length>i;i++){
					if(this.orderData[i].status == status){
						this.orderData[i].page = page
					}
				}
			},
			// 修改flash
			editFlash(status,flash){
				for(let i=0;this.orderData.length>i;i++){
					if(this.orderData[i].status == status){
						this.orderData[i].flash = flash
					}
				}
			},
			//判断该状态下的数据是否为空
			isHasDataByStatus(status){
				for(let i=0;this.orderData.length>i;i++){
					if(this.orderData[i].status == status){
						return this.orderData[i].data.length
					}
				}
			},
			//判断是否有该状态的数据
			isHas(status){
				for(let i=0;this.orderData.length>i;i++){
					if(this.orderData[i].status == status){
						return true
					}
				}
			}
			,
			//获取分页页数
			getPage(status){
				let page = 1
				for(let i=0;this.orderData.length>i;i++){
					if(this.orderData[i].status == status){
						return page = this.orderData[i].page
					}
				}
				return page
			},
			//获取flash
			getFlash(status){
				let flash = false
				for(let i=0;this.orderData.length>i;i++){
					if(this.orderData[i].status == status){
						return flash = this.orderData[i].flash
					}
				}
				return flash
			},
			//写入订单数据数据
			pushData(data,status){
				if(!data instanceof Array){
					data = [data]
				}
				for(let i=0;this.orderData.length>i;i++){
					if(this.orderData[i].status == status){
						for(let y=0;data.length>y;y++){
							this.orderData[i].data.push(data[y])
						}
					}
				}
				
			},
			//获取对应的渲染数据
			getSowData(status){
				for(let i=0;this.orderData.length>i;i++){
					if(this.orderData[i].status == status){
						this.orderInfo = this.orderData[i].data
					}
				}
			},
			//调用数据接口
			async getOrderByStaus(status,page){
				const res = await this.$myrequest({
					url:'/order/all',
					data:{
						page:page,
						status:status
					}
				})
				if(!res.data.length || res.data.length<10){
					this.editFlash(status,true)
				}
				this.pushData(res.data,status)
				this.getSowData(status)
			},
			//点击状态栏事件
			getOrderStaus(status){
				this.orderStatus = status
				this.intOrderData(status)
				let page = this.getPage(status)
				let length = this.isHasDataByStatus(status)
				if(!length){
					this.getOrderByStaus(status,page)
				}else{
					this.getSowData(status)
				}

			},
			navigate_to(url){

				uni.navigateTo({
					url
				})
			}
		},
		onLoad(options) {
			this.orderStatus = options.status
			this.intOrderData(options.status)
			this.getOrderByStaus(options.status,1)
		},
		onReachBottom(){
			if(!this.getFlash(this.orderStatus)){
				let page = this.getPage(this.orderStatus)
				page++
				console.log(page)
				this.editPage(this.orderStatus,page)
				this.getOrderByStaus(this.orderStatus,page)
			}
			
			console.log(this.orderData)
		},
		onHide() {
			console.log('onhide')
		},
		onShow() {

			console.log('onshow')
		}
	}
</script>

<style lang="scss">
	page{
		// background-color: $uni-text-color-disable;
		.order{	
			.no-message{
				
				text-align: center;
				image{
					margin-top: 200rpx;
					width: 10%;
				}
			}
			.order-status-title{
				display: flex;
				justify-content: space-around;
				background-color: white;
				border-bottom-left-radius: $uni-border-radius-lg;
				border-bottom-right-radius: $uni-border-radius-lg;
				line-height: 100rpx;
				.status-text{
					.active{
						color: $my-icon-color;
					}
				}
			}
			.item{
				background-color: white;
				border-radius: $uni-border-radius-lg;
				margin: $uni-spacing-col-lg 0;
				padding-bottom: $uni-spacing-col-lg;
				.top, .price-and-count{
					display: flex;
					justify-content: space-between;
					padding: $uni-spacing-col-lg $uni-spacing-row-base;
					.top-but{
						.middle-border{
							padding:0 $uni-spacing-row-sm;
						}
					}
				}
		
				.detail{
					display: flex;
					justify-content: space-between;
					padding: 0 $uni-spacing-row-base;
					align-items: center;
					.img{
						width: 120rpx;
						height: 120rpx;
						image{
							width: 120rpx;
							height: 120rpx;
						}
					}
					.describe{
						padding: 0 $uni-spacing-row-lg;
					}
				}
				.box-button{
					text-align: right;
					margin-top: $uni-spacing-row-lg;
					button{
						margin-right: $uni-spacing-col-lg;
					}
				}
				.price-and-count{
					border-bottom: 1rpx solid $uni-bg-color-grey;
				}
			}
		
		}
	}

</style>
