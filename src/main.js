import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'	// 引入VueRouter
import router from './router'	
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'


import http from 'axios'
import './api/mock.js'

import * as echarts from "echarts";
Vue.prototype.$echarts = echarts

Vue.prototype.$http = http
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)	// 应用插件




new Vue({
	el:'#app',
	render: h => h(App),
	router:router,
	store
})
