(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/list/list"],{"1d92":function(t,e,o){"use strict";var i=o("98c7"),n=o.n(i);n.a},"374c":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(o("a34a"));function n(t){return t&&t.__esModule?t:{default:t}}function r(t,e,o,i,n,r,s){try{var a=t[r](s),c=a.value}catch(u){return void o(u)}a.done?e(c):Promise.resolve(c).then(i,n)}function s(t){return function(){var e=this,o=arguments;return new Promise((function(i,n){var s=t.apply(e,o);function a(t){r(s,i,n,a,c,"next",t)}function c(t){r(s,i,n,a,c,"throw",t)}a(void 0)}))}}function a(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var c=function(){Promise.all([o.e("common/vendor"),o.e("components/goods-list/product-by-category")]).then(function(){return resolve(o("8280"))}.bind(null,o)).catch(o.oe)},u=function(){o.e("components/no-message-notice/no-message-notice").then(function(){return resolve(o("5b8d"))}.bind(null,o)).catch(o.oe)},d=function(){o.e("components/loading-view/product-loading").then(function(){return resolve(o("d98a"))}.bind(null,o)).catch(o.oe)},h=function(){o.e("components/gwh-backTopIcon/gwh-backTopIcon").then(function(){return resolve(o("50d4"))}.bind(null,o)).catch(o.oe)},l={data:function(){var t;return t={topFlash:!1,leftNavIndex:0,scrollTop:0,ProductCategory:[],categoryID:1,page:1,productList:[],flag:!1,mNavID:1,triggered:!1,_freshing:!1,showlistData:[]},a(t,"scrollTop",0),a(t,"old",{scrollTop:0}),a(t,"deliveryNav",[{id:1,name:"即时配送"},{id:2,name:"隔天配送"},{id:3,name:"实时物流"}]),t},components:{goodsList:c,noMessageNtice:u,loading:d,topIcon:h},methods:{goTop:function(){this.scrollTop=this.old.scrollTop,this.$nextTick((function(){this.scrollTop=0}))},scroll:function(t){t.detail.scrollTop>800?this.topFlash=!0:this.topFlash=!1,this.old.scrollTop=t.detail.scrollTop},loadFunction:function(){t.showLoading({title:"加载中"}),setTimeout((function(){t.hideLoading()}),1e3)},middleNav:function(t){this.mNavID=t;var e=this.isHas();e?this.showData():(this.intOrderData(),this.getProductList(1))},getCategoryProduct:function(t,e){this.leftNavIndex=t,this.categoryID=e,this.mNavID=1;var o=this.isHas();o?this.showData():(this.intOrderData(),this.getProductList(1))},intOrderData:function(){this.productList.push({page:1,categoryid:this.categoryID,indexCategoryID:this.mNavID,flash:!1,data:[]})},isHas:function(){for(var t=!1,e=0;this.productList.length>e;e++)this.productList[e].categoryid==this.categoryID&&this.productList[e].indexCategoryID==this.mNavID&&(t=!0);return t},pushProduct:function(t){for(var e=0;this.productList.length>e;e++)if(this.productList[e].categoryid==this.categoryID&&this.productList[e].indexCategoryID==this.mNavID)for(var o=0;t.length>o;o++)this.productList[e].data.push(t[o]);console.log(this.productList,"productList")},showData:function(){for(var t=0;this.productList.length>t;t++)this.productList[t].categoryid==this.categoryID&&this.productList[t].indexCategoryID==this.mNavID&&(this.showlistData=this.productList[t].data)},findValuePages:function(){for(var t=0;this.productList.length>t;t++)if(this.productList[t].categoryid==this.categoryID&&this.productList[t].indexCategoryID==this.mNavID)return this.productList[t].page},findValueFlash:function(){for(var t=0;this.productList.length>t;t++)if(this.productList[t].categoryid==this.categoryID&&this.productList[t].indexCategoryID==this.mNavID)return this.productList[t].flash},updatePages:function(t){for(var e=0;this.productList.length>e;e++)this.productList[e].categoryid==this.categoryID&&this.productList[e].indexCategoryID==this.mNavID&&(this.productList[e].page=t)},updateFlash:function(t){for(var e=0;this.productList.length>e;e++)this.productList[e].categoryid==this.categoryID&&this.productList[e].indexCategoryID==this.mNavID&&(this.productList[e].flash=t,this.flag=t)},updateindexCategoryID:function(t){for(var e=0;this.productList.length>e;e++)this.productList[e].categoryid==this.categoryID&&this.productList[e].indexCategoryID==this.mNavID&&(this.productList[e].indexCategoryID=t)},lower:function(){if(this.findValueFlash())return!1;var t=this.findValuePages();t++,this.getProductList(t)},getProductCategory:function(){var t=this;return s(i.default.mark((function e(){var o;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$myrequest({url:"/category/all/1"});case 2:o=e.sent,t.ProductCategory=o;case 4:case"end":return e.stop()}}),e)})))()},getProductList:function(t){var e=this;return s(i.default.mark((function o(){var n;return i.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.next=2,e.$myrequest({url:"/category/list_products",data:{categoryId:e.categoryID,indexCategoryID:e.mNavID,pages:t}});case 2:n=o.sent,n.data.length?e.updatePages(t):e.updateFlash(!0),e.pushProduct(n.data),e.showData();case 6:case"end":return o.stop()}}),o)})))()}},onLoad:function(t){this.intOrderData(),this.getProductList(1),this.getProductCategory()},onShow:function(){var e=t.getStorageSync("listID");e&&(this.leftNavIndex=e-1,this.getCategoryProduct(this.leftNavIndex,this.leftNavIndex+1),t.setStorageSync("listID",0))}};e.default=l}).call(this,o("543d")["default"])},4183:function(t,e,o){"use strict";o.d(e,"b",(function(){return n})),o.d(e,"c",(function(){return r})),o.d(e,"a",(function(){return i}));var i={goodsList:function(){return o.e("components/goods-list/goods-list").then(o.bind(null,"a775"))},noMessageNotice:function(){return o.e("components/no-message-notice/no-message-notice").then(o.bind(null,"5b8d"))}},n=function(){var t=this,e=t.$createElement;t._self._c},r=[]},"753e":function(t,e,o){"use strict";o.r(e);var i=o("374c"),n=o.n(i);for(var r in i)"default"!==r&&function(t){o.d(e,t,(function(){return i[t]}))}(r);e["default"]=n.a},"98c7":function(t,e,o){},ba1c:function(t,e,o){"use strict";o.r(e);var i=o("4183"),n=o("753e");for(var r in n)"default"!==r&&function(t){o.d(e,t,(function(){return n[t]}))}(r);o("1d92");var s,a=o("f0c5"),c=Object(a["a"])(n["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);e["default"]=c.exports},e63d:function(t,e,o){"use strict";(function(t){o("ffa8");i(o("66fd"));var e=i(o("ba1c"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])}},[["e63d","common/runtime","common/vendor"]]]);