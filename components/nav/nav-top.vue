<template>

	<view class="location" 
	:style="{ 'marginLeft':navLeft+'px','margin-top':navTop+'px', 'lineHeight':height+'px',
	 'height':height+'px','color':pageNameColor }" 
	 >
		<slot name="top-nav-content"></slot>
	</view>
</template>

<script>
	export default{
		props:['navTop',"height","navLeft","pageNameColor"],
		data(){
			return{


			}
		},
		beforeCreate() {
			console.log(55
			)

		}
	}
</script>

<style lang="scss">
	.location{
		font-size: $uni-font-size-sm;
		margin-bottom: 10px;
	}
</style>
