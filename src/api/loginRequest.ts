import { FieldType } from "@/components/LoginCom/LoginComType";
import { request, setToken } from "@/utils";

/**
 * 登录请求
 * @param loginForm
 * @returns
 */
export const loginRequest = async (loginForm: FieldType) => {
  try {
    const res = await request.post("user/login", loginForm);
    const token = res?.data?.data;

    if (token) {
      setToken(token);
    }
    return res.data;
  } catch (err: any) {
    console.log("网络错误", err);
    return err?.response;
  }
};
