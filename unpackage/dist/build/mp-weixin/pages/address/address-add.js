(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/address/address-add"],{"016d":function(e,t,n){},"0ea9":function(e,t,n){"use strict";n.r(t);var o=n("4821"),a=n.n(o);for(var s in o)"default"!==s&&function(e){n.d(t,e,(function(){return o[e]}))}(s);t["default"]=a.a},4821:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=s(n("b055")),a=s(n("2e10"));function s(e){return e&&e.__esModule?e:{default:e}}var i={data:function(){return{navID:1,sexID:0,nameByChooseAddress:"点击选择正确的地址",cityAndCountName:"",detailInfo:"",userName:"",telNumber:"",sexText:"先生",title:"Hello",addressError:!1,iconData:[{id:1,text:"家"},{id:2,text:"学校"},{id:3,text:"公司"}],sex:[{label:"先生",value:0,checked:!0},{label:"女士",value:1}]}},onLoad:function(){},onHide:function(){},methods:{chooseAddress:function(){var t=this;this.addressError=!1;var n=e.getStorageSync("setting");e.chooseLocation({success:function(o){var s=a.default.distance(o.latitude,o.longitude,n.latitude,n.longitude);s>n.delivery_distance?(t.addressError=!0,t.nameByChooseAddress="请选择其他地址",e.showToast({title:"超出配送范围,请您选择其他地址",icon:"none"})):(t.nameByChooseAddress=o.name,t.cityAndCountName=o.address)}})},change:function(e){this.cityAndCountName=e.data.join(""),console.log(e.data.join(""))},radioChange:function(e){this.sexID=e.detail.value},checkIcon:function(e){this.navID=e+1},submit:function(){var t={type:this.navID,cityAndCountName:this.cityAndCountName,nameByChooseAddress:this.nameByChooseAddress,detailInfo:this.detailInfo,userName:this.userName,telNumber:this.telNumber,sexText:this.sexID};if("请选择其他地址"==t.nameByChooseAddress||"点击选择正确的地址"==t.nameByChooseAddress)return e.showToast({icon:"none",title:"请选择正确的地址"}),!1;if(""==t.detailInfo)return e.showToast({icon:"none",title:"请填写详细地址"}),!1;if(""==t.userName)return e.showToast({icon:"none",title:"收货人不能为空"}),!1;if(t.userName.length>15)return e.showToast({icon:"none",title:"名字不超过15字"}),!1;if(""==t.telNumber)return e.showToast({icon:"none",title:"电话号码不能为空"}),!1;var n=/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;if(!n.test(t.telNumber))return e.showToast({icon:"none",title:"电话号码格式不对"}),!1;var a=[],s=e.getStorageSync(o.default.storageKeyForAddress);if(a.push(t),0!=s.length)for(var i=0;i<s.length;i++)a.push(s[i]);e.setStorageSync(o.default.storageKeyForAddress,a),console.log(a),e.showToast({title:"保存成功",success:function(t){setTimeout((function(){e.navigateBack({delta:1})}),1500)}})}}};t.default=i}).call(this,n("543d")["default"])},"5d4e":function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return o}));var a=function(){var e=this,t=e.$createElement;e._self._c},s=[]},"97a1":function(e,t,n){"use strict";(function(e){n("ffa8");o(n("66fd"));var t=o(n("b03c"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},b03c:function(e,t,n){"use strict";n.r(t);var o=n("5d4e"),a=n("0ea9");for(var s in a)"default"!==s&&function(e){n.d(t,e,(function(){return a[e]}))}(s);n("ed0a");var i,r=n("f0c5"),u=Object(r["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);t["default"]=u.exports},ed0a:function(e,t,n){"use strict";var o=n("016d"),a=n.n(o);a.a}},[["97a1","common/runtime","common/vendor"]]]);