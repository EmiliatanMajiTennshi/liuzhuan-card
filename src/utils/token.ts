import { TOKENKEY } from "@/constants";

const setToken = (token: string) => {
  localStorage.setItem(TOKENKEY, token);
};

const getToken = () => {
  return localStorage.getItem(TOKENKEY);
};

const removeToken = () => {
  localStorage.removeItem(TOKENKEY);
};

export { setToken, getToken, removeToken };
