
import data from '@/utils/data.js'
/**
 * 本地读取购物车缓存数据
 */
const getCartDataFromLocal= function(key){
	let res = uni.getStorageSync(key);
	if(!res){
		res = []
	}
	return res
}


const isHasThatOne = function (id,arr) {
	let item
	let result = []
	result['index'] = -1
	for (let i= 0;i<arr.length;i++){
		item = arr[i]
		if(item.id == id){
			result['index'] = i
			result['data'] = item
			break;
		}
	}
	return result;
}

const addToCart = function(data){
	let obj = {}
	let keys = ['id','price','product_describe','main_img_url','index_category_id','category_id']
	for(let key in data){
		if(keys.indexOf(key) >= 0){
			obj[key] = data[key]
		}
	}
	return obj;
}
//登录获取token
const getTokenFromService = function(){
	uni.login({
	  provider: 'weixin',
	  success: function (loginRes) {
		  console.log(loginRes)
		uni.request({
			url:'https://www.yjcloudcomputing.com/api/v1/token',
			data:{
				code:loginRes.code
			},
			success:(res)=>{
				console.log(res.data)
				uni.setStorageSync(data.storageKeyForToken,res.data)
			}
		})
	  }
	});
}
//验证token
const verifyFromService = function(token){
	let url = 'https://www.yjcloudcomputing.com/api/v1/check_token';
	uni.request({
		url:url,
		method:'POST',
		data:{
			token:token
		},
		success: (res) => {
			// $callBack(res.data)
		}
	})
}

//立即下单（第一次创建点单）
const firstTimePay = function(productArr,delivery,token){
	let data = []
	let products = []
	console.log(data.storageKeyForToken)
	for(let i=0;i<productArr.length;i++){
		products.push({
			product_id:productArr[i].id,
			count:productArr[i].counts
		})
	}
	uni.request({
		url:"https://www.yjcloudcomputing.com/api/v1/place_order",
		method:'POST',
		data:{products,delivery},
		header:{token},
		success: (res) => {
			console.log(res)
		}
	})
}

/* 再次次支付*/
const oneMoresTimePay = function(){
	execPay(this.data.id);
}


//更新缓存的数据
const execStorageSync = function (data){
	let storage = uni.getStorageSync(data.storageKeyForCart,data)
	return storage.length
}
module.exports = {
	getCartDataFromLocal,
	isHasThatOne,
	addToCart,
	getTokenFromService,
	verifyFromService,
	firstTimePay,
	execStorageSync
	
}