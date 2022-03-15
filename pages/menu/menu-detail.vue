<template>
	<view class="menu-detail">
		<view class="img">
			<image :src="menuOneData.menu_img_or_vedio_url"></image>
			<text class="iconfont icon-shoucang" @click="shouCang"></text>
		</view>
		<view class="title">
			<text>{{menuOneData.menu_name}}</text>
		</view>
		<view class="wrap-one wrap">

			<view class="tags">
				
				<view v-for="(item,index) in menuOneData.tags" :key="index">{{item.tag_name}}</view>		
			</view>

			<view class="info">
				<uni-grid :column="2"  :square="false">
				    <uni-grid-item v-for="(item,index) in menuOneData['menu_items']" :key="index">
				        <text class="text">{{item}}</text>
				    </uni-grid-item>
				</uni-grid>
			</view>	
				

			<view class="food-list">
				<view class="sub-title">
					<text>主料</text>
				</view>
				<uni-grid :column="2"  :square="false">
					<uni-grid-item v-for="(item,index) in menuOneData.menu_find_product" :key="index" v-if="item.type==1" >
						<view class="food-list-item">
							<view class="left">
							
								<view>
									<text>{{item.product_one.name}}</text>
									<!-- <view>{{item.weight}}g</view> -->
								</view>
							</view>
							<view class="right">
								<view class="add-cart"
								@click="add(item.product_one)">
									<text class="icon-tianjia iconfont"></text>
								</view>
							</view>
						</view>


					</uni-grid-item>

				</uni-grid>
				
				
				<view class="sub-title">
					<text>副料</text>
				</view>
				<uni-grid :column="2"  :square="false">
					<uni-grid-item v-for="(item,index) in menuOneData.menu_find_product" :key="index" v-if="item.type==2">
						<view class="food-list-item">
							<view class="left">
							
								<view>
									<text>{{item.product_one.name}}</text>
									<!-- <view>{{item.weight}}g</view> -->
								</view>
							</view>
							<view class="right">
								<view class="add-cart" @click="add(item.product_one)">
									<text class="icon-tianjia iconfont"></text>
								</view>
							</view>
						</view>
				
				
					</uni-grid-item>	
				</uni-grid>
			</view>

			<view class="cooking-step">
				<view class="sub-title">
					<text>烹饪步骤</text>
				</view>
				<view class="step-box" v-for="(item,index) in menuOneData.imgs" :key="index">
					<view class="img">
						<image :src="item.img_url.url">
					</view>
					<view class="detail">
						<text>
							{{item.img_url.describe}}
						</text>
					</view>
				</view>

			</view>
		</view>
<!-- 		<view class="title recommend">
			<text>相关推荐</text>
		</view>
		<view class="recommend-menus">
			<menus :menuByCategory = "menuByCategory" :menu_id="id"></menus>
		</view> -->
		<view class="buttom-img">
			<image src="https://youguan-1257044613.cos.ap-guangzhou.myqcloud.com/button-img.png" mode="widthFix"></image>
		</view>
		<view class="cart-button" @click="jumpTo">
			<image src="https://youguan-1257044613.cos.ap-guangzhou.myqcloud.com/cart-for-menu.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import menus from 'components/menus/menus.vue'
	import data from 'utils/data.js'
	import cart from '../../utils/cart.js'
	export default {
		data(){
			return{
				id:Number,
				category_id:Number,
				page:1,
				menuOneData:[],
				menuByCategory:[],
			}
		},
	    components: {
			uniGrid,
			uniGridItem,
			menus,
			
		},
		methods:{
			jumpTo(){
				uni.switchTab({
					url:"/pages/cart/cart"
				})
			},
			add(item){
				cart.add(item,1)
			
				uni.showToast({
					title:'加入购物车成功'
				})
			},
			//判断收藏夹是否有该数据
			isHas(){
				let shou_cang = uni.getStorageSync(data.storageKeyForSouCang)
				if(Array.isArray(shou_cang)){
					if(shou_cang.length!=0){
						for(let i=0; shou_cang.length>i;i++){
							if(shou_cang[i].id == this.menuOneData.id){
								return true
							}else{
								return false
							}
						}
					}
				}
			},
			//收藏夹
			shouCang(){
				if(this.isHas()){
					uni.showToast({
						title:'收藏夹已经有该菜谱了',
						icon:'none'
					})
					return false
				}
				
				let arr = []
				arr.push(this.menuOneData)
				let shou_cang = uni.getStorageSync(data.storageKeyForSouCang)
				if(Array.isArray(shou_cang)){
					if(shou_cang.length!=0){
						for(let i=0; shou_cang.length>i;i++){
							arr.push(shou_cang[i])
						}
					}
				}
				uni.setStorageSync(data.storageKeyForSouCang,arr)
				console.log(arr)
				
			},
			async getMenuOne(callBack){
				
				const res = await this.$myrequest({
					url:'/menu',
					data:{
						'id':this.id
					}
				})
				this.menuOneData =res[0]
				callBack && callBack()
			},
			// async getMenuList(callBack){
				
			// 	const res = await this.$myrequest({
			// 		url:'/menu/category_by',
			// 		data:{
			// 			'page':this.page,
			// 			'categoryID':this.category_id
			// 		}
			// 	})
				
			// 	this.menuByCategory =[...this.menuByCategory, ...res.data]
			// 	callBack && callBack()
			// },
		},
		onLoad(options){
			this.id = options.id
			this.category_id = options.category_id
			this.getMenuOne()
			// this.getMenuList()
		}
	}
