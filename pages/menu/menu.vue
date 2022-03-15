<template>
	<view class="menu">
		<view class="top-box">
			<image src="https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/youcheng/2.png"></image>
			<view class="search-and-shoucang">
					<view class="search">
						<search-view></search-view>
					</view>

				<view class="shoucang">
					<view class="iconfont icon-shoucang"></view>
					<view>收藏</view>
				</view>
			</view>
		</view>	
		<view class="horizonal-tab">
			<scroll-view scroll-x="true" scroll-with-animation class="scroll-tab">
				<block v-for="(item,index) in ProductCategory" :key="index">
					<view class="scroll-tab-item" @click="getProducts(index,item.id)" :class="{active: index===clickActive}">
						<text>{{item.name}}</text>
					</view>
				</block>
			</scroll-view>
		</view>
		<view class="menu-list">
			<menus :menuByCategory="showData" :menu_id="menuID"></menus>
		</view>
		<no-message-notice v-if="flag"></no-message-notice>
	</view>
</template>

<script>
	import searchView from 'components/search/search.vue'
	import noMessageNtice from 'components/search/search.vue'
	import menus from 'components/no-message-notice/no-message-notice.vue'
	import menuFunction from 'utils/menu.js'
	export default {
		data() {
			return {
				flag:false,
				ProductCategory:[],
				categoryID:2,
				clickActive:0,
				menuByCategory:[],
				page:1,
				menuID:0,
				showData:[]
			}
		},
		components:{
			searchView,
			menus,
			noMessageNtice
		},
		methods: {
			//初始化order数组
			intOrderData(){
			
				if(!this.isHas()){
					this.menuByCategory.push({
						page:1,
						categoryID:this.categoryID,
						flash:false,
						data:[]
					})
				}
			},
			isHas(){
				let res = false
				for(let i=0;this.menuByCategory.length>i;i++){
					if(this.menuByCategory[i].categoryID == this.categoryID )
					{
						res = true
					}
				}
				return res
			},
			//写入订单数据数据
			pushProduct(res){
				for(let i=0;this.menuByCategory.length>i;i++){
					if(this.menuByCategory[i].categoryID == this.categoryID)
						{
							for(let y=0;res.length>y;y++){
								this.menuByCategory[i].data.push(res[y])
							}
						}
				}			
			},
			//获取对应的渲染数据
			getShowData(){
				for(let i=0;this.menuByCategory.length>i;i++){
					if(this.menuByCategory[i].categoryID == this.categoryID){
						this.showData = this.menuByCategory[i].data
					}
				}
			},
			//找出数据里面对应的pages
			findValuePages(){
			
				for(let i=0;this.menuByCategory.length>i;i++){
					if(this.menuByCategory[i].categoryID == this.categoryID)
						{
							return this.menuByCategory[i].page
						}
				}
			},
			//找出对应的flash
			findValueFlash(){
			
				for(let i=0;this.menuByCategory.length>i;i++){
					if(this.menuByCategory[i].categoryID == this.categoryID)
						{
							return this.menuByCategory[i].flash
						}
				}
			},
			//更新page
			updatePages(pages){
				for(let i=0;this.menuByCategory.length>i;i++){
					if(this.menuByCategory[i].categoryID == this.categoryID)
						{
							this.menuByCategory[i].page = pages
						}
				}
			},
			//更新flash
			updateFlash(flash){
				for(let i=0;this.menuByCategory.length>i;i++){
					if(this.menuByCategory[i].categoryID == this.categoryID)
						{
							this.menuByCategory[i].flash = flash
						}
				}
			},
			async getProductCategory(){
				const res = await this.$myrequest({
					url:'/category/all/1',
				})
				this.ProductCategory = res
				this.categoryID = this.ProductCategory[0]['id']
			},
			async getMenuList(page){
				const res = await this.$myrequest({
					url:'/menu/category_by',
					data:{
						'page':page,
						'categoryID':this.categoryID
					}
				})
				console.log(res.length)
				if(res.length == 0){
					this.flag = true
					// this.updateFlash(true)
					console.log('meila')
				
				}else{
					console.log(3)
					this.updatePages(page)
					this.pushProduct(res.data)
					this.getShowData()
				}

			},
			getProducts(index,categoryID){
				this.clickActive = index
				this.categoryID = categoryID
				let ishas = this.isHas()
				console.log(ishas)
				if(ishas){
					this.getShowData()
				}else{
					this.intOrderData()
					this.getMenuList(1)
				}
			}
		},
		onLoad() {
			this.getProductCategory()
			this.intOrderData()
			this.getMenuList(1)
		},
		onHide() {
			
		},
		onReachBottom(){
			
			let flash = this.findValueFlash()
			if(flash){
				return false
			}
			console.log(flash)
			let page = this.findValuePages()
			page++
			this.getMenuList(page)
		}
		// onPullDownRefresh() {
		// 	this.page = 1
		// 	this.menuByCategory = []
		// 	this.flag = false
		// 	setTimeout(()=>{
		// 		this.getMenuList(()=>{
		// 			uni.stopPullDownRefresh()
		// 		})
		// 	},1000)
		// }
	}
</script>

<style lang="scss">
	.menu{

		.top-box{
			position: relative;
			image{
				width:100%;
			}
			.search-and-shoucang{
				position: absolute;
				top:10px;
				left:0;
				display: flex;
				justify-content: space-between;
				font-size: $uni-font-size-sm;
				text-align: center;
				width: 100%;
				.search{
					width: 90%;
					padding-left:$uni-spacing-row-base;
				}
				.shoucang{
					padding-right:$uni-spacing-row-base;
					view{
						white-space: nowrap;
						color:$uni-text-color-inverse;
					}
				}
			}
		}
		.list-nav{
			width: 100%;
			.list-nav-box{
				display: flex;
				white-space: normal;
			}
			.nav-box{
				padding-left:40rpx;
				text{
					color:red;
				}
			}
		}
		.horizonal-tab{
			.scroll-tab{
				white-space: nowrap;
				.scroll-tab-item{
					display: inline-block;
					padding:30rpx 0 30rpx 0;
					margin:0 20rpx 0 20rpx;
				}
				.active{
					// background-color: red;
					border-bottom: 2px solid $my-icon-color;
				}
			}
		}
		.menu-list{
			padding:$uni-spacing-row-lg $uni-spacing-row-base;
		}
	}
</style>
