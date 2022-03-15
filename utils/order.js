import data from '@/utils/data.js'

const pay = function(productArr,delivery){
	let token = uni.getStorageSync(data.storageKeyForToken)
	if(1){
	    let data = []
	    let products = []
	    console.log(data.storageKeyForToken)
	    for(let i=0;i<productArr.length;i++){
	    	products.push({
	    		product_id:productArr[i].id,
	    		count:productArr[i].counts
	    	})
	    }
		// uni.request({
		// 	url:"https://www.yjcloudcomputing.com/api/v1/place_order",
		// 	method:'POST',
		// 	data:{products,delivery},
			
		// 	success: (res) => {
		// 		console.log(res)
		// 	}
		// })
		
	}else{
	    //myFuntction.oneMoresTimePay();
	}
}

//验证和重新获取token
const checkTokenOrGetToken = function(){
	// let refresh = true
	// let token = uni.getStorageSync(data.storageKeyForToken)
	// if(!token){
	// 	myFuntction.getTokenFromService()
	// 	token = uni.getStorageSync(data.storageKeyForToken)
	// }
	// if(token){
	// 	let url = 'https://www.yjcloudcomputing.com/api/v1/check_token';
	// 	uni.request({
	// 		url:url,
	// 		method:'POST',
	// 		data:{
	// 			token:token
	// 		},
	// 		success: (res) => {
	// 			if(!res.data){
	// 				myFuntction.getTokenFromService()
	// 			}
	// 		}
	// 	})
	// 	// let data = myFuntction.verifyFromService(token)
	// 	// console.log(data,'res')
	// 	// if(!res){
	// 	// 	token = myFuntction.getTokenFromService()
	// 	// }
	// }
	
}


		
		
		
module.exports = {
	pay,
	checkTokenOrGetToken
}