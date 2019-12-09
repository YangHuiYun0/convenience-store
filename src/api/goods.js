import request from "../util/request";

export function getSupplierList(params) {
    return request({
        url:`/supplier/querySupplierList`,
        method:'get',
        params
    })
}

export function addSupplier(id,data) {
    return request({
        url:'/supplier/addSupplier',
        method:'post',
        data
    })
}

export function editSupplier(id,data) {
    return request({
        url:`/supplier/updateSupplier/${id}`,
        method:'put',
        data
    })
}


export function getSupplier(id) {
    return request({
        url:'/supplier/getSupplier/'+id,
        method:'get',
    })
}

export function delSupplier(id) {
    return request({
        url:'/supplier/deleteSupplier/'+id,
        method:'delete',
    })
}

// 增加商品类别
export function addNodeType(data) {
    return request({
        url:'/category/addCategory',
        method:'post',
        data
    })
}


