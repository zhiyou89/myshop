<template>
	<view class="good">
		<view class="top">
			<view class="mswiper">
				<m-swiper class="mswiper" :items = "productOne.banners" :swiperHeight = "700"></m-swiper>
			</view>
			<view class="good-wrap">
				<view class="price-and-share">
					<view class="price">
						<text class="iconfont icon-renminbi"></text>
						<text class="count">{{productOne.price}}</text>
						<text class="per">/份</text>
					</view>
					<view class="ser-son" >
						<button open-type="share">
							<text class="">
								分享
							</text>
							<text class="iconfont icon-fenxiang_2" ></text>

						</button>
					</view>

<!-- 					<view class="share">
						<button size="mini" type="warn" open-type="share">
							<text>分享</text>
						</button>
					</view> -->
					
				</view>
				<view class="good-title">
					<text>{{productOne.product_describe}}</text>
				</view>
				<view class="good-sub-title">
					<text>{{productOne.product_best_descript}}</text>
				</view>
				<view class="delivery">
					<view class="left">配送</view>
					<view class="right" v-if="productOne.index_category_id=='即时配送'">
						立即下单，预计{{productOne.delivery_time}}送达
					</view>
					<view class="right" v-if="productOne.index_category_id=='隔天配送'">
						立即下单，预计明天送达
					</view>
					<view class="right" v-if="productOne.index_category_id=='实时物流'">
						立即下单，产地发货，实时物流
					</view>
				</view>
				<view class="good-best">
					<view>
						<text class="iconfont icon-zhiliangbaozheng"></text>
						<text class="content">质保</text>	
					</view>
					<view>
						<text class="iconfont icon-location"></text>
						<text class="content">产地{{productOne.make_in}}</text>	
					</view>
<!-- 					<view>
						<text class="iconfont icon-app_icons--"></text>
						<text class="content">新鲜</text>	
					</view> -->
				</view>
			</view>
			
			<view class="reviews"  @click="jumpTo(id)" v-if="reviewsData.score">
				<view class="top">
					<view class="name">
						<text>
							用户评价
						</text>
					</view>
					<view class="right"> 
						<text class="reviews-count">{{reviewsData.average_score}}</text><text class="iconfont icon-you"></text>
					</view>
				</view>
				<view class="tag">
					<view v-for="(item,index) in reviewsData.tag" :key="index">
						<text>{{index}}</text>
						<text>{{item}}</text>
						  
					</view>
				</view>
				<view class="content">
					<view class="img">
						<image :src="reviewsData.reviews_info.user_info.header_img"></image>
					</view>
					<view class="reviews-user">
						<view class="user-wrap">
							<view>
								<view class="user-name">{{reviewsData.reviews_info.user_info.nickname}}</view>
								<view class="time">{{reviewsData.reviews_info.create_time}}</view>
							</view>
							<view class="user-tag">
								<uni-rate :size="18" :value="reviewsData.score" :readonly="true" class=""/>
							</view>
						</view>
						<view class="reviews-detail">
							{{reviewsData.reviews_info.review_content}}
						</view>
					</view>
				</view>
			</view>
			
			<view class="recommend-menu" v-if="showMenu">
				<view class="name">
					<text>
						推荐菜谱
					</text>
				</view>
			
				<view class="nav" v-if="menuTitle.length">
					<text v-for="(item,index) in menuTitle" :key="index" @click="navByMenu(index,item.menu_id)" 
					:class="{active:index==indexMenu}">{{item.menu_info.menu_name}}</text>
				</view>
				<view class="product-by-menu">
					<recomment-goods-list :items="productByMenu"  @addCart = "addCart"></recomment-goods-list>
				</view>

				<view class="menu-but">
					<view class="menu-but-box">
						<view class="type">
							<text>
								组合购买
							</text>
						</view>
						<view class="my-price">
							<text class="icon-renminbi iconfont"></text>
							<text>{{allProductByMenuPrice/100}}</text>
						</view>
						<view class="cart-but"
						@click="addAll">
							<text>
								一件加车
							</text>
						</view>
						<view class="read-menu" @click="navigateTomenu">
							<text>
								查看菜谱
							</text>
						</view>
					</view>

				</view>
			</view>

			<view class="good-detail">
				<view class="name">
					<text>商品详情</text>
				</view>
				<view class="good-detail-img">
						<image :src="item.img_url.url" mode="widthFix"  v-for="(item,index) in productOne.product_imgs" :key="index"></image>
				</view>
			</view> 

			<view class="recomment-friend">
				<view class="name">
					<text>猜你喜欢</text>
				</view>
				<recomment-goods-list :items="productList" @addCart = "addCartByFriend"></recomment-goods-list>
			</view>

		</view>
		<view class="goods-nav">
			<uni-goods-nav :fill="fill" :cartCount="cartCount"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
		</view>
		<topIcon :topState = "topFlash" @top="goTop"></topIcon>
	</view>
</template>

<script>

	import mSwiper from 'components/swiper/swiper'
	import recommentGoodsList from 'components/goods-list/recomment-goods-list'
	import productByMenu from 'components/goods-list/product-by-menu'
	import uniGoodsNav from 'components/uni-goods-nav/uni-goods-nav.vue'
	import cart from '../../utils/cart.js'
	import data from '@/utils/data.js'
	import topIcon from 'components/gwh-backTopIcon/gwh-backTopIcon.vue'
	export default {
		data () {
		      return {
				share:{
				   title:'ALAPI',
				   path:'/pages/index/index',
				   imageUrl:'',
				   desc:'',
				   content:''
				},
				topFlash:false,
				fill:true,
		        options: [{
		            icon: 'home',
		            text: '首页',
		            infoBackgroundColor:'#007aff',
		            infoColor:"red",
					info:0
		        }, {
		            icon: 'cart',
		            text: '购物车',
					info:1
		        }],
		        buttonGroup: [{
		          text: '加入购物车',
		          backgroundColor: '#ff0000',
		          color: '#fff'
		        },
		        {
		          text: '立即购买',
		          backgroundColor: '#ffa200',
		          color: '#fff'
		        }
		        ],
				id:0,
				productOne:[],
				page:1,
				productList:[],
				categoryID:0,
				menuTitle:[],
				productByCategory:[],
				menuID:0,
				showMenu:false,
				productByMenu:[],
				reviewsData:[],
				cartCount:0,
				clickMenuID:0,
				indexMenu:0,
				allProductByMenuPrice:0,
				allProductByMenu:[]
		      }
		    },
		components:{
			mSwiper,
			recommentGoodsList,
			uniGoodsNav,
			productByMenu,
			topIcon
		},

		methods: {
			//回到顶部
			goTop(){
			  uni.pageScrollTo({
				  scrollTop: 0,
				  duration: 100,
			  })
			},
			//滚动事件获取坐标
			onPageScroll(e){
							 if(e.scrollTop>1300){
								 this.topFlash = true
							 }else{
								 this.topFlash = false
							 }
			},
			//猜你喜欢类目中加入购物车
			addCartByFriend(e){
				for(let i=0;this.productList.length>i;i++){
					if(e.id == this.productList[i].id){
						cart.add(this.productList[i],1)
					}
				}
				cart.updateCartCount()
				this.cartCount = cart.readCartCountByStorageSync()
				uni.showToast({
					title:'加入购物车成功'
				})
			},
			//加入购物车
			addCart(e){
				for(let i=0;this.productByMenu.length>i;i++){
					if(e.id == this.productByMenu[i].id){
						cart.add(this.productByMenu[i],1)
					}
				}
				cart.updateCartCount()
				this.cartCount = cart.readCartCountByStorageSync()
				uni.showToast({
					title:'加入购物车成功'
				})
			},
			//菜谱中加入购物车
			addProductByMenu(e){
				cart.add(this.productOne,1)
				this.cartCount = cart.readCartCountByStorageSync()
				uni.showToast({
					title:'添加购物车成功'
				})
			},
			//分享页面
			sharePage(){
				let url = '/pages/good/good?id='+this.id+'&category_id='+this.categoryID
				this.onShareAppMessage()
			},
			//查看菜谱
			navigateTomenu(){
				uni.navigateTo({
					url: '/pages/menu/menu-detail?id='+this.clickMenuID+'&category_id='+5
				})
			},
			//一键加车
			addAll(){
				cart.addAllToCart(this.productByMenu,1)
				this.cartCount = cart.readCartCountByStorageSync()
				uni.showToast({
					title:'添加购物车成功'
				})
			},
			//初始化菜谱数据
			intDataForMenu(clickMenuID){
				this.allProductByMenu.push({
					index:this.indexMenu,
					menuId:clickMenuID,
					data:[]
				})
			},
			//判断是否有该数据
			isHas(){
				for(let i=0;this.allProductByMenu.length>i;i++){
					if(this.allProductByMenu[i].menuId==this.clickMenuID){
						return true
					}
				}
			},
			//写入数据
			pushData(data){
				for(let i=0;this.allProductByMenu.length>i;i++){
					if(this.allProductByMenu[i].menuId==this.clickMenuID){
						for(let y=i;data.length>y;y++){
							this.allProductByMenu[i].data.push(data[y])
						}
					}
				}
			},
			//菜谱导航按钮
			navByMenu(index,menuID){
				this.indexMenu = index
				this.clickMenuID = menuID
				if(!this.isHas()){
					this.intDataForMenu(menuID)
					this.getMainProduct(menuID)
				}else{
					for(let i=0;this.allProductByMenu.length>i;i++){
						if(this.allProductByMenu[i].menuId==this.clickMenuID){
							this.productByMenu = this.allProductByMenu[i].data
						}
					}
				}

			},
			//导航条跳转按钮事件
			onClick(e){
				if(e.content.text == '首页'){
					uni.switchTab({
					    url: '/pages/index/index'
					});
				}
				if(e.content.text == '购物车'){
					uni.switchTab({
					    url: '/pages/cart/cart'
					});
				}
					
			},
			
			async addCartByMenu(e){
				const product = await this.$myrequest({
					url:'/product',
					data:{
						'id':e.id
					}
				})

				cart.add(product,1)
				this.cartCount = cart.readCartCountByStorageSync()
				uni.showToast({
					title:'添加购物车成功'
				})
			},
			buttonClick(e){
				
				if(e.content.text=="加入购物车"){
					cart.add(this.productOne,1)
					this.cartCount = cart.readCartCountByStorageSync()
					uni.showToast({
						title:'添加购物车成功'
					})
				}
				if(e.content.text=="立即购买"){
					uni.navigateTo({
						url:'/pages/order/order-pay?from=good&product_id='+this.id+'&account='+this.productOne.price
						// url: '/pages/order/order-pay'
					});
				}
				// let cartDate = cart.addToCart(this.productOne)
				// // console.log(res)
				// cart.add(cartDate,1)
			},
			//获取商品页信息
			async getProductOne(id,callBack){
					const res = await this.$myrequest({
						url:'/product',
						data:{
							'id':id
						}
					})

				this.productOne = res
				callBack && callBack()
			},
			async getProductList(callBack){
				
				const res = await this.$myrequest({
					url:'/product/by_category',
					data:{
						'page':1,
						'categoryID':this.categoryID
					}
				})
				if(res.data.length>0){
					this.productList =[...this.productList, ...res.data]
				}

				callBack && callBack()
			},
			async getReviews(callBack){
				
				const res = await this.$myrequest({
					url:'/reviews',
					data:{
						'id':this.id
					}
				})
				if(Object.keys(res).length !=1){
					this.reviewsData = res.reviews[0]	
				}
	
				// uni.setStorageSync('reviews_data'+this.id, res);
				callBack && callBack()
			},
			async getMenu(callBack){
				const res = await this.$myrequest({
					url:'/product_menu',
					data:{
						
						'id':this.id
					}
				})
				if(res[0].menu.length>0){
					this.menuTitle =res[0].menu
					if(this.menuTitle.length>0){
						this.showMenu = true
						if(this.clickMenuID == 0){
							this.clickMenuID = this.menuTitle[0].menu_id
							this.intDataForMenu(this.menuTitle[0].menu_id)
							this.getMainProduct(this.menuTitle[0].menu_id)
						}
						
					}
				}

				callBack && callBack()
			},
			async getMainProduct(id){
				let arr = []
				// this.productByMenu = []
				this.allProductByMenuPrice = 0
				const info = await this.$myrequest({
					url:'/menu/main_info',
					data:{
						'id': id
					}
				})
				if(info.length>0){
					let dataInfo = info[0].menu_find_product
					for(let i=0;dataInfo.length>i;i++){
						if(this.id !=dataInfo[i].product_id){
							this.allProductByMenuPrice +=dataInfo[i].product_one.price*100
							// this.productByMenu.push(dataInfo[i].product_one)
							for(let y=0;this.allProductByMenu.length>y;y++){
								if(this.allProductByMenu[y].menuId==this.clickMenuID){
									this.allProductByMenu[y].data.push(dataInfo[i].product_one)
									this.productByMenu = this.allProductByMenu[y].data
								}
							}
						}
						
					}
					
				}				
			},
			//跳转到评价详情
			jumpTo(id){
				uni.navigateTo({
					url: '/pages/reviews/reviews-detail?id='+id
				})
			}
		},
		onLoad(options){
			this.id = options.id
			this.categoryID = options.category_id
			this.getMenu()
			let storage = uni.getStorageSync(data.storageKeyForCart)
			this.cartCount = storage.length
			this.getProductOne(options.id)
			this.getProductList()
			this.getReviews()
			// this.getProductByCategory()
		}
	}
</script>

<style lang="scss">
	.good{
		margin-bottom: 60px;
		.name{
			font-weight: $my-font-werght-blod;
		}
		.good-wrap{
			background-color: $uni-bg-color;
			border-radius: $uni-border-radius-base;
			margin: $uni-spacing-col-lg 0;
			padding:$uni-spacing-col-lg 0 $uni-spacing-col-lg $uni-spacing-row-base;
			.price-and-share{
				display: flex;
				justify-content: space-between;
				.price{
					font-size: $uni-font-size-lg;
					color:$my-badge-red-color;
					.per{
						color:$uni-text-color-grey;
						font-size: $uni-font-size-sm;
					}
					.count{
						font-weight: $my-font-werght-blod;
					}
				}
				.ser-son button::after {
					border: none;
				}
				
				.ser-son button {
					color:$uni-text-color-grey;
					font-size: $uni-font-size-sm;
					position: relative;
					display: block;
					margin-left: auto;
					margin-right: auto;
					padding-left: 0px;
					padding-right: $uni-spacing-row-base;
					box-sizing: border-box;
					// font-size: 18px;
					text-align: center;
					text-decoration: none;
					// line-height: 1;
					line-height: 1.35;
					// border-radius: 5px;
					-webkit-tap-highlight-color: transparent;
					overflow: hidden;
					background-color: #fff;
					width: 100%;
					height: 100%;
					
				}
				
			

			}
			.good-title{
				font-size: $uni-font-size-lg;
				font-weight: $my-font-werght-blod;
				line-height: 60rpx;
			}
			.good-sub-title{
				line-height: 60rpx;
			}
			.delivery{
				display: flex;
				line-height: 60rpx;
				.left{
					margin-right: $uni-spacing-row-lg;
				}
			}
			.good-best{
				display: flex;
				font-size: $uni-font-size-sm;
				color:$uni-text-color-grey;
				height: 50rpx;
				line-height: 50rpx;
				
				view{
					border: 1px solid $uni-text-color-grey;
					padding:0 $uni-spacing-row-sm;
					border-radius: $uni-border-radius-base;
					border-radius: $uni-border-radius-base;
					margin-right: $uni-spacing-row-sm;
					.iconfont{
						padding-right: $uni-spacing-row-sm;
						color:$my-icon-color;
					}
				}
			}
		}
		
		.reviews{
			margin-bottom: $uni-spacing-col-lg;
			background-color: $uni-bg-color;
			border-radius:$uni-border-radius-lg;
			padding:$uni-spacing-col-lg $uni-spacing-row-base;
			.top{
				display: flex;
				justify-content: space-between;
				.right{
					text{
						padding-left:$uni-spacing-row-sm;
						color:$uni-text-color-grey;
					}
					.reviews-count{
						color:$uni-text-color;
					}
				}
			}
			.tag{
				display: flex;
				flex-wrap: wrap;
				margin:$uni-spacing-col-lg 0;
				view{
					margin-right: $uni-spacing-row-base;
					padding:$uni-spacing-col-sm $uni-spacing-row-base;
					background-color: $uni-bg-color-grey;
					border-radius: 2em;
					text{
						padding-right: 6rpx;
						font-size: $uni-font-size-sm;
					}
				}
			}
			.content{
				display: flex;
				justify-content: space-between;
				.img{
					width: 120rpx;
					height: 120rpx;
					padding-right: $uni-spacing-row-base;
					image{
						border-radius: 50%;
						width: 120rpx;
						height: 120rpx;
					}
				}
				.reviews-user{
					width: 630rpx;
					color:$uni-text-color-grey;
					.user-wrap{
						display: flex;
						justify-content: space-between;
						.user-name{
							font-weight: $my-font-werght-blod;
							color:$uni-text-color
						}
						.time{
							margin-top: $uni-spacing-col-sm;
						}

					}
					.reviews-detail{
						margin-top: $uni-spacing-col-lg;
					}
				}
			}
		}
		.recommend-menu{
			padding-bottom: $uni-spacing-col-sm;
			background-color: $uni-bg-color;
			.name{
				padding: $uni-spacing-col-base 0 0 15rpx;
			}
			.nav{
				padding: 0 0 0 15rpx;
				line-height: 60rpx;
				.active{
					color:$my-active-color;
				}
				text{
					padding-right: $uni-spacing-row-lg;
				}
				
			}
			.menu-but{
				position: relative;
				height: 60rpx;
				margin:$uni-spacing-col-lg 0;
				
				.menu-but-box{
					line-height: 60rpx;
					display: flex;
					position: absolute;
					right: 0;
					top:0;
					view{
						margin-right: $uni-spacing-row-base;
					}
					.my-price{
						font-size: $uni-font-size-lg;
						color:$my-badge-red-color;
						font-weight: $my-font-werght-blod;
					}
					.cart-but, .read-menu{
						border:1px solid $my-icon-color;
						padding: 0  $uni-spacing-row-lg;
						border-radius: 2em;
					}
					.cart-but{
						background-color: $my-icon-color;
						color:$uni-text-color-inverse;
					}
					.read-menu{
						color:$my-icon-color;
					}
				}

			}

		}
		.good-detail{
			padding: $uni-spacing-row-base $uni-spacing-row-base;
			background-color: $uni-bg-color;
			margin: $uni-spacing-col-lg 0;
			.name{
				padding: $uni-spacing-col-base $uni-spacing-row-sm $uni-spacing-col-lg 0;
			}
			.good-detail-img{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				image{
					width: 100%;
				}
			}
		}
		.recomment-friend{
			.name{
				padding: $uni-spacing-col-base $uni-spacing-row-sm;
			}
		}
		.goods-nav{
			position: fixed;
			bottom: 0;
			left:0;
			width: 100%;
		}

	}
</style>
