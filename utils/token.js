import myFuntction from '@/utils/function.js'
const verify = function(){
	var token =  uni.getStorageSync('token')
	if(!token){
		myFuntction.getTokenFromService();
	}else{
		myFuntction.verifyFromService();
	}
}