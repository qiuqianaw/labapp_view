import Vue from 'vue'
import App from './App'
import Request from './utils/luch-request/luch-request/index.js'
import Dialog from './wxcomponents/vant/dialog/dialog';

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()

const http = new Request()
Vue.prototype.http = http

Vue.prototype.dialog = Dialog