<template>
	<view class="swiper-box">
		<swiper class="swiper"
		 interval="2000" 
		 autoplay
		 indicator-dots="true" 
		 indicator-color="white" 
		 indicator-active-color="#1afa29" 
		 circular
		 easing-function="easeInOutCubic"
		 :style="{'height':swiperHeight+'rpx'}"
		 >
			<swiper-item v-for="(item,index) in items" :key="index"  @click="navigate_to('/pages/good/good?id='+item.id+'&category_id='+item.category_id)">
					<image :src="item.img_url.url">
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props:['items','swiperHeight'],
		data() {
			return {
				
			}
		},
		methods: {
			navigate_to(url){
				uni.navigateTo({
					url
				})
			},
		}
	}
</script>

<style lang="scss">
	.swiper-box{
		swiper{
			width: 100%;
			swiper-item{
				image{
					width: 100%;
					height: 100%;
				}
			}

		}
	}

</style>
