import { request } from "@/utils";

/**
 * 通过id删除菜单
 * @param params 包含id的数组
 * @returns
 */
export const deleteMenuById = async (params: number[]) => {
  try {
    const res = await request.post("menu/deleteMenuById", params);
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
