import { request } from "../utils";

export const loginRequest = (loginForm) => {
  return async (setToken) => {
    try {
      const res = await request.post("/api/user/login", loginForm);
      const token = res.data.data;
      setToken(token);
      return res.data;
    } catch (err) {
      console.log("登录失败", err);
      return err?.response?.data;
    }
  };
};
