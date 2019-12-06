import request from "../util/request";
const BASE_API = 'http://192.168.0.106:9090'

export function getSupplierList(params) {
    return request({
        url:BASE_API +`/supplier/querySupplierList`,
        method:'get',
        params
    })
}

export function addSupplier(id,data) {
    return request({
        url:BASE_API +'/supplier/addSupplier',
        method:'post',
        data
    })
}

export function editSupplier(id,data) {
    return request({
        url:BASE_API +`/supplier/updateSupplier/${id}`,
        method:'put',
        data
    })
}


export function getSupplier(id) {
    return request({
        url:BASE_API +'/supplier/getSupplier/'+id,
        method:'get',
    })
}

export function delSupplier(id) {
    return request({
        url:BASE_API +'/supplier/deleteSupplier/'+id,
        method:'delete',
    })
}


