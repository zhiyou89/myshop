<template>
	<view class="about-us">
		<view class="top-box">
<!-- 			<view class="nav-top">
					<navTop :height="height" :navLeft="navLeft" :navTop="navTop" :pageNameColor="pageNameColor">
			
					</navTop>
					<view class="search-box">
						<search-view :searchText="searchText"></search-view>
					</view>
			</view> -->
			<!-- <view class="user-top" :style="{'padding-top':height+navTop+'px'}"> -->
			<view class="user-top">
				<view class="user-box">
					<view class="img">
						<image :src="userInfo.header_img"></image>
					</view>
					<view v-if="wxUserUpdated">{{userInfo.nickname}}</view>
					<view class="">
						<button open-type="getUserInfo" type="" size="mini" @getuserinfo = "getWxInfo" v-if="!wxUserUpdated">
							获取微信头像和昵称
						</button>
					</view>

				</view>
				

			</view>
		</view>

		<view class="credit">
			<view class="">
				<view class="count">
					{{parseFloat(userInfo.money)}}
				</view>
				<view class="">
					余额
				</view>
			</view>
			<view class="">
				<view class="count">
					{{userInfo.credit}}
				</view>
				<view class="">
					积分
				</view>
			</view>
			<view class="">
				<view class="count">
					0
				</view>
				<view class="">
					优惠券
				</view>
			</view>
		</view>
		<view class="my-order">
			<view class="top">
				<view class="">
					我的订单
				</view>
				<view class="all-order" @click="navigate_to('/pages/order/order?status=10')">
					<text>全部的订单</text>
					<text class="iconfont icon-you"></text>
				</view>
			</view>
			<view class="bottom">
				<view class="my-item" v-for="(item, index) in orderStatus" :key="index" @click="showOrderInfoByStatus(item.id)">
					<image :src="item.url" mode="widthFix"></image>
					<view class="name">
						{{item.title}}
					</view>
				</view>

			</view>

		</view>
		<view class="function-box">
			<view class="item" @click="navigate_to('/pages/address/address')">
				<view class="">
					<text class="iconfont icon-shouhuodizhi"></text>
					<text>收货地址</text>
				</view>
				<view class="">
					<uni-icons type="arrowright" size="15" class="icon-you" color="#999"></uni-icons>
				</view>
			</view>
			<view class="item" @click="navigate_to('/pages/menu/menu-collection-list')">
				<view class="">
					<text class="iconfont icon-shoucang1"></text>
					<text>收藏夹</text>
				</view>
				<view class="">
					<uni-icons type="arrowright" size="15" class="icon-you" color="#999"></uni-icons>
				</view>
			</view>

			<view class="item" @tap="handleShowPoster">
				<view class="">
					<text class="iconfont icon-haoyou2"></text>
					<text>推荐好友</text>
				</view>
				<view class="">
					<uni-icons type="arrowright" size="15" class="icon-you" color="#999"></uni-icons>
				</view>
			</view>
			<view class="item" @click="navigate_to('/pages/set-up/set-up')">
				<view class="" >
					<text class="iconfont icon-shezhi"></text>
					<text>设置</text>
				</view>
				<view class="">
					<uni-icons type="arrowright" size="15" class="icon-you" color="#999"></uni-icons>
				</view>
			</view>
<!-- 			<view class="item" @click="navigate_to('/pages/user/user-info')">
				<view class="" >
					<text class="iconfont icon-shezhi"></text>
					<text>个人信息</text>
				</view>
				<view class="">
					<text class="iconfont icon-you"></text>
				</view>
			</view> -->
			<view class="item contact">
				<button type="default" open-type="contact">
					<text class="iconfont icon-kefu"></text>
					<text>联系客服</text>
				</button>
				<view class="">
					<uni-icons type="arrowright" size="15" class="icon-you" color="#999"></uni-icons>
				</view>
			</view>
		</view>
		<view class="">
			
		</view>
		<hchPoster ref="hchPoster" @cancel="canvasCancel" :simpleFlag="true" 
		:posterBgFlag="true" :canvasAttr.sync="posterSimpleData" class="hchPoster-box"/>
	</view>
	
	
</template>

