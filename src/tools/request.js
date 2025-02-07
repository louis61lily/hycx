import axios from "axios";

// 创建 Axios 实例
const service = axios.create({
  baseURL: "", // 替换为你的 API 基础 URL
  timeout: 5000 // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，例如添加 Token
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    // 处理请求错误
    console.error("请求出错:", error);
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
    console.error("响应出错:", error);
    // if (error.response) {
    //   switch (error.response.status) {
    //     case 401:
    //       // 处理未授权错误，例如跳转到登录页面
    //       console.log("未授权，请登录");
    //       break;
    //     case 404:
    //       console.log("请求的资源不存在");
    //       break;
    //     case 500:
    //       console.log("服务器内部错误");
    //       break;
    //     default:
    //       console.log(`请求失败，状态码: ${error.response.status}`);
    //   }
    // }
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
