import axios from "axios";
import { getToken } from "./token";

// axios的配置文件, 可以在这里去区分开发环境和生产环境等全局一些配置
const devBaseUrl = "apiLz/";
const proBaseUrl = "http://192.168.20.65:8081/api/";

// process.env返回的是一个包含用户的环境信息,它可以去区分是开发环境还是生产环境
export const BASE_URL =
  process.env.NODE_ENV === "development" ? devBaseUrl : proBaseUrl;
export const TIMEOUT = 500000;

var requestLz = axios.create({
  baseURL: BASE_URL, //基准地址
  timeout: TIMEOUT,
});

//拦截请求
requestLz.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//拦截响应
requestLz.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //对响应的错误做点什么
    return Promise.reject(error);
  }
);

export default requestLz;