<script>
	import hchPoster from "components/hch-poster/hch-poster.vue"
	import navTop from 'components/nav-top/nav-top'
	import order from 'utils/order.js'
	export default {
		data() {
			return {
				navTop:0,
				height:0,
				navLeft:0,
				right:0,
				statusID:1,
				wxUserUpdated:false,
				userInfo:{},
				posterSimpleData:{//简单版的海报
				  marginLR: 40,
				  marginTB: 40,
				  radius: 0.05,
				  title: ["夏天的风","带着这清香的果橙味"],
				  titleFontSize: 16,
				  titleLineHeight: 25,
				  posterCodeUrl: "https://huangchunhongzz.gitee.io/imgs/poster/code.png",
				  codeWidth: 0.2,
				  codeRatio: 1,
				  codeRadius: 0.5,
				  codeMT: 50,
				  posterBgUrl:'https://huangchunhongzz.gitee.io/imgs/poster/poster_bg_3.png',
				  codeML:140,
				  desTextMT:70,
				  desTextML:240,
				},
				orderStatus:[
					{
						id:1,
						title:'待付款',
						url:'https://youguan-1257044613.cos.ap-guangzhou.myqcloud.com/icon/dafukuan.png'
					},
					{
						id:2,
						title:'已付款',
						url:'https://youguan-1257044613.cos.ap-guangzhou.myqcloud.com/icon/daifahuo.png'
					},
					{
						id:3,
						title:'已完成',
						url:'https://youguan-1257044613.cos.ap-guangzhou.myqcloud.com/icon/daipingjia.png'
					},
					{
						id:4,
						title:'退款/售后',
						url:'https://youguan-1257044613.cos.ap-guangzhou.myqcloud.com/icon/shouhou1.png'
					}

				]
			}
		},
		components:{
			navTop,
			hchPoster
		},
		methods: {
			/**
			 * @description: 生成海报
			 * @param {type} 
			 * @return {type} 
			 * @author: hch
			 */
			handleShowPoster() {
			  // this.canvasFlag = false
			  this.$refs.hchPoster.posterShow()

			},
			/**
			 * @description: 取消海报
			 * @param {type} 
			 * @return {type} 
			 * @author: hch
			 */
			canvasCancel(val) {
			  // this.canvasFlag = val
			},

			 getWxInfo(){

				 if(this.wxUserUpdated){
					 return false
				 }
				let that = this
				uni.getUserInfo({
				  provider: 'weixin',
				  success: (infoRes) => {
				  	let header_img = infoRes.userInfo.avatarUrl
				  	let nickname = infoRes.userInfo.nickName
					let resInfo = this.updateUserInfo(header_img, nickname)
					if(resInfo){
							this.userInfo.header_img = header_img
							this.userInfo.nickname = nickname
							this.wxUserUpdated = true
					}else{
						uni.showToast({
							icon:'none',
							title:'数据非法'
						})
					}
				  },
				  fail: (res) => {
					uni.showToast({
						icon:'none',
						title:'获取微信数据失败'
					})
				  }
				 //  success: function (infoRes) {
					// // console.log(infoRes);
					// let header_img = infoRes.userInfo.avatarUrl
					// let nickname = infoRes.userInfo.nickName


					// // if(res){
					// // 	this.userInfo.header_img = header_img
					// // 	this.userInfo.nickname = nickname
					// // }else{
					// // 	uni.showToast({
					// // 		icon:'none',
					// // 		title:'获取微信数据失败'
					// // 	})
					// // }
				 //  }
				})
			},
			
			async updateUserInfo(header_img,nickname){

				const res = await this.$myrequest({
					url:'/edit_user_info',
					data:{
						header_img:header_img,
						nickname:nickname
					}
				})
				return res;

			},
			async getUserInfo(){

				order.checkTokenOrGetToken()
				const res = await this.$myrequest({
					url:'/user_info'
				})

				
				this.userInfo = res
				if(this.userInfo.update_time != "1970-01-01 08:00:00"){
					this.wxUserUpdated = true
				}
			},
			showOrderInfoByStatus(statusID){
				this.statusID = statusID
				let url = '/pages/order/order?status='+statusID
				this.navigate_to(url)
			},
			navigate_to(url){
				uni.navigateTo({
					url
				})
			}
		},
		onLoad() {
			this.getUserInfo()
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			const { windowWidth } = uni.getSystemInfoSync();
			this.navTop = menuButtonInfo.top
			this.right = menuButtonInfo.right
			this.navLeft = windowWidth - this.right
			this.height = menuButtonInfo.height
		},
		onshow(){
			order.checkTokenOrGetToken()
		},
		onHide() {
			
		}
	}
</script>

