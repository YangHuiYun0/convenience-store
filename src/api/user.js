import request from "../util/request";
const BASE_API = 'http://192.168.0.106:9090'
// 增加店员/addUser

export function addStaff(id,data) {
    return request({
        url:BASE_API +'/user/addUser',
        method:'post',
        data
    })
}

export function editStaff(id,data) {
    return request({
        url:BASE_API +'/user/updateUser'+id,
        method:'put',
        data
    })
}

export function delStaff(id) {
    return request({
        url:BASE_API +'/user/deleteUser'+id,
        method:'delete',
    })
}

export function getStaff(id) {
    return request({
        url:BASE_API +'/user/getUser/'+id,
        method:'get',
    })
}