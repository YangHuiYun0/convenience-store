import request from "../util/request";

//查询首页数据
export function getHomeInfo(params) {
    return request({
        url:`/sales/amount`,
        method:'get',
        params
    })
}

//查询走势图
export function getEchartsData() {
    return request({
        url:`/sales/echarts`,
        method:'get',
    })
}