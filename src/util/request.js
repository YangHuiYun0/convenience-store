import axios from 'axios';
import router from '../router';
import Cookies from 'js-cookie';

import { clearLoginInfo } from './index';
import { getToken } from '../util/auth';
import { Message } from 'element-ui';

const BASE_API = 'http://localhost:9090';//本地
// const BASE_API = 'http://47.106.70.5:9090';   //服务器
// 创建 axios 实例
const service = axios.create({
  baseURL: BASE_API, // 请求地址公共部分
  timeout: 15000 ,// 请求超时,
  withCredentials:true
});

// request 拦截器
// service.interceptors.request.use(config => {
//   // 请求携带 token
//   const access_token = `${getToken()}`;
//   if (access_token) {
//     config.headers['token'] = access_token;
//   }
//   if (config.type === 'form') {
//     config.headers['content-type'] = 'application/x-www-form-urlencoded';
//   }
//   return config;
// }, err => {
//   Promise.reject(err);
// });

// respone 拦截器
service.interceptors.response.use(response => {
  // code 500 -> 登录失败
  if (response.data && response.data.code === 401) {
    router.push({ path: '/' });
    Message.error('您的访问权限已过期，请重新登录');
    Cookies.remove("userType");
  }
    return response.data;

}, error => {
  Message.error('请求超时，请重试');
  // 错误部分，待处理
  return Promise.reject(error);
});

export default service;
