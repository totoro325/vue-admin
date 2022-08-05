import Cookies from "js-cookie"
//import router from "router"
export default{
    state:{
        isCollapse:false,
        menu:[],
        currentMenu:null,
        tabsList:[
            {
                path:'/',
                name:'home',
                title:'首页',
                icon:'home'

            }
        ]
    },
    mutations:{
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state,val){
            //判断当前菜单name 是否为home,如果是则将currentMenu属性设置为null,如果不是则将VAL赋值给currentMenu属性
            
            if(val.name !=='home'){
                //如果点击导航菜单不是home,首先遍历tag标签数组tabsList是否已有val中得name,
                state.currentMenu = val
               // val.name ==="home"?(state.currentMenu =null) : (state.currentMenu = val)
                let result = state.tabsList.findIndex( item => item.title === val.title)
                result === -1 ? state.tabsList.push(val):''
            }else{
                state.currentMenu = null
            }
            
        },
        closeTab(state,val){
        //首先判断 val要删除tag标签在tabList数组中是否存在，如果存在则删除
        let result = state.tabsList.findIndex( item => item.title === val.title)
        state.tabsList.splice(result,1)

        },
        //登录后添加路由到menu
        setMenu(state,val){
            state.menu = val
            //将val数据进行字符串类型序列化存到cookie中
            Cookies.set('menu',JSON.stringify(val))
            //输出val
            console.log('vuex',val)
        },
        //登出后清除menu路由数据和 cookie信息
        clearMenu(state){
            state.menu = []
            Cookies.remove('menu')
        },
        //登录成功后添加动态路由
        addMenu(state,router){
            //判断cookie中没有menu数据，认为没有登录，不配置动态路由，直接结束该方法
            if(!Cookies.get('menu')){
                return
            }
            //防止刷新造成menu数据丢失，后去cookie 中的menu数据，赋值给menu.
            const menu = JSON.parse(Cookies.get('menu'))
            state.menu = menu
            console.log(menu,'menu')
            //将menu的数据添加到router路由中，展示动态路由菜单
            //拼接路由，将路由数据按照配置的格式存放到currentMenu数组中
            const currentMenu = [
                {
                    path:'/',
                    component:() => import(`@/views/homePage`),
                    children:[]
                }
            ]
            console.log( currentMenu, 'main_currentMenu')
            menu.forEach(item => {
                //从menu数组中取出包含children 字段的数据，拼接路由
                if(item.children){
                    item.children = item.children.map(item =>{
                        item.commponet = () =>import(`@/views/${item.url}`)
                        return item
                    })
                    currentMenu[0].children.push(...item.children)
                }else {
                    item.commponet = () =>import(`@/views/${item.url}`)
                    currentMenu[0].children.push(item)
                }
                
            });
            console.log(currentMenu,'currentMenu')
            //将拼接好的路由添加到router中
           router.addRoutes(currentMenu)
        }
    }
}