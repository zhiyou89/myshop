<template>
		<view class="goods-list">
				<scroll-view class="left-nav" scroll-y>
					<view  class="scroll-view-item" v-for="(item,index) in ProductCategory" :key="index" :class="{active: index===leftNavIndex}"
					 @click="getCategoryProduct(index,item.id)">{{item.name}}</view>
				</scroll-view>
				<scroll-view class="right-nav" scroll-y  
				@scrolltolower="lower" 
				:scroll-top="scrollTop"
				@scroll="scroll"
				>
					<view>
						<image src="https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/youcheng/4.png" class="top-img"></image>
					</view>
					<view class="middle-nav">
						<view class="item" v-for="(item,index) in deliveryNav" :key="index" :class="{mactive:item.id==mNavID}" @click="middleNav(item.id)">
							{{item.name}}
						</view>
						
					</view>
					<view class="goods-list-box">
						<goods-list :productList='showlistData'></goods-list>
					</view>
					<loading v-if="!flag"></loading>
					<no-message-notice v-if="flag"></no-message-notice>
				</scroll-view>
				<topIcon :topState = "topFlash" @top="goTop"></topIcon>
		</view>

</template>

<script>
	import goodsList from "components/goods-list/product-by-category"
	import noMessageNtice from 'components/no-message-notice/no-message-notice.vue'
	import loading from 'components/loading-view/product-loading.vue'
	import topIcon from 'components/gwh-backTopIcon/gwh-backTopIcon.vue'
	export default {
		data() {
			return {
				topFlash:false,
				leftNavIndex:0,
				scrollTop:0,
				ProductCategory:[],
				categoryID:1,
				page:1,
				productList:[],
				flag:false,
				mNavID:1,
				triggered:false,
				_freshing: false,
				showlistData:[],
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				deliveryNav:[
					{
						id:1,
						name:'即时配送'
					},
					{
						id:2,
						name:'隔天配送'
					},
					{
						id:3,
						name:'实时物流',
					}
				]
			}
		},
		components:{
			goodsList,
			noMessageNtice,
			loading,
			topIcon
		},
		methods: {
			goTop(){
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
					
				})
			},
			 scroll: function(e) {
				 if(e.detail.scrollTop>800){
					 this.topFlash = true
				 }else{
					 this.topFlash = false
				 }
				
			    this.old.scrollTop = e.detail.scrollTop
			},
			loadFunction(){
				uni.showLoading({
				    title: '加载中'
				});
				
				setTimeout(function () {
				    uni.hideLoading();
				}, 1000);
			},
			//中间导航点击事件
			middleNav(mNavID){
				this.mNavID = mNavID
				let has = this.isHas()
				if(has){
					this.showData()
				}else{
					this.intOrderData()
					this.getProductList(1)
				}

			},
			//左边导航点击事件
			getCategoryProduct(index,categoryID){
				this.leftNavIndex = index
				this.categoryID = categoryID
				this.mNavID = 1
				let has = this.isHas()
	
				if(has){
					this.showData()
				}else{
					this.intOrderData()
					this.getProductList(1)
				}
			},
			//初始化product
			intOrderData(){
				this.productList.push({
					page:1,
					categoryid:this.categoryID,
					indexCategoryID:this.mNavID,
					flash:false,
					data:[]
				})
			},
			//是否有该数据
			isHas(){
				let res = false
				for(let i=0;this.productList.length>i;i++){
					if(this.productList[i].categoryid == this.categoryID 
					&& this.productList[i].indexCategoryID == this.mNavID)
					{
						res = true
					}
				}
				return res
			},
			//将数据push进productlist
			pushProduct(res){
				for(let i=0;this.productList.length>i;i++){
					if(this.productList[i].categoryid == this.categoryID
						&& this.productList[i].indexCategoryID == this.mNavID)
						{
							for(let y=0;res.length>y;y++){
								this.productList[i].data.push(res[y])
							}
						}
				}
				console.log(this.productList,'productList')
			
			},
			//页面显示的数据
			showData(){
				for(let i=0;this.productList.length>i;i++){
					if(this.productList[i].categoryid == this.categoryID
						&& this.productList[i].indexCategoryID == this.mNavID)
						{
							this.showlistData = this.productList[i].data
						}
				}
				
			},
			//找出数据里面对应的pages
			findValuePages(){

				for(let i=0;this.productList.length>i;i++){
					if(this.productList[i].categoryid == this.categoryID
						&& this.productList[i].indexCategoryID == this.mNavID)
						{
							return this.productList[i].page
						}
				}
			},
			//找出对应的flash
			findValueFlash(){
			
				for(let i=0;this.productList.length>i;i++){
					if(this.productList[i].categoryid == this.categoryID
						&& this.productList[i].indexCategoryID == this.mNavID)
						{
							return this.productList[i].flash
						}
				}
			},
			//更新page
			updatePages(pages){
				for(let i=0;this.productList.length>i;i++){
					if(this.productList[i].categoryid == this.categoryID
						&& this.productList[i].indexCategoryID == this.mNavID)
						{
							this.productList[i].page = pages
						}
				}
			},
			//更新flash
			updateFlash(flash){
				for(let i=0;this.productList.length>i;i++){
					if(this.productList[i].categoryid == this.categoryID
						&& this.productList[i].indexCategoryID == this.mNavID)
						{
							
							this.productList[i].flash = flash
							this.flag = flash
							// console.log(this.productList[i].flash,flash)
						}
				}
			},
			//更新mNAV
			updateindexCategoryID(mNav){
				for(let i=0;this.productList.length>i;i++){
					if(this.productList[i].categoryid == this.categoryID
						&& this.productList[i].indexCategoryID == this.mNavID)
						{
							this.productList[i].indexCategoryID = mNav
						}
				}
			},
			lower(){
				if(this.findValueFlash()){
					return false
				}
				let pages = this.findValuePages()
				pages++
				this.getProductList(pages)				
			},

			async getProductCategory(){
				const res = await this.$myrequest({
					url:'/category/all/1',
				})
				this.ProductCategory = res

			},
			async getProductList(page){
				const res = await this.$myrequest({
					url:'/category/list_products',
					data:{
						categoryId:this.categoryID,
						indexCategoryID:this.mNavID,
						pages:page
					}
				})
				
				if(!res.data.length){
					this.updateFlash(true)

				}else{
					this.updatePages(page)
				}
				this.pushProduct(res.data)
				this.showData()

			}


		},
		onLoad(options) {
			this.intOrderData()
			this.getProductList(1)
			this.getProductCategory()
		},
		onShow() {
			let listid =  uni.getStorageSync('listID')
			if(listid){
				this.leftNavIndex = listid-1
				this.getCategoryProduct(this.leftNavIndex,this.leftNavIndex+1)
				uni.setStorageSync('listID',0)
			}

		}
	}
