import { request } from "@/utils";

/**
 * 通过id删除用户
 * @param params 包含id的数组
 * @returns
 */
export const deleteUsers = async (params: number[]) => {
  try {
    const res = await request.post("user/deleteUsers", params);
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