</script>

<style lang="scss">
	.menu-detail{
		.cart-button{
			position: fixed;
			left: 50rpx;
			bottom: 200rpx;
			z-index: 9999;

			image{
				width: 60rpx;
				height: 60rpx;
			}
		}
		.wrap{
			background: $uni-bg-color;
			border-radius: $uni-border-radius-lg;
			margin: 0 $uni-spacing-row-base;
			padding: 0 $uni-spacing-row-base $uni-spacing-col-base $uni-spacing-row-base;
		}
		.info{
				margin-top:$uni-spacing-col-base;
				text-align: center;
					.text{
						line-height: 90rpx;
					}
		}

		.img{
			position: relative;
			.icon-shoucang{
				font-size:40rpx;
				position: absolute;
				top:20rpx;
				right: 20rpx;
			}
			image{
				width: 100%;
			}
		}
		.title{
			text-align: center;
			font-weight: $my-font-werght-blod;
		}
		.wrap-one{
			.tags{
				display: flex;
				flex-wrap: wrap;
				padding-top:$uni-spacing-col-base;
				view{
					padding: $uni-spacing-row-sm $uni-spacing-col-sm ;
					border-radius: $uni-border-radius-base;
					background: $my-icon-color;
					color:$uni-text-color-inverse;
					font-size: $uni-font-size-sm;
					margin: 0 $uni-spacing-col-sm $uni-spacing-col-sm 0 ;
				}
			}
			.food-list{
				.sub-title{
					padding: $uni-spacing-col-lg 0;
					font-weight: $my-font-werght-blod;
				}
				.food-list-item{
					display: flex;
					justify-content: space-between;
					padding: $uni-spacing-col-sm $uni-spacing-row-sm;
					.left{
						width:80%;
						text{
							line-height: 40rpx;
						}

					}
					.right{
						width: 20%;
						text-align: right;
						line-height: 80rpx;
						.add-cart{
							.icon-tianjia{
								font-size: 40rpx;
								color:$my-icon-color;
							}
						}
					}
				}

			}
			.cooking-step{
				.sub-title{
					font-weight: $my-font-werght-blod;
					padding: $uni-spacing-col-lg 0;
				}
				.step-box{
					.img{
						image{
							width:100%;
						}
					}
					.detail{
						margin: 0 0 $uni-spacing-col-lg 0;
						text{
							line-height: 60rpx;
						}

					}
				}

			}

		}
		.recommend{
			text-align: left;
		}
		.recommend-menus{
			margin: $uni-spacing-col-base $uni-spacing-row-base;
		}
		.buttom-img{
			image{
				width: 100%;
			}
			text-align: center;
			margin-top: $uni-spacing-col-lg;
		}

	}
</style>
