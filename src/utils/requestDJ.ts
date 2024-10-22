import axios from "axios";
import { getToken } from "./token";
import { message } from "antd";
import { TOKEN_ERROR } from "@/constants";
import { debounce } from "lodash";
import { startTransition } from "react";

const redirectToLogin = debounce(function () {
  startTransition(() => {
    window.location.href = "/#/login";
  });
}, 1000);
// axios的配置文件, 可以在这里去区分开发环境和生产环境等全局一些配置
const devBaseUrl = "apiDJ/";
const proBaseUrl = "http://192.168.2.67:90/lz";

// process.env返回的是一个包含用户的环境信息,它可以去区分是开发环境还是生产环境
export const BASE_URL =
  process.env.NODE_ENV === "development" ? devBaseUrl : proBaseUrl;
export const TIMEOUT = 500009;

/**
 * 请求
 */
var requestDJ = axios.create({
  baseURL: BASE_URL, //基准地址
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});
//拦截请求
requestDJ.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    } else {
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//拦截响应
requestDJ.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //对响应的错误做点什么
    if (
      error?.response?.data?.code === 401 &&
      (error?.response?.data?.msg ===
        "无权访问(Unauthorized):当前Subject是匿名Subject，请先登录(This subject is anonymous.)" ||
        error?.response?.data?.msg?.indexOf("Token已过期") !== -1 ||
        error?.response?.data?.msg?.indexOf("该帐号不存在") !== -1)
    ) {
      message.error(TOKEN_ERROR);
      redirectToLogin();
    }
    return Promise.reject(error);
  }
);

export default requestDJ;
