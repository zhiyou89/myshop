<template>
	<form class="edit-address" @submit="formSubmit" @reset="formReset">
		 <view class="items">
<!-- 		        <pickerAddress @change="change">
				<view class="item">
					<view class="left">地址</view>
					<view class="right">{{cityAndCountName}}</view>
					<view class="icon">
						<text class="iconfont icon-you"></text>
					</view>
				</view>
				</pickerAddress> -->
				<view class="item" @click="chooseAddress">
					<view class="left">选择地址</view>
					<view class="right">
						<input type="text" :placeholder="nameByChooseAddress" disabled :placeholder-style = "addressError?'color:red':''">
					</view>
					<view class="icon">
						<text class="iconfont icon-you"></text>
					</view>
				</view>
				<view class="item">
					<view class="left">详细地址</view>
					<view class="right">
						<input type="text"  v-model="detailInfo" focus>
					</view>
				</view>
				<view class="item">
					<view class="left">收货人</view>
					<view class="right">
						<input type="text" v-model="userName" focus>
						</view>
				</view>
				<view class="item">
					<view class="left"></view>
					<view class="right">
					<view class="cu-form-group">
							<radio-group @change="radioChange">
								<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in sex" :key="item.value">
									<radio :checked="item.checked" :value="item.value"/><span>{{item.label}}</span>
								</label>
							</radio-group>
						</view>
					</view>

				</view>
				<view class="item">
					<view class="left">手机</view>
					<view class="right"><input type="text" v-model="telNumber" focus></view>
				</view>
				<view class="item">
					<view class="left">标签</view>
					<view class="right biaoqian">
						<view v-for="(item,index) in iconData" :key="index" @click="checkIcon(index)" :class="{'active':item.id==navID}">
							{{item.text}}
						</view>
					</view>
				</view>


		</view>
		<view class="but">
			<view>
				<button type="default" class="subimit" @click="submit">提交</button>
			</view>
			<view>
				 <button class="mini-btn" type="warn" @click="deleteAddress">删除</button>
			</view>
		</view>
	</form>
</template>

