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

export function addGoods(id,data) {
    return request({
        url:'/goods/addGoods',
        method:'post',
        data
    })
}

export function editGoods(id,data) {
    return request({
        url:`/goods/updateGoods/${id}`,
        method:'put',
        data
    })
}


export function getGoods(id) {
    return request({
        url:'/goods/getGoods/'+id,
        method:'get',
    })
}

export function delGoods(id) {
    return request({
        url:'/supplier/deleteSupplier/'+id,
        method:'delete',
    })
}
export function getGoodsList(params) {
    return request({
        url:`/goods/queryGoodsList`,
        method:'get',
        params
    })
}

// 查询树列表
export function getTreeList() {
    return request({
        url:`/category/queryCategoryList`,
        method:'get',
    })
}

//删除树节点（商品类别）
export function delTreeNode(id) {
    return request({
        url:'/category/deleteCategory/'+id,
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
// 获取商品类别
export function getNodeType(id) {
    return request({
        url:`/category/getCategory/${id}`,
        method:'get',
    })
}
//编辑商品类别
export function editNodeType(id,data) {
    return request({
        url:`/category/updateCategory/${id}`,
        method:'put',
        data
    })
}
//查询商品类别子节点
export function getChildrenType(code) {
    return request({
        url:`/category/getChildren/${code}`,
        method:'get',
    })
}
//获取商品编码

export function getGoodsCode(data) {
    return request({
        url:`/goods/getCodeByImg`,
        method:'post',
        data
    })
}