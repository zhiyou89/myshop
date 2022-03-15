<template>
	<view class="contact">
		<button hover-class='none' open-type="contact">
			<image src="../../static/images/contact.png">
				
			</image>
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.contact{
	position: fixed;
	left: 50rpx;
	bottom: 200rpx;
	z-index: 9999;
	opacity:0.9;
	button{
		// background-color: #1afa29;
		width: 60rpx;
		height: 60rpx;
		line-height: 50rpx;
		padding: 0;
		margin: 0;
		border-radius: 50%;
		button::after{
			border:none;
		}
		image{
			width: 60rpx;
			height: 60rpx;
		}
	}

}
</style>
