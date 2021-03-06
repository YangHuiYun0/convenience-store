import request from "../util/request";

// ===========店员管理api==========
export function addStaff(id,data) {
    return request({
        url:'/user/addUser',
        method:'post',
        data
    })
}

export function editStaff(id,data) {
    return request({
        url:'/user/updateUser/'+id,
        method:'put',
        data
    })
}

export function delStaff(id) {
    return request({
        url:'/user/deleteUser/'+id,
        method:'delete',
    })
}

export function getStaff(id) {
    return request({
        url:'/user/getUser/'+id,
        method:'get',
    })
}
//查列表
export function getStaffList(params) {
    return request({
        url:'/user/querySalesList',
        method:'get',
        params
    })
}

// ==========会员管理api============
//会员等级  
export function getLevelInfo() {
    return request({
        url:'/level/queryLevel',
        method:'get',
    })
}

export function editLevel(data) {
    return request({
        url:'/level/updateLevel',
        method:'put',
        data
    })
}

export function addMember(id,data) {
    return request({
        url:'/user/addUser',
        method:'post',
        data
    })
}

export function editMember(id,data) {
    return request({
        url:'/user/updateUser/'+id,
        method:'put',
        data
    })
}

export function delMember(id) {
    return request({
        url:'/user/deleteUser/'+id,
        method:'delete',
    })
}

export function getMember(id) {
    return request({
        url:'/user/getUser/'+id,
        method:'get',
    })
}
//查列表
export function getMemberList(params) {
    return request({
        url:'/user/queryCustomerList',
        method:'get',
        params
    })
}

//查看个人信息

export function getUserInfo() {
    return request({
        url:'/user/currentUser',
        method:'get',
    })
}

//退出登录

export function getLogout() {
    return request({
        url:'/logout',
        method:'get',
    })
}