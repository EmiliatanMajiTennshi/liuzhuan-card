import { request } from "@/utils";

export const getUserInfo = async () => {
  try {
    const res = await request.get("/user/info");
    return res;
  } catch (err: any) {
    console.error("查询角色数据失败", err);
    return err?.response;
  }
};
