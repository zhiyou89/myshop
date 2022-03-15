import Vue from 'vue'
import App from './App'

import {myrequest} from './utils/api.js'
import {mylogin} from './utils/api.js'
import share from './utils/share.js'

Vue.mixin(share)
Vue.prototype.$myrequest = myrequest
Vue.prototype.$mylogin = mylogin

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
