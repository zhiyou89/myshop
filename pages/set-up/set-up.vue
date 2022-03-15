<template>
	<view class="set-up">
		<view class="set-up-box">
			<view @click="jumpTo">
				<text>执照文件公示</text>
			</view>
			<navigator open-type="exit" target="miniProgram">
				<view class="">
					<text>退出登录</text>
				</view>
			</navigator>
		</view>

		<view class="banben">
			<text>当前版本号：v1.1.0</text>
		</view>
	</view>
</template>

<script>
	export default{
		methods:{
			jumpTo(){
				uni.navigateTo({
					url:"/pages/set-up/file"
				})
			}
		}
	}
</script>

<style lang="scss">
	.set-up{
		text-align: center;
		.set-up-box{
			view{
				height: 100rpx;
				background-color: $uni-bg-color;
				line-height: 100rpx;
				margin:$uni-spacing-col-lg 0;
				text{
					font-size: $uni-font-size-lg;
					font-weight: $my-font-werght-blod;
				}
			}

		}
		
	}
</style>
