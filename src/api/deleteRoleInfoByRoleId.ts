import { request } from "@/utils";

/**
 * 通过roleId删除角色
 * @param params 包含id的数组
 * @returns
 */
export const deleteRoleInfoByRoleId = async (params: number[]) => {
  try {
    const res = await request.post("role/deleteRoleInfoByRoleId", params);
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
