<template>
	<view>
			<view class="reviews">
				<view class="submit" @click="submit">发布</view>
				<view class="top">		
					<view>
						 <textarea placeholder-style="color:$uni-text-color-grey;font-size:$uni-font-size-base;" 
						 maxlength="-1" placeholder="请多角度的评价宝贝,可以帮助更多想买的人" v-model="textarea"/>
					</view>
					<view>
						<imgUpload :imgArr="imgArray" loading 
						url="https://www.yjcloudcomputing.com/api/v1/upload" ref="imgUpload"></imgUpload>
					</view>
				</view>
			</view>
			<view class="example-body">
				<view class="box">
					<view class="name">
						商品评价
					</view>
					<view class="my-uni-rate">
						<uni-rate v-model="rateValue" @change="onChange" :size="18"/>
					</view>

				</view>
				<view class="box">
					<view class="name">
						配送服务
					</view>
					<view class="my-uni-rate">
						<uni-rate v-model="rateValue1" @change="onChange1" :size="18"/>
					</view>
				
				</view>
				<view class="box">
					<view class="name">
						服务态度
					</view>
					<view class="my-uni-rate">
						<uni-rate v-model="rateValue2" @change="onChange2" :size="18"/>
					</view>
				
				</view>
				

			</view>
	
		</view>
</template>

<script>
	import imgUpload from 'components/poiuy-uImgUpload/imgUpload.vue'
	export default {
			components: {
				imgUpload
			},
			data() {
				return {
					rateValue:5,
					rateValue1:5,
					rateValue2:5,
					imgArray:[],
					textarea:''

				}
			},
			methods:{
				submit(){
				             //开始上传图片
				           this.$refs.imgUpload.upload(res=>{
							   console.log(res)
				           });
				    },
					onChange(e){

						console.log(e)
					},
					onChange1(e){

						console.log(e)
					},
					onChange2(e){
					
						console.log(e)
					}
			}

		
	}
</script>

<style lang="scss">
	.example-body{
		margin:$uni-spacing-col-lg $uni-spacing-row-base;
		background-color: $uni-bg-color;
		border-radius: $uni-border-radius-lg;
		.box{
			display: flex;
			.name{
				padding:$uni-spacing-col-base;
			}
			.my-uni-rate{
				padding-top: $uni-spacing-col-base;
			}
		}
	}
	.reviews{

		textarea{
			width: 100%;
		}
		margin: 0 $uni-spacing-row-base;
		.submit{
			text-align: right;
			color:$my-badge-red-color;
			padding:$uni-spacing-row-base 0;
		}
		.descript{
			display: flex;
			view{
				padding-right: $uni-spacing-row-base;
			}
		}
		.top{
			background-color: $uni-bg-color;
			border-radius: $uni-border-radius-lg;
			padding:$uni-spacing-col-lg $uni-spacing-row-base;

			textarea{
				margin:$uni-spacing-col-lg 0;
			}
		}
		.bottom{
			background-color: $uni-bg-color;
			border-radius: $uni-border-radius-lg;
			margin:$uni-spacing-col-lg 0 0 0;
			padding:0 $uni-spacing-row-base;
			.descript{
				padding:$uni-spacing-col-base 0 ;
			}
				
		}

	}
</style>
