<template>
	<view class="reviews-detail">
		<view class="tag-and-reviews-point">
			<view class="good-reviews">
				<view class="product-lacotion">当前商品</view>
				<view class="point">商品好评度{{reviewsDetail.average_score}}</view>
				
			</view>
			<view class="tag">
				<view>
					<text>全部</text>
					<text class="count">{{reviewsDetail.member}}+</text>
				</view>
				<view v-for="(item,index) in reviewsDetail.tag" :key="index">
					{{index}}{{item}}+
				</view>
			</view>
		</view>
		<view class="items">
			<view class="item" v-for="(item,index) in reviewsDetail.reviews" :key="index">
				<view class="top">
					<view class="user_info">
						<view>
							<image :src="item.reviews_info.user_info.header_img" mode=""></image>
						</view>
						<view class="nickname">
							<text>{{item.reviews_info.user_info.nickname}}</text>
							
						</view>
					</view>

					<view class="time">
						<text>{{item.reviews_info.create_time}}</text>			
					</view>
				</view>
				<view class="rate">
					<uni-rate :size="18" :value="item.score" :readonly="true" :margin="10" class=""/>
				</view>

				<!-- <view class="point"> -->
					
					<!-- <view class="line">|</view> -->
				<!-- 	<view class="collocation">
						<text>紫色</text>
						<text>128g</text>
					</view> -->
				<!-- </view> -->
				<view class="content-wrap">
					{{item.reviews_info.review_content}}
				</view>
				<view class="imgs">
					<view v-for="(itemImg,indexImg) in item.reviews_info.review_imgs" :key="indexImg" @click="previewImg(item.reviews_info.review_imgs,indexImg)">
						<image :src="itemImg" mode="widthFix"></image>
					</view>
<!-- 					<view>
						<image src="https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/youcheng/4.png" mode="widthFix"></image>
					</view>
					<view>
						<image src="https://zs-1256645015.cos.ap-guangzhou.myqcloud.com/youcheng/4.pitemImgng" mode="widthFix"></image>
					</view> -->
				</view>
				
				<view class="content-wrap shagnjia" v-if="item.reviews_info.reply != null">
					{{item.reviews_info.reply}}
				</view>
			
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				reviewsDetail:[],
				data:[]
			}
		},
		methods:{
			previewImg(urls,index){
				let current = index
				uni.previewImage({
					current,
					urls
				})
			},
			async getReviews(id,callBack){
				
				const res = await this.$myrequest({
					url:'/reviews',
					data:{
						'id':id
					}
				})
				this.reviewsDetail = res
				callBack && callBack()
			},
		},
		onLoad(options) {
			console.log(options.id)
			this.getReviews(options.id)
			// this.data = uni.getStorageSync('reviews_data'+options.id);
		}
	}
</script>

<style lang="scss">
	.reviews-detail{
		.tag-and-reviews-point{
			background-color: $uni-bg-color;
			font-size: $uni-font-size-sm;
			border-radius: $uni-border-radius-lg;
			margin: $uni-spacing-col-lg 0;
			padding:$uni-spacing-col-lg $uni-spacing-col-base;
			.good-reviews{
				display: flex;
				justify-content: space-between;
				padding-bottom: $uni-spacing-col-base;
				.product-lacotion{
					font-size: $uni-font-size-base;
				}
				.point{
					color:$uni-text-color-grey;
				}
			}
			.tag{
				display: flex;
				flex-wrap: wrap;
				view{
					background-color: $my-icon-color;
					border-radius: 2em;
					margin:$uni-spacing-col-base $uni-spacing-row-base 0 0;
					padding: 10rpx $uni-spacing-row-base;
					font-size: $uni-font-size-sm;
					.count{
						padding-left: $uni-spacing-row-sm;
					}
				}
			}
		}
		.items{
			border-radius: $uni-border-radius-lg;
			margin-bottom: $uni-spacing-col-lg;
			.item{
				background-color: $uni-bg-color;
				margin-top: $uni-spacing-col-lg;
				padding: $uni-spacing-col-lg $uni-spacing-row-base;
				.top{
					display: flex;
					justify-content: space-between;
					text{
						line-height: 120rpx;
					}
					image{
						width: 120rpx;
						height: 120rpx;
						margin-right: $uni-spacing-col-base;
					}
					.user_info{
						display: flex;
						padding-left: $uni-spacing-row-base;

						.nickname{
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
						}
					}
					.time{
						overflow: hidden;
						white-space: nowrap;
					}
				}
				.rate{
					padding-top: $uni-font-size-lg;
				}
				.point{
					display: flex;
					align-items: center;
					margin-top: $uni-spacing-col-lg;
					view{
						padding-right: $uni-spacing-col-lg;
					}
					.line{
						color:$uni-text-color-grey;
						height: 20rpx;
						overflow: hidden;
					}
					.collocation{
						color:$uni-text-color-grey;
						font-size: $uni-font-size-sm;
					}
				}
				.content-wrap{
					margin-top: $uni-spacing-col-lg;
					line-height: 40rpx;
					font-size: $uni-font-size-base;
					// letter-spacing:2rpx;
				}
				.imgs{
					display: flex;
					flex-wrap: wrap;
					// justify-content: space-around;
					margin-top: $uni-spacing-col-lg;
					view{
						width: 33.3%;
						overflow: hidden;
						image{
							padding:0 $uni-spacing-row-sm;
							width: 100%;
						}
					}

				}
				.shagnjia{
					border-top:1px solid $uni-border-color;
					padding: $uni-spacing-col-lg 0 0 0;
					margin-top: 50rpx;
				}
			}
		}
	}
</style>
