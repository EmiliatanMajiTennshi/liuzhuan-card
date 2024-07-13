import { request } from "@/utils";

/**
 * 获取用户列表
 * @params {}
 * @returns
 */
export const getUserList = async (params: any) => {
  try {
    const res = await request.get("user/userlist", {
      params,
    });
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
