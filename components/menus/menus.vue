<template>
	<view class="items">
		<view class="item" v-for="(item,index) in menuByCategory" :key="index" v-if="item.id!=menu_id" @click="jumpMenuDetail(item.id,item.category_id)">
			<image :src="item.menu_img_or_vedio_url">
			<view class="menu-name">{{item.menu_name}}</view>
			<view class="detail">
				<text>{{item.hard}}</text><text>|</text><text>{{item.cooking_time}}分钟</text>
			</view>
		</view>

	</view>
					
</template>

<script>

	export default {
		props:['menuByCategory','menu_id'],
		data() {
			return {
				
			}
		},
		components:{
			
		},
		methods: {
			jumpMenuDetail(id,category_id){
				uni.navigateTo({
				    url: '/pages/menu/menu-detail?id='+id+'&category_id='+category_id
				});
			}
		}
	}
</script>

<style lang="scss">
	.items{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 100%;
		.item{
			margin-bottom: $uni-spacing-col-base;
			width: 49%;
			padding-bottom: $uni-spacing-col-lg;
			background: white;
			border-radius: $uni-border-radius-base;
			overflow: hidden;
			image{
				width: 100%;
				height: 300rpx;
			}
			.menu-name{
				line-height: 40rpx;
				padding:$uni-spacing-col-sm $uni-spacing-row-base $uni-spacing-col-sm $uni-spacing-row-base;
			}
			.detail{
				font-size: $uni-font-size-sm;
				text{
					padding:0 $uni-spacing-row-sm 0 $uni-spacing-row-base;
					color:$uni-text-color-grey;
				}
			}
		}
	}
</style>
