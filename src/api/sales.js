import request from "../util/request";

//收银台添加购买的商品
export function getBuyGoods(data) {
    return request({
        url:`/goods/getCodeByImg`,
        method:'post',
        data
    })
}

//提交会员手机
export function getMemberInfo(phone) {
    return request({
        url:`/user/${phone}`,
        method:'get',
    })
}

//付款
export function setPayment(data) {
    return request({
        url:`/order`,
        method:'post',
        data
    })
}
//查询销量
export function getSalesInfo(params) {
    return request({
        url:`/order`,
        method:'get',
        params
    })
}