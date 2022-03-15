<script>
	import order from 'utils/order.js'
	export default {
		onLaunch: function() {
			order.checkTokenOrGetToken()
		},

		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	page{
		font-size: $uni-font-size-base;
		color: $uni-text-color;
		background: $uni-bg-color-grey;
		margin:0;
		padding:0;
	}
	image{will-change: transform}
	.container {
	  height: 100%;
	  flex-direction: column;
	  align-items: center;
	  justify-content: space-between;
	  box-sizing: border-box;
	}
	
	.uni-radio-input{
		width: 15px !important;
		height: 15px !important;
	}
	.uni-radio-input-checked{
		background: $my-icon-color !important;
		border:none !important;
	}
	.title{
		padding: $uni-spacing-col-lg $uni-spacing-row-base;
		text{
			font-weight: $my-font-werght-blod;
			font-size: $uni-font-size-lg;
		}
	}
</style>
