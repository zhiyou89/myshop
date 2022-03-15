
async getProductList(callBack){
		const res = await this.$myrequest({
			url:'/product',
			data:{
				'id':id
			}
		})
	
		productList =[...productList, ...res.data.data]
		callBack && callBack()
	}

export{
	getProductList
}