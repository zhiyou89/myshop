<template>
	<view class="goods_navbar">
		<view class="item">
			<view class="title" v-for="(item, index) in title" :key="index" @click="navBar(index)">
				<view class="bigger_title" :class="{'bigger-active':item.id==navID}">
					{{item.big}}
				</view>
				
				<view class="smaller_title" :class="{'smaller-active':item.id==navID}">
					{{item.small}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				navID:1,
				title:[
					{
						id:1,
						big:'即时配送',
						small:'市内好货'
					},
					{
						id:2,
						big:'隔天配送',
						small:'物美价廉'
					},
					{
						id:3,
						big:'产地直发',
						small:'精选优选'
					}
				],
			}
		},
		created(){
			
		},
		methods:{
			navBar(index){
				this.navID = index+1;
				this.$emit("navBar",this.navID);
			}
		}
	}
</script>

<style lang="scss">
	.goods_navbar{
		.item{
			display: flex;
			justify-content: space-between;
			// background-color: $uni-bg-color;
			text-align: center;
			.bigger-active{
				color:$my-icon-color;
			}
			.smaller-active{
				color:white;
				padding: 5rpx 10rpx;
				background-color: $my-icon-color;
				border-radius: 2em;
			}
			.bigger_title{
				font-size: $uni-font-size-base;
			}
			.smaller_title{
				font-size: 16rpx;
				margin-top: 10rpx;
			}
		}
	}
</style>
