import { request } from "@/utils";
import { getToken } from "@/utils";
export const getUserInfo = async () => {
  try {
    const res = await request.get("queryMenu", {
      params: {
        token: getToken(),
      },
    });
    return res;
  } catch (err) {
    console.error("获取菜单时发生错误", err);
    return err;
  }
};
