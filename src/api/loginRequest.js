import { request, setToken } from "@/utils";

export const loginRequest = async (loginForm) => {
  console.log(loginForm, 123);
  try {
    const res = await request.get("/login", {
      params: loginForm,
    });
    console.log(res, 123);
    const token = res.data[0].message;
    if (token) {
      setToken(token);
    }

    return res.data[0];
  } catch (err) {
    console.log("登录失败", err);
    return err?.response?.data;
  }
};
