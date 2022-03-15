const BASE_URL = 'https://www.yjcloudcomputing.com/api/v1'
const TOKEN_KEY = 'tttoken'
export const myrequest = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_URL+options.url,
			method:options.method || 'GET',
			data:options.data || {},
			header:{
				'content-type':'application/json',
				'token':uni.getStorageSync(TOKEN_KEY)
			},
			success: (res) => {
				let code = res.statusCode.toString()
				let starChar = code.charAt(0)
				if(starChar == '2'){
					resolve(res.data)
				}else{
					uni.showToast({
						title:res.data.msg,
						icon:'none'
					})
					resolve({data:null})
				}
				// if(res.statusCode==200){
				// 	resolve(res.data)
				// }
				// if(res.statusCode==404){
				// 	resolve({data:null})
				// }
			},
			fail: (err) => {
				return uni.showToast({
					title:"获取数据失败"
				})
				reject(err)
			}
		})
	})
}

export const mylogin = ()=>{
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
				uni.setStorageSync('key',res.data)
			}
		})
	  }
	});
}