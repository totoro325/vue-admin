import Vue from "vue";
import VueRouter from "vue-router"
import homePage from '../views/homePage'
import main from '../views/main'
import xian from '../views/xian'
import chengdu from '../views/chengdu'
import shanghai from '../views/shanghai'
import login from '../views/login/login'
import userManage from '../views/user/userManage'



const router = new VueRouter({
  //mode:"history",
  routes: [{
    path: '/',
    name: 'home',
    redirect:"/main",
    component: homePage,
    children: [
    {
        path: '/main',
        name: 'main',
        component: main
      },
      {
        path: '/xian',
        name: 'xian',
        component: xian
      },
      {
        path: '/chengdu',
        name: 'chengdu',
        component: chengdu
      },
      {
        path: '/shanghai',
        name: 'shanghai',
        component: shanghai
      },
      {
        path: '/user',
        name: 'user',
        component: userManage
      },
    ]
  }, 
  {
    path:'/login',
    name:'login',
    component:login
  }
]

})


export default router