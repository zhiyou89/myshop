<template>
	<view>
		<view v-for="(item,index) in items" :key="index">
				<image :src="item.img_url.url">
		</view>
	</view>

</template>

<script>
	export default{
		props:['items']
	}
</script>

<style>
</style>
