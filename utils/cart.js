import myFuntction from '@/utils/function.js'
import data from '@/utils/data.js'
// 加入购物车
// 如果之前没有记录,就新增,有就数量加counts
const add = function (item, counts) {
	let product = myFuntction.addToCart(item)
	let cartData = myFuntction.getCartDataFromLocal(data.storageKeyForCart)
	let isHasOne = myFuntction.isHasThatOne(product.id, cartData)
	if(isHasOne.index == -1){
		product.counts = counts;
		product.selectStatus = true;//选中状态
		cartData.push(product)
	}
	else{
		cartData[isHasOne.index].counts +=counts;
	}
	uni.setStorageSync(data.storageKeyForCart,cartData)
}


//读取缓存的数据
const readCartCountByStorageSync = function (){
	let storage = uni.getStorageSync(data.storageKeyForCart)
	return storage.length
}
//导航购物车角标
const addCartCount = function(){
			let cartData = uni.getStorageSync(data.storageKeyForCart)
			let y = cartData.length+''
			if(cartData.length){
				uni.setTabBarBadge({
				  index: 2,
				  text: y
				})
			}

		}


//获取勾选商品
const getPayProductFromStorageSync = function (){
	let payProduct = []
	let storage = uni.getStorageSync(data.storageKeyForCart)
	for (let i= 0;i<storage.length;i++){
		if(storage[i].selectStatus){
			payProduct.push(storage[i])
		}
	}
	return payProduct
}

//移除购物车选中商品（下完单的商品从购物车移除）

const deletePayProductFromStorageSync = function (){
	let storage = uni.getStorageSync(data.storageKeyForCart)
	for(let i=0;i<ids.length;i++) {
		var hasInfo = this._isHasThatOne(ids[i], cartData);
		if (hasInfo.index != -1) {
			cartData.splice(hasInfo.index, 1);  //删除数组某一项
		}
	}
	uni.setStorageSync(data.storageKeyForCart,storage)
}

//即时配送商品
const getNowDeliverProduct = function (){
	let NowDeliverProduct = []
	let storage = uni.getStorageSync(data.storageKeyForCart)
	for (let i= 0;i<storage.length;i++){
		if(storage[i].selectStatus && storage[i].index_category_id=='即时配送'){
			NowDeliverProduct.push(storage[i])
		}
	}
	return NowDeliverProduct
}
//隔天配送商品
const getTomorrowDeliverProduct = function (){
	let TomorrowDeliverProduct = []
	let storage = uni.getStorageSync(data.storageKeyForCart)
	for (let i= 0;i<storage.length;i++){
		if(storage[i].selectStatus && storage[i].index_category_id=='隔天配送'){
			TomorrowDeliverProduct.push(storage[i])
		}
	}
	return TomorrowDeliverProduct
}
//实时物流商品
const getRealDeliverProduct = function (){
	let RealDeliverProduct = []
	let storage = uni.getStorageSync(data.storageKeyForCart)
	for (let i= 0;i<storage.length;i++){
		if(storage[i].selectStatus && storage[i].index_category_id=='实时物流'){
			RealDeliverProduct.push(storage[i])
		}
	}
	return RealDeliverProduct
}

//添加全部
const addAllToCart = function(products,counts){
	let arr = []
	for (var i=0;i<products.length;i++)
	{ 
		let product = myFuntction.addToCart(products[i])
		let cartData = myFuntction.getCartDataFromLocal(data.storageKeyForCart)
		let isHasOne = myFuntction.isHasThatOne(product.id, cartData)
		console.log(isHasOne)
		if(isHasOne.index == -1){
			product.counts = counts;
			product.selectStatus = true;//选中状态
			cartData.push(product)
		}
		else{
			// console.log(cartData[isHasOne.index])
			cartData[isHasOne.index].counts +=counts;
		}
		uni.setStorageSync(data.storageKeyForCart,cartData)
	}

	// let product = myFuntction.addToCart(item)
}

//计算总价格
const getCartAllPrice = function (){
	let account = 0
	let sum = 0
	let storage = uni.getStorageSync(data.storageKeyForCart)
	for (let i= 0;i<storage.length;i++){
		if(storage[i].selectStatus){
			account +=storage[i]['price']*storage[i]['counts']*100
			sum +=storage[i]['counts']
		}
	}
	
	return {account:account/100,sum:parseInt(sum,10)}
}

const updateCartCount = function(){
	let cartData = uni.getStorageSync(data.storageKeyForCart)
	let y = cartData.length+''
	if(cartData.length){
		uni.setTabBarBadge({
		  index: 2,
		  text: y
		})
	}

}


module.exports = {
	add,
	readCartCountByStorageSync,
	addAllToCart,
	getCartAllPrice,
	getPayProductFromStorageSync,
	getNowDeliverProduct,
	getTomorrowDeliverProduct,
	getRealDeliverProduct,
	deletePayProductFromStorageSync,
	addCartCount,
	updateCartCount
}