import { TOKENKEY } from "@/constants";

/**
 * 把token存到localStorage
 * @param token
 */
const setToken = (token: string) => {
  localStorage.setItem(TOKENKEY, token);
};

/**
 * 从localStorage获取token
 * @returns
 */
const getToken = () => {
  return localStorage.getItem(TOKENKEY);
};

/**
 * 从localStorage删除token
 */
const removeToken = () => {
  localStorage.removeItem(TOKENKEY);
};

export { setToken, getToken, removeToken };
