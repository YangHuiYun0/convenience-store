import request from "../util/request";
const BASE_API = 'http://192.168.0.106:9090'

export function getLogin(data){
    return request({
        url: BASE_API+'/login',
        method:'post',
        data
    })
}