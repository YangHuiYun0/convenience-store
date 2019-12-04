import axios from 'axios';
import router from '../router';

import { clearLoginInfo } from './index';
import { getToken } from '../utils/auth';
import { Message } from 'element-ui';

const BASE_API = 'http://localhost:8080'
// 创建 axios 实例
const service = axios.create({
  baseURL: BASE_API, // 请求地址公共部分
  timeout: 15000 // 请求超时
});

// request 拦截器
service.interceptors.request.use(config => {
  // 请求携带 token
  const access_token = `${getToken()}`;
  if (access_token) {
    config.headers['token'] = access_token;
  }
  if (config.type === 'form') {
    config.headers['content-type'] = 'application/x-www-form-urlencoded';
  }
  return config;
}, err => {
  Promise.reject(err);
});

// respone 拦截器
service.interceptors.response.use(response => {
  // code 401 -> token 失效
  if (response.data && response.data.code === 401) {
    // 清除 token
    clearLoginInfo();
    router.push({ name: 'login' });
    Message.error('您的访问权限已过期，请重新登录');
  }
  return response.data;
}, error => {
  Message.error('请求超时，请重试');
  // 错误部分，待处理
  return Promise.reject(error);
});

export default service;