<style lang="scss">
	.about-us{
		.top-box{
			background-color: $my-icon-color;
			padding-top: $uni-spacing-col-lg;
			.nav-top{
				position: fixed;
			}
		}
		.user-top{
			padding-left: $uni-spacing-row-lg;
			.user-box{
				button::after{
					border:none;
				}
				button{
					// background-color: $my-icon-color;
					font-size: $uni-font-size-sm;
				}
				text-align: center;
				view{
					padding: $uni-spacing-col-sm 0;
				}
				image{
					width: 180rpx;
					height: 180rpx;
					border-radius: 50%;
				}
			}


		}
		.credit{
			font-size: $uni-font-size-sm;
			color:$uni-text-color-grey;
			text-align:center;
			display: flex;
			justify-content: space-around;
		}
		.my-order,.credit,.function-box{
			margin:$uni-spacing-col-lg $uni-spacing-row-base;
			padding:$uni-spacing-col-lg $uni-spacing-row-base;
			background-color: $uni-bg-color;
			border-radius: $uni-border-radius-lg;
			.top{
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid $uni-bg-color-grey;
				.all-order{
					font-size: $uni-font-size-sm;
					color:$uni-text-color-grey;
				}
				.icon-you{
					font-size: $uni-font-size-sm;
					padding-left: $uni-spacing-row-sm;
				}
			}
			.bottom{
				display: flex;
				justify-content: space-between;
				text-align: center;
				margin-top: $uni-spacing-col-lg;
				image{
					width: 50rpx;
					height: 50rpx;
				}
				.name{
					font-size: $uni-font-size-sm;
				}
			}
		}
		.function-box{
			.item{
				font-size: $uni-font-size-sm;
				display: flex;
				justify-content: space-between;
				border-bottom: 2rpx solid $uni-bg-color-grey;
				padding: $uni-spacing-col-lg 0;
				.iconfont{
					font-size: $uni-font-size-sm;
					padding-right: $uni-spacing-row-sm;
					color:$my-icon-color;
				}
				button{
					width: 100%;
					padding: 0;
					margin: 0;
					text-align: left;
					line-height: 30rpx;
					background-color: white;
					font-size: $uni-font-size-sm;
				}
				button::after{
					border:none;
				}
			}
			.contact{
				border-bottom:none;
			}
		}
		.hchPoster-box{
		
			/* 按钮去掉边框 */
			button::after {
			  border: none;
			}
			button {
			  margin-left: 0;
			  margin-right: 0;
			  padding-left: 0;
			  padding-right: 0;
			  line-height: 1;
			  color: #1c1c1c;
			  font-size: 28rpx;
			  background: none;
			}
			.button-hover {
			  color: #1c1c1c;
			  background: none;
			}
			.poster-img{
			  width: 40%;
			}
			/*每个页面公共css */
			.content {
			  text-align: center;
			  height: 100%;
			}
			.share-btn {
			  padding: 30rpx 60rpx;
			  background-color: $uni-btn-color;
			  color: $uni-text-color-inverse;
			}
			.share-pro {
			  display: flex;
			  align-items: center;
			  justify-content: flex-end;
			  flex-direction: column;
			  z-index: 5;
			  line-height: 1;
			  box-sizing: border-box;
			  .share-pro-mask {
			    width: 100%;
			    height: 100%;
			    position: fixed;
			    top: 0;
			    right: 0;
			    bottom: 0;
			    left: 0;
			    background: rgba(0, 0, 0, 0.5);
			  }
			  .share-pro-dialog {
			    width: 750rpx;
			    height: 310rpx;
			    overflow: hidden;
			    background-color: #fff;
			    border-radius: 24rpx 24rpx 0px 0px;
			    position: relative;
			    box-sizing: border-box;
			    position: fixed;
			    bottom: 0;
			    .close-btn {
			      padding: 20rpx 15rpx;
			      position: absolute;
			      top: 0rpx;
			      right: 29rpx;
			    }
			    .share-pro-title {
			      font-size: 28rpx;
			      color: #1c1c1c;
			      padding: 28rpx 41rpx;
			      background-color: #f7f7f7;
			    }
			
			    .share-pro-body {
			      display: flex;
			      flex-direction: row;
			      justify-content: space-around;
			      font-size: 28rpx;
			      color: #1c1c1c;
			      .share-item {
			        display: flex;
			        flex-direction: column;
			        justify-content: center;
			        justify-content: space-around;
			        .share-icon {
			          text-align: center;
			          font-size: 70rpx;
			          margin-top: 39rpx;
			          margin-bottom: 16rpx;
			          color: #42ae3c;
			        }
			        &:nth-child(2) {
			          .share-icon {
			            color: #ff5f33;
			          }
			        }
			      }
			    }
			  }
			
			  /* 显示或关闭内容时动画 */
			
			  .open {
			    transition: all 0.3s ease-out;
			    transform: translateY(0);
			  }
			
			  .close {
			    transition: all 0.3s ease-out;
			    transform: translateY(310rpx);
			  }
			}
			.canvas {
			  position: fixed !important;
			  top: 50rpx !important;
			  left: 0 !important;
			  display: block !important;
			  width: 100% !important;
			  height: 100% !important;
			  z-index: 10;
			}
		}
		
		
			
	}

</style>
