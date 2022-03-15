<template>
	<view class="search-page">
		<view class="search">
			<view class="wrap">
				<view class="iconfont icon-sousuo"></view>
				<view class="input-wrap">
					<input class="uni-input" 
					focus 
					:placeholder="setting.search_text" 
					placeholder-class="input-placeholder" 
					v-model="inputText" />
				</view>
				<view class="search-but" @click="submit">
					搜索
				</view>
			</view>
		</view>
		<view class="search-items">
			<view class="history">
				<view class="name">
					搜索历史
				</view>
				<view class="items" v-if="history.length">
					<view class="item" v-for="(item,index) in history":key="index" @click="historySubmit(item.info)">
						{{item.info}}
					</view>
				
				</view>
				<view class="no-history" v-if="!history.length">
					<text>-----暂无历史搜索记录-----</text>
					
				</view>
			</view>
			<view class="search-rank">
				<view class="name">
					热门搜索
				</view>
				
				
				<view class="items">
					<view class="item" v-for="(item,index) in product" :key="index" 
					@click="navigate_to('/pages/good/good?id='+item.id+'&category_id='+item.category_id)" v-if="product.length">
						<view class="img">
							<image :src="item.main_img_url"></image>
						</view>
						<view class="good-detail">
							{{item.product_describe}}
						</view>
					</view>
					
					<view class="no-data" v-if="!product.length">
						<text>
							没有找到您要得商品
						</text>
						
					</view>

				</view>
			</view>

		</view>
	</view>


</template>

<script>
	import data from 'utils/data.js'
	export default{
		data(){
			return{
				product:[],
				pages:1,
				inputText:'',
				history:[],
				setting:{}
			}
		},
		methods:{
			historySubmit(text){
				this.inputText = text
				this.setHistorySearch()
				this.getProduct()
			},
			submit(){
					this.setHistorySearch()
					this.history = uni.getStorageSync(data.storageKeyForSearch)
					this.setting = uni.getStorageSync('setting')

					this.getProduct()
			},
			isHas(){
				let search = uni.getStorageSync(data.storageKeyForSearch)
				if(Array.isArray(search)){
					for(let i=0;search.length>i;i++){
						if(search[i].info == this.inputText){
							return true
						}
					}
				}
				
			},
			intSearchStorage(){
				let SearchStorage = []
				SearchStorage.push({
					info:''
				})
			},
			//写入历史记录数据
			insertSearchStorage(){
				if(this.inputText==''||this.isHas()){
					return false
				}
				let arr=[]
				let search = uni.getStorageSync(data.storageKeyForSearch)
				if(!(search instanceof Array)){
				    search=[search];
				}
				if(search.length>14){
					search.splice(14,1)
				}

				arr.push({
					info:this.inputText
				})
				for(let i=0;search.length>i;i++){
					if(search[i]!=''){
						arr.push(search[i])
					}
				}
				uni.setStorageSync(data.storageKeyForSearch,arr)
				
			},
			setHistorySearch(){
				if(!this.isHas()){
					this.insertSearchStorage()
				}			
			},
			async getProduct(){
				this.product = []
				const res = await this.$myrequest({
					url:'/product/search',
					data:{
						data:this.inputText,
						pages:this.pages
					}
				})
				this.product = res.data
			},
			navigate_to(url){
				uni.navigateTo({
					url
				})
			},
		},
		onLoad() {
			this.getProduct()
		},
		onShow() {
			this.setting = uni.getStorageSync('setting')
			this.history = uni.getStorageSync(data.storageKeyForSearch)
		}
	}
</script>

<style lang="scss">

	page{
		background-color: $uni-bg-color;
		.input-placeholder{
			font-size: $uni-font-size-sm;
			text-align: center;
		}
		.no-data{
			width: 100%;
			text-align: center;
			padding-top:80rpx;
			color: $my-icon-gray-color;
		}
		.search-page{
			.search{
				display: flex;
				justify-content: center;
				height: 60rpx;
				line-height: 60rpx;
				margin: $uni-spacing-col-lg 0;
				.wrap{
					width: 90%;
					display: flex;
					.input-wrap{
						width: 75%;
						align-self: center;
						background-color: $uni-bg-color-grey;
						border-top-right-radius: 2em;
						border-bottom-right-radius: 2em;
						input{
							height: 60rpx;
							font-size: $uni-font-size-base;
						}
					}
					.search-but{
						width: 15%;
						text-align: right;
					}
					.icon-sousuo{
						width: 10%;
						text-align: center;
						background-color: $uni-bg-color-grey;
						border-top-left-radius: 2em;
						border-bottom-left-radius: 2em;
					}
				}
			}
			.search-items{
				margin: 0 $uni-spacing-row-base;
				.history{
					.no-history{
						text-align: center;
						// margin: 0 auto;
						color:$my-icon-gray-color;
						font-size: $uni-font-size-sm;
					}
					.name{
						margin: $uni-spacing-col-lg 0;
					}
					.items{
						display: flex;
						flex-wrap: wrap;
						.item{
							padding: $uni-spacing-col-sm $uni-spacing-col-lg;
							background-color: $uni-bg-color-grey;
							border-radius: 2em;
							font-size: $uni-font-size-sm;
							margin: $uni-spacing-col-sm $uni-spacing-row-sm;
						}
					}
				}
				
				.search-rank{
					.name{
						margin: $uni-spacing-col-lg 0;
					}
					.items{
						.item{
							display: flex;
							height: 130rpx;
							align-items: center;
							// background-color: $uni-bg-color-grey;
							// border-bottom: 1rpx solid $my-icon-gray-color;
							margin:$uni-spacing-col-sm 0;
							.img{
								width: 120rpx;
								height: 120rpx;
								image{
									border-radius: $uni-border-radius-lg;
									width: 120rpx;
									height: 120rpx;
								}
							}
							.good-detail{
								padding-left: $uni-spacing-row-base;
							}
						}
					}
				}

			}
		}


	}
</style>