<script>
	// import pickerAddress from "components/address-picker/address-picker"
	import data from 'utils/data.js'
	import location from 'utils/location.js'
	export default{
		        data() {
		            return {
						addressError:false,
						nameByChooseAddress:'点击选择正确的地址',
						addressInfo:{},
						cityAndCountName: '',
						detailInfo:'',
						userName:'',
						telNumber:'',
						navID:1,
						sexID:1,
						index:0,
		                title: 'Hello',
						iconData:[
							{id:1,text:'家'},
							{id:2,text:'学校'},
							{id:3,text:'公司'}
						],
						 sex: [{
								label: "男",
								value: 0,
								checked: true
							}, {
								label: "女",
								value: 1
							}]
		            }
		        },
		        onLoad(options) {
					this.index = options.index
					this.showStorageAddressInfo()
					if(this.sexID==1){
						this.sex = [{
								label: "男",
								value: 0
								
								}, {
									label: "女",
									value: 1,
									checked: true
							}]
					}else{
						this.sex = [{
								label: "男",
								value: 0,
								checked: true
								}, {
									label: "女",
									value: 1
							}]
					}
		        },
				onShow() {

				},
				onHide() {
					
				},
		        methods: {
					chooseAddress(){
						this.addressError = false
						let setting = uni.getStorageSync('setting')
						uni.chooseLocation({
							success: (res) => {
								let distance = location.distance(res.latitude,res.longitude,setting.latitude,setting.longitude)
								if(distance>setting.delivery_distance){
									this.addressError = true
									this.nameByChooseAddress = '请选择其他地址'
									uni.showToast({
										title:"超出配送范围,请您选择其他地址",
										icon:'none'
									})
								}else{
									this.nameByChooseAddress = res.name
									this.cityAndCountName = res.address
								}
							}
						})
					},
		            change(data) {
		                this.cityAndCountName = data.data.join('')

		            },
					checkIcon(index){
						this.navID = index+1;
					},
					radioChange(e) {
						this.sexID = e.detail.value
					},
					showStorageAddressInfo(){
						let address = uni.getStorageSync(data.storageKeyForAddress)
						this.addressInfo = address[this.index]
						this.nameByChooseAddress = this.addressInfo.nameByChooseAddress
						this.cityAndCountName = this.addressInfo.cityAndCountName
						this.detailInfo = this.addressInfo.detailInfo
						this.userName = this.addressInfo.userName
						this.telNumber = this.addressInfo.telNumber
						this.navID = this.addressInfo.type
						this.sexID = this.addressInfo.sexText
					},
					deleteAddress(){
						let arr = []
						let address = uni.getStorageSync(data.storageKeyForAddress)
						if(address.length==1){
							uni.showToast({
								icon:'none',
								title:'不能删除最后一条地址'
							})
							return false
						}
					
						for (let i= 0;i<address.length;i++){
							if(i!=this.index){
								arr.push(address[i])
							}	
						}
						uni.setStorageSync(data.storageKeyForAddress,arr)
						uni.showToast({
							title:'删除成功',
							success(res) {
								setTimeout(()=>{
									uni.navigateBack({
										delta:1
									})
								},1500)
											
							}
						})
					},
					submit(){
						let address = {
								type:this.navID,
								cityAndCountName:this.cityAndCountName,
								nameByChooseAddress:this.nameByChooseAddress,
								detailInfo:this.detailInfo,
								userName:this.userName,
								telNumber:this.telNumber,
								sexText:this.sexID
						}
						if(address.nameByChooseAddress=='点击选择正确的地址' || address.nameByChooseAddress=='请选择其他地址'){
							uni.showToast({
								icon:'none',
								title:'请选择正确的地址'
							})
							 return false;
						}
						if(address.detailInfo==''){
							uni.showToast({
								icon:'none',
								title:'请填写详细地址'
							})
							 return false;
							
						}
						if(address.userName==''){
							uni.showToast({
								icon:'none',
								title:'收货人不能为空'
							})
							 return false;
						}else{
							if(address.userName.length>15){
								uni.showToast({
									icon:'none',
									title:'名字不超过15字'
								})
								return false;
							}
							
						}
						if(address.telNumber==''){
							uni.showToast({
								icon:'none',
								title:'电话号码不能为空'
							})
							 return false;
						}else{
							var phone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
							if(!phone.test(address.telNumber)){ 
							        uni.showToast({
										icon:'none',
							        	title:'电话号码格式不对'
							        })
							        return false; 
							    } 
						}
						let addressArr = []
						let addressByStorageSync= uni.getStorageSync(data.storageKeyForAddress)
						addressArr.push(address)
						if(addressByStorageSync.length!=0){
							for (let i= 0;i<addressByStorageSync.length;i++){
								if(i!=this.index){
									addressArr.push(addressByStorageSync[i])
								}
									
							}
						}
						uni.setStorageSync(data.storageKeyForAddress,addressArr)

						uni.showToast({
							title:'保存成功',
							success(res) {
								setTimeout(()=>{
									uni.navigateBack({
										delta:1
									})
								},1500)
					
							}
						})
					}
		        }
	}
</script>

<style lang="scss">
	page{
		.edit-address{
			.items{
				
				.item{
					display: flex;
					background-color: $uni-bg-color;
					height:100rpx;
					line-height: 100rpx;
					padding: 0 0 0 $uni-spacing-row-base;
					margin: $my-margin-height-sm 0 0 0;
					align-items: center;
					.left{
						width: 25%;
					}
					.right{
						width: 75%;
						radio{
							transform: scale(0.7)
						}
						input{
							line-height: 100rpx;
						}
					}
					.biaoqian{
						display: flex;
						align-items: center;
						view{
							margin:0 0 0 $uni-spacing-row-sm;
							font-size: $uni-font-size-sm;
							height: 40rpx;
							width: 80rpx;
							line-height: 40rpx;
							text-align: center;
							background-color:$uni-bg-color-grey;
							border-radius: $uni-border-radius-base;
						}
						.active{
							background-color: $my-icon-color;
						}
					}
				}
			}
			.but{
				display: flex;
				flex-wrap: wrap;
				margin-top: $my-margin-button-top;
				view{
					width: 100%;
					.subimit{
						background-color: $my-icon-color;
					}
					button{

						margin: $uni-spacing-col-lg $uni-spacing-row-base 0 $uni-spacing-row-base;
					}
				}

			}
		}
	}

</style>
