<template>
	<view>
		<view class="address-box">
			<view class="item" v-for="(item,index) in addressInfo" :key="index" >
				<view class="left" @click="getAddress(index)">
					<view class="address">
						{{item.nameByChooseAddress}}--{{item.detailInfo}}
					</view>
					<view class="link">
						<text>{{item.userName}} {{item.telNumber}}</text>
					</view>
				</view>
				<view class="center-border">
					
				</view>
				<view class="right" @click="edit_address(index)">
					<uni-icons type="gear" size="20" color="#999"></uni-icons>
				</view>

			</view>

			<view class="but">
				<view>
					<button type="default" class="subimit" @click="add_address('/pages/address/address-add')">新增收货地址</button>
				</view>
			</view>
		</view>
		<view class="no-message" v-if="!addressInfo.length">
			<image src="https://youguan-1257044613.cos.ap-guangzhou.myqcloud.com/empty-address.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import data from 'utils/data.js'
	export default{
		data(){
			return{
				addressInfo:[]
			}
		},
		methods:{
			add_address(url){
				uni.navigateTo({
					url
				})
			},
			edit_address(index){
				let url = '/pages/address/address-edit?index='+index
				uni.navigateTo({
					url
				})
			},
			getAddress(index){
				let arr = []
				arr.push(this.addressInfo[index])
				for(let i=0;this.addressInfo.length>i;i++){
					if(i!=index){
						arr.push(this.addressInfo[i])
					}
				}
				uni.setStorageSync(data.storageKeyForAddress,arr)
				uni.navigateBack({
					delta:1
				})
			}
		},
		onShow() {
			this.addressInfo = uni.getStorageSync(data.storageKeyForAddress)
		}
	}
</script>

<style lang="scss">
	.no-message{
		
		text-align: center;
		image{
			margin-top: 200rpx;
			width: 20%;
		}
	}
	.address-box{

		.item{
			background-color: $uni-bg-color;
			display: flex;
			justify-content: space-between;
			padding:$uni-spacing-col-lg $uni-spacing-row-base;
			margin: 0 0 1rpx 0;
			.center-border{
				margin-top: 20rpx;
				height:50rpx;
				border-right:1px solid $uni-border-color;
			}
			.left{
				width: 85%;
				// border-right:1px solid $uni-border-color;
				.address{
					font-size: $uni-font-size-base;
					font-weight: $my-font-werght-blod;
					line-height: 70rpx;
				}
				.link{
					color:$uni-text-color-grey;
					line-height: 30rpx;
					font-size: $uni-font-size-sm;
				}
			}
			.right{
				line-height: 90rpx;
				text-align: center;
				width: 15%;
			}

		}
		.but{
			position: fixed;
			bottom: 0;
			left:0;
			width: 100%;
			view{
				width: 100%;
				button{
					margin:$uni-spacing-row-lg;
					background-color: $my-icon-color;
				}
			}

		}
	}
</style>
