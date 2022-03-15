<template>
	<view class="ordered-controll" @click="changeBook">
		<checkbox-group>
		    <label class="left-radio">
		        <checkbox style="transform:scale(0.7)" checked="checked" value="true"/> 全选
		    </label>
		</checkbox-group>
		<view class="middle-count">
			<text>合计：</text>
			<text class="iconfont icon-renminbi"></text>
			<text class="count">
				56
			</text>
		</view>
		<view class="bottom-ordered">
			<view class="my-button">
				<text>
					 结算(3)	
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			item:Object
		},
		methods:{
			changeBook (item) {
			    if (e.detail.value.length == 0) {
			        this.carArr.map(item => this.$set(item, 'checked', false))
			        this.$set(this.allFlag, 'checked', false)
			    } else {
			        this.carArr.map(item => this.$set(item, 'checked', true))
			        this.$set(this.allFlag, 'checked', true)
			    }
			}
		}
	}
</script>

<style lang="scss">
	.ordered-controll{
		z-index: 999;
		position: fixed;
		bottom: 100rpx;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;
		height: 100rpx;
		background: $uni-bg-color;
		border-top:1px solid $uni-border-color;
		line-height: 100rpx;
		.left-radio{
			.uni-radio{
				width: 30rpx;
				height: 30rpx;
			}
		}
		.middle-count{
			.icon-renminbi{
				font-size: 25rpx;
				color:$my-badge-red-color;
			}
				
			.count{
				font-weight:$my-font-werght-blod ;
				font-size: $uni-font-size-lg;
				color:$my-badge-red-color;
			}
		}
		.bottom-ordered{
			.my-button{
				text-align: center;
				text{
					border-radius: 2em;
					background: $my-icon-color;
					padding:20rpx 50rpx;
					color:$uni-text-color-inverse;
				}
			}
		}
	}
</style>
