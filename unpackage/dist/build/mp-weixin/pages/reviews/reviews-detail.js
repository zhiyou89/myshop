(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/reviews/reviews-detail"],{"04c5":function(e,n,t){"use strict";t.r(n);var r=t("ba06"),u=t.n(r);for(var a in r)"default"!==a&&function(e){t.d(n,e,(function(){return r[e]}))}(a);n["default"]=u.a},"1eb0":function(e,n,t){},"25ba":function(e,n,t){"use strict";t.r(n);var r=t("aec0"),u=t("04c5");for(var a in u)"default"!==a&&function(e){t.d(n,e,(function(){return u[e]}))}(a);t("7be0");var i,c=t("f0c5"),o=Object(c["a"])(u["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);n["default"]=o.exports},"7be0":function(e,n,t){"use strict";var r=t("1eb0"),u=t.n(r);u.a},"88e2":function(e,n,t){"use strict";(function(e){t("ffa8");r(t("66fd"));var n=r(t("25ba"));function r(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},aec0:function(e,n,t){"use strict";t.d(n,"b",(function(){return u})),t.d(n,"c",(function(){return a})),t.d(n,"a",(function(){return r}));var r={uniRate:function(){return t.e("components/uni-rate/uni-rate").then(t.bind(null,"35b4"))}},u=function(){var e=this,n=e.$createElement;e._self._c},a=[]},ba06:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=u(t("a34a"));function u(e){return e&&e.__esModule?e:{default:e}}function a(e,n,t,r,u,a,i){try{var c=e[a](i),o=c.value}catch(f){return void t(f)}c.done?n(o):Promise.resolve(o).then(r,u)}function i(e){return function(){var n=this,t=arguments;return new Promise((function(r,u){var i=e.apply(n,t);function c(e){a(i,r,u,c,o,"next",e)}function o(e){a(i,r,u,c,o,"throw",e)}c(void 0)}))}}var c={data:function(){return{reviewsDetail:[],data:[]}},methods:{previewImg:function(n,t){var r=t;e.previewImage({current:r,urls:n})},getReviews:function(e,n){var t=this;return i(r.default.mark((function u(){var a;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$myrequest({url:"/reviews",data:{id:e}});case 2:a=r.sent,t.reviewsDetail=a,n&&n();case 5:case"end":return r.stop()}}),u)})))()}},onLoad:function(e){console.log(e.id),this.getReviews(e.id)}};n.default=c}).call(this,t("543d")["default"])}},[["88e2","common/runtime","common/vendor"]]]);