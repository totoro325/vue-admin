import Mock from 'mockjs'

export default {
    getMenu: config => {
        const {
            username,
            password,
        } = JSON.parse(config.body)
        console.log('*****看看json',username,password)

        if (username === 'admin' && password === 'admin') {
            return {
                code: 20000,
                data: {
                    menu: [{
                            path: '',
                            name: 'home',
                            url: 'homePage',
                            title:'首页'

                        },
                        {
                            path: '/chengdu',
                            name: 'chengdu',
                            url: 'chengdu/index',
                            title:'成都'

                        },
                        {
                            path: '/shanghai',
                            name: 'shanghai',
                            url: 'shanghai/index',
                            title:'上海'
                        },
                        {
                            path: '/xian',
                            name: 'xian',
                            url: 'xian/index',
                            title:'西安'
                        },
                        {
                            path: '/user',
                            name: 'user',
                            url: 'user/userManage',
                            title:'用户管理'
                        },
                        
                       
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else if (username === 'user' && password === 'user') {
            return {
                code: 20000,
                data: {
                    menu: [{
                        path: '/',
                        name: 'main',
                        url: 'main/index',
                        title:'首页'
                    }, 
                    {
                        path: '/xian',
                        name: 'xian',
                        url: 'xian/index',
                        title:'西安'
                    },
                    {
                        path: '/user',
                        name: 'user',
                        url: 'user/userManage',
                        title:'用户管理'
                    },
                
                
                ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else {
            return {
                code: -999,
                data: {
                    message: '密码错误'
                }
            }
        }
    }
}