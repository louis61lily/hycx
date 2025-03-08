import { notification } from "antd";
import axios from "axios";

// 创建 Axios 实例
const service = axios.create({
  // baseURL: "http://1.14.64.23:8080", // 基础 URL
  baseURL: "http://localhost:8080", // 基础 URL
  timeout: 30000 // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，例如添加 Token
    const token = sessionStorage.getItem("token") || null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 处理响应错误
    if (error.response) {
      switch (error.response.status) {
        case 403:
          if (error.response.data?.code === 999) {
            // 处理未授权错误，例如跳转到登录页面
            notification.info({
              message: "重新登录",
              description: "登录信息过期，请重新登录！"
            });
            // 跳转到登录页面\清空token
            sessionStorage.removeItem("token");
            window.location.href = "/login";
          }
          break;
        default:
          console.log(`请求失败，状态码: ${error.response.status}`);
      }
    }
    return Promise.reject(error);
  }
);

// 封装请求方法
const $request = {
  get(url, params = {}) {
    return service.get(url, { params });
  },
  post(url, data = {}) {
    return service.post(url, data);
  },
  put(url, data = {}) {
    return service.put(url, data);
  },
  delete(url, params = {}) {
    return service.delete(url, { params });
  }
};

export default $request;
