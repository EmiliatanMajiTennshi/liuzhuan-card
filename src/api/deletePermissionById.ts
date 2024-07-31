import { request } from "@/utils";

/**
 * 通过Id删除权限
 * @param params 包含id的数组
 * @returns
 */
export const deletePermissionById = async (params: number[]) => {
  try {
    const res = await request.post("permission/deletePermissionById", params);
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
