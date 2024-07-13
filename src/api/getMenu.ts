import { request } from "@/utils";

/**
 * 获取菜单
 * @returns
 */
export const getMenu = async () => {
  try {
    const res = await request.get("menu/queryMenuByUser");

    return res;
  } catch (err: any) {
    console.error("获取菜单时发生错误", err);
    return err;
  }
};
