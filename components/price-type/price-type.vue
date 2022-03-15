<template>
	<view class="price-type">
		<view class="wrap">
			<text class="iconfont icon-renminbi"
			 :style="{ 'font-size': iconRenminbiFontSize + 'rpx','color' : iconRenminbicolor}"
			 :color="iconRenminbicolor"
			 ></text>
			<text 
			:style="{ 'font-size': priceFontSize + 'rpx','color' : iconRenminbicolor }"
			>{{price}}</text>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			iconRenminbiFontSize: {
				type: [Number, String],
				default: 20
			},
			priceFontSize:{
				type: [Number, String],
				default: 30
			},
			iconRenminbicolor:{
				type: String,
				default: '#dd524d'
			},
			price:0
		}
	}
</script>

<style lang="scss">
	.price-type{
		font-weight: $my-font-werght-blod;
	}
</style>
