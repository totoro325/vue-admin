import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import permissionApi from './mockServeData/permission'
import userApi from './mockServeData/user'

Mock.mock(/\/home\/getData/, 'get', homeApi.getStatisticalData)

//-----------------------权限相关------------------
Mock.mock(/\/permission\/getMenu/, 'post', permissionApi.getMenu)

//-----------------------用户相关------------------
Mock.mock(/\/user\/getUser/,'get',userApi.getUserList)
Mock.mock(/\/user\/del/, 'get', userApi.deleteUser)
Mock.mock(/\/user\/batchremove/, 'get', userApi.batchremove)
Mock.mock(/\/user\/add/, 'post', userApi.createUser)
Mock.mock(/\/user\/edit/, 'post', userApi.updateUser)
Mock.mock(/\/home\/getData/, 'get', homeApi.getStatisticalData)