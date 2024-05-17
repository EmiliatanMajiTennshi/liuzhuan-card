import { request } from "@/utils";

export const getUserlist = async (queryParam) => {
  try {
    const res = await request.get("/api/user/userlist", {
      params: queryParam,
    });
    return res;
  } catch (err) {
    console.error("获取用户列表时发生错误", err);
    return err;
  }
};