</script>

<style lang="scss">
	page{
		height:100%;
		.goods-list{
			display: flex;
			justify-content: space-between;
			height:100%;
			.left-nav{
				height: 100%;
				width:150rpx;
				font-size: $uni-font-size-sm;
				// border-right:1px solid red;
				text-align: center;
				view{
					line-height: 50px;
					margin:0 0 1rpx 0; 

				}
				.active{
					background: $my-icon-gray-color;
					border-left: 3px solid $my-icon-color;
				}
				
			}
			.right-nav{
				width: 600rpx;
				height: 100%;
				.top-img{
					width: 100%;
					height:250rpx;
				}
				.list-name{
					color:$my-icon-color;
					text-align: center;
					padding:20rpx 0 $uni-spacing-col-lg 0;
				}
				.goods-list-box{
					margin: 0 $uni-spacing-row-sm;
				}
				.middle-nav{
					display: flex;
					justify-content: space-around;
					font-size: $uni-font-size-sm;
					

					.item{
						background-color: $my-icon-gray-color;
						padding:$uni-spacing-col-sm $uni-spacing-row-lg;
						border-radius: $uni-border-radius-lg;
						margin: $uni-spacing-col-base 0;
					}
					.mactive{
						background-color: $my-icon-bg-color;
						color:$my-icon-color;
					}
				}
			}
		}
	}

</style>
