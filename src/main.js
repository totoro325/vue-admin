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

//配置路由拦截器，判断是否存在token, 不存在则跳转到登录页
router.beforeEach((to, from, next) => {
	//防止刷新页面后vuex丢失token,获取token
	store.commit('getToken')

	const token = store.state.user.token

	//判断是否存在token,和当前页面是否登录页，如果token不存在且当前页不是login则跳转到login页
	if( !token && to.name !=='login'){
		next({name:'login'})
	}else{
		next()
	}
})
new Vue({
	el:'#app',
	render: h => h(App),
	router:router,
	store,
	created(){
		store.commit('addMenu',router)
	}
})
