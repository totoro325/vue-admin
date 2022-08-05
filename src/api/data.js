import axios   from "./axios";

export const getMenu =(param)=>{
    return axios.request({
        url:'/permission/getMenu',
        method:'post',
        data:param
    })
}

export const getData = ()=>{
    return axios.request({
        url:'/home/getData'
    })
}

export const getUser = ()=>{
    return axios.request({
        url:'/user/getUserList'
    })
}

export const edit = ()=>{
    return axios.request({
        url:'/user/updateUser'
    })
}
export const deleteUser = ()=>{
    return axios.request({
        url:'/user/deleteUser'
    })
}


