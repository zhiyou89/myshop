<template>
	<view class="">
		<view class="init-box">
			<loadingView :initLoading="initLoading"></loadingView>
		</view>
		<view class="content">
			<view class="" style="">



				<view class="nav-top">
						<navTop :height="height" :navLeft="navLeft" :navTop="navTop" :pageNameColor="pageNameColor">
							<view class="page-name-text" slot="top-nav-content" @click="getLocation">
								<text class="iconfont icon-location"></text>
								<text v-if="address">{{address}}</text>
								<text v-if="!address">当前地址不在配送范围内</text>
								<text class="icon-xiala iconfont"></text>
							</view>
						</navTop>
						<view class="search-box">
							<search-view :searchText="setting.search_text"></search-view>
						</view>
				</view>
				
				<view class="my-swiper-box" :style="{'padding-top':height+navTop+53+'px'}">
					<m-swiper class="mswiper" :items = "banners" :swiperHeight="300"></m-swiper>
				</view>
			
			</view>
		    <view class="content-wrap">
			<view class="middle-nav" >
				<view class="middle-nav-wrap" v-if="setting.show_list">
					<view class="item" v-for="(item,index) in navArr" :key="index" @click="jump(item.id)">
						<view>
							<image :src="item.url" mode="widthFix"></image>
						</view>
		
						<text>{{item.title}}</text>
					</view>
				</view>
				<view class="hot-sell-googs">
					<view class="wrap">
						<view class="title" >
							<text>热销商品</text>
						</view>
						<hot-goods-list :indexHot="indexHot"></hot-goods-list>
					</view>
				</view>
				<view class="like-for-googs">
					<view class="wrap">
						<goods-navbar @navBar="navBar"></goods-navbar>
						<product-by-category :productList = "productList"></product-by-category>			
					</view>
				</view>
			</view>
			
			</view>

			<uniPopup ref="popup" type="bottom"></uniPopup>
		</view>
		<loading v-if="!noMessage"></loading>
		<noMessageNtice v-if="noMessage"></noMessageNtice>
		<topIcon :topState = "topFlash" @top="goTop"></topIcon>
		<contact></contact>
	</view>

</template>

<script>
	import loading from 'components/loading-view/product-loading.vue'
	import searchView from 'components/search/search.vue'
	import navTop from 'components/nav-top/nav-top'
	import mSwiper from 'components/swiper/swiper.vue'
	import goodsList from 'components/goods-list/goods-list.vue'
	import hotRank from 'components/hot-rank/hot-rank.vue'
	import hotGoodsList from 'components/hot-goods-list/hot-goods-list.vue'
	import noMessageNtice from 'components/no-message-notice/no-message-notice.vue'
	import goodsNavbar from 'components/nav/goods_navbar'
	import productByCategory from 'components/goods-list/product-by-category.vue'
	import loadingView from 'components/loading-view/loading-view.vue'
	import topIcon from 'components/gwh-backTopIcon/gwh-backTopIcon.vue'
	import contact from 'components/contact/contact.vue'
	export default {
		data() {
			return {
				pageNameColor:'#fff',
				productData:[],
				banners:[],
				productList:[],
				indexHot:[],
				navTop:0,
				height:0,
				navLeft:0,
				right:0,
				navIndex:1,
				dataProduct:[],
				address:'',
				clickFlash:true,
				initLoading:true,
				topFlash:false,
				noMessage:false,
				setting:{},
				navArr:[
					{
						'id':1,
						url:'https://youguan-1257044613.cos.ap-guangzhou.myqcloud.com/nav-9.png',
						title:'新鲜水果'
					},
					{
						'id':2,
						url:'https://youguan-1257044613.cos.ap-guangzhou.myqcloud.com/nav-1.png',
						title:'包点牛奶'
					},
					{
						'id':3,
						url:'https://youguan-1257044613.cos.ap-guangzhou.myqcloud.com/nav-2.png',
						title:'海鲜水产'
					},
					{
						'id':4,
						url:'https://youguan-1257044613.cos.ap-guangzhou.myqcloud.com/nav-3.png',
						title:'家庭洗护'
					},
					{
						'id':5,
						url:'https://youguan-1257044613.cos.ap-guangzhou.myqcloud.com/nav-4.png',
						title:'酒水饮料'
					},
					{
						'id':6,
						url:'https://youguan-1257044613.cos.ap-guangzhou.myqcloud.com/nav-5.png',
						title:'粮油调味'
					},
					{
						'id':7,
						url:'https://youguan-1257044613.cos.ap-guangzhou.myqcloud.com/nav-6.png',
						title:'肉禽单品'
					},
					{
						'id':8,
						url:'https://youguan-1257044613.cos.ap-guangzhou.myqcloud.com/nav-7.png',
						title:'速冻食品'
					},
					{
						'id':9,
						url:'https://youguan-1257044613.cos.ap-guangzhou.myqcloud.com/nav-8.png',
						title:'新鲜蔬菜'
					},
					{
						'id':10,
						url:'https://youguan-1257044613.cos.ap-guangzhou.myqcloud.com/nav-10.png',
						title:'休闲零食'
					},
				
				]
			}
		},
		components:{
			mSwiper,
			goodsList,
			hotRank,
			hotGoodsList,
			noMessageNtice,
			navTop,
			searchView,
			goodsNavbar,
			productByCategory,
			loadingView,
			loading,
			topIcon,
			contact
		},
		methods: {
			jump(id){
				uni.setStorageSync('listID',id)
				uni.switchTab({
					url:"/pages/list/list"
				})
			},
			//回到顶部按钮事件
			 goTop(){
				  uni.pageScrollTo({
					  scrollTop: 0,
					  duration: 100,
				  })
			 },
			 //滚动手机页面坐标
			 onPageScroll(e){
				 if(e.scrollTop>700){
					 this.topFlash = true
				 }else{
					 this.topFlash = false
				 }
			 },

			//计算两点间的距离
           distance(lat1, lng1, lat2, lng2) {
		      var radLat1 = lat1 * Math.PI / 180.0;
		      var radLat2 = lat2 * Math.PI / 180.0;
		      var a = radLat1 - radLat2;
		      var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
		      var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
		      s = s * 6378.137;
		      s = Math.round(s * 10000) / 10000;
			  return s;

		    },
			//选择定位
			chooseLocation(){
				uni.chooseLocation({
				    success: (res) => {
						this.address = res.name
				    }
				});
			},
			//定位
			getLocation(){
				// let that = this
					if(this.address){
						return false
					}
				uni.getLocation({

				    type: 'wgs84',
					geocode:true,
				    success:  (res) => {
						let distance = this.distance(res.latitude,res.longitude,this.setting.latitude,this.setting.longitude)
						let delivery_dis = uni.getStorageSync('setting')
						delivery_dis = delivery_dis.delivery_distance
						if(distance>delivery_dis){
							uni.showModal({
								content:'当前地址超出配送范围,请您选择其他地址',
								success: (modal) => {
									if (modal.confirm) {
										uni.navigateTo({
											url:"/pages/address/address"
										})
										// this.chooseLocation()
									} else if (modal.cancel) {
										console.log('用户点击取消');
									}
								}
							})
						}else{
							uni.setStorageSync('iaddress',{latitude:res.latitude,longitude:res.longitude})
							let location = res.latitude+','+res.longitude
							uni.request({
								url:"https://apis.map.qq.com/ws/geocoder/v1/",
								data:{
									location:location,
									key:'XFLBZ-UGRWP-I2WDT-V6KWX-43QMJ-5WB4A'
								},
								success: (res) => {
									this.address = res.data.result.address
								}
							})

						}
				    }
				})
			},
			//防止多次点击，多次调用接口
			shopClickMoreTime(){
				if(this.clickFlash){
					return false
				}
				this.clickFlash = true
			},
			//分类导航点击
			navBar(e=1){
				this.shopClickMoreTime()
				this.navIndex = e
				if(!this.isHas()){
					this.intProductData()
					this.noMessage = this.getFlash()
					this.getProductByCategoryIndex()
				}else{
					this.showData()
				}
			},
			//初始化数据
			intProductData(){

				if(!this.isHas()){
					this.productData.push({
						page:1,
						navId:this.navIndex,
						flash:false,
						data:[]
					})
				}
			},
			//将数据写入数组
			insterData(data){
				for(let i=0;this.productData.length>i;i++){
					if(this.productData[i].navId==this.navIndex){
						
						if(!data instanceof Array){
							data = [data]
						}
						for(let y=0;data.length>y;y++){
							this.productData[i].data.push(data[y])
						}
					}
				}
			},
			//判断是否有该数据
			isHas(){
				if(this.productData.length){
					for(let i=0;this.productData.length>i;i++){
						if(this.productData[i].navId == this.navIndex){
							return true
						}
					}
				}else{
					return false
				}

			},
			//获取展示的数据
			showData(){
				for(let i=0;this.productData.length>i;i++){
					if(this.productData[i].navId == this.navIndex){
						this.productList = this.productData[i].data
					}
				}
				this.clickFlash = false
			},
			//获取对应pages
			getPages(){
				for(let i=0;this.productData.length>i;i++){
					if(this.productData[i].navId==this.navIndex){
						return this.productData[i].page
					}
				}
			},
			//更新pages
			updatePages(pages){
				for(let i=0;this.productData.length>i;i++){
					if(this.productData[i].navId==this.navIndex){
						this.productData[i].page = pages
					}
				}
			},
			//获取对应Flash
			getFlash(){
				for(let i=0;this.productData.length>i;i++){
					if(this.productData[i].navId==this.navIndex){
						return this.productData[i].flash
					}
				}
			},
			//修改flash为true
			updateFlash(){
				for(let i=0;this.productData.length>i;i++){
					if(this.productData[i].navId==this.navIndex){
						this.productData[i].flash = true
					}
				}
			},
			
			//首页商品分类
			
			async getProductByCategoryIndex(pages=1,callBack){
				const res = await this.$myrequest({
					url:'/category/product',
					data:{
						'pages':pages,
						'id':this.navIndex
					}
				})
				if(res.data.length<this.setting.page_limit){
					this.updateFlash()
					this.noMessage = this.getFlash()
				}
				this.insterData(res.data)
				this.showData()
				this.clickFlash = false
				callBack && callBack()
			},

			async getHot(){
				const res = await this.$myrequest({
					url:'/product/hot'
				})
				this.indexHot = res
			},
			async getBanner(){
				const res = await this.$myrequest({
					url:'/banner/1'
				})
				this.banners = res.items
			},
			async getSetting(){
				const res = await this.$myrequest({
					url:'/setting'
				})
				this.setting = res
				uni.setStorageSync('setting',res)
			},

			intLoading(){
				if(!this.banners.length || !this.productList.length){
				setTimeout(()=>{
					this.initLoading = false
				},1500)
					
				}
			}
		},
		onShow() {
			this.intLoading()
			//定位
			this.getLocation()
		},
		onLoad() {
			//获取配置
			this.getSetting()

			//初始化分类商品数据
			this.intProductData()
			//调用接口获取分类数据
			this.getProductByCategoryIndex()
			//轮播图
			this.getBanner()
			//获取热门商品
			this.getHot()

			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			const { windowWidth } = uni.getSystemInfoSync();
			this.navTop = menuButtonInfo.top
			this.right = menuButtonInfo.right
			this.navLeft = windowWidth - this.right
			this.height = menuButtonInfo.height
		},
		onReachBottom(){
			
			if(this.noMessage){
				return false
			}
			let pages = this.getPages()
			pages++
			this.updatePages(pages)
			this.getProductByCategoryIndex(pages)
		},
		onPullDownRefresh() {
			this.productData = []
			this.navIndex = 1
			this.productList = []
			this.clickFlash = false
			this.topFlash = false
			this.noMessage = false
			
			setTimeout(()=>{
				this.navBar(1)
				this.getProductByCategoryIndex(1,()=>{
					uni.stopPullDownRefresh()
				})
			},1000)
		}
	}
</script>

<style lang="scss">
	page{
		.content{
			.nav-top{
				position: fixed;
				padding-bottom: $uni-spacing-col-base;
				// background-color: red;
				background-image: url('https://youguan-1257044613.cos.ap-guangzhou.myqcloud.com/index_top_bg.png');
				background-size: 100%;
				width:100%;
				z-index: 999999;
				.search-box{
					margin:0 $uni-spacing-row-base 0 $uni-spacing-row-base;
				}
				.icon-location{
					font-size: 20rpx;
				}
			}
			
			.my-swiper-box{
				background-image: url('https://youguan-1257044613.cos.ap-guangzhou.myqcloud.com/index_top_bg.png');
				background-size:100%;
				padding: 0 10rpx 10rpx 10rpx;
				
				.mswiper{
					swiper{
						border-radius: $uni-border-radius-lg;
						overflow: hidden;
					}

				}
			}
			.content-wrap {
				width:720rpx;
				padding: 0 0 0 $uni-spacing-row-base;
				height: 100%;



				.middle-nav{
					.middle-nav-wrap{
						display: flex;
						justify-content:space-between;
						flex-wrap: wrap;
						background: white;
						margin: $uni-spacing-row-lg 0 0 0;
						.item{
							padding: $uni-spacing-row-sm 0;
							width: 20%;
							text-align: center;
							border-radius: $uni-border-radius-base;
							font-size: $uni-font-size-sm;
							view{
								padding:0 $uni-spacing-col-base;
								image{
									width: 80%;
								}
							}
		
						}
					}
				}
				.hot-sell-googs{
					margin-top: $uni-spacing-col-base;
					
					border-radius: $uni-border-radius-base;
					.wrap{
						.title{
							padding-left:$uni-spacing-col-lg;
							font-size: $uni-font-size-lg;
							font-weight: 600;
						}
						.goods-wrap{
							background: white;
							.item-one{
								display: flex;
								justify-content: space-between;
								padding: $uni-spacing-col-base;
								.left{
									width:340rpx;
									height:505rpx;
									background: red;
									image{
										width: 350rpx;
										height:202rpx;
									}
								}
							}
							.item-two{
							
							}
						}
						
					}
				}
				.like-for-googs{
					.wrap{
						.title{
							padding-left:$uni-spacing-col-lg;
							font-size: $uni-font-size-lg;
							font-weight: 600;
							text{
								line-height: 110rpx;
							}
						}

					}
				}
			}
		}
		
	}

</style>
