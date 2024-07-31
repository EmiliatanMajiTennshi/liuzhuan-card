import { request } from "@/utils";

interface IUpdatePermissionById {
  name: string;
  perCode: string;
}

/**
 * 更新权限
 * @param params
 * @returns
 */
export const updatePermissionById = async (params: IUpdatePermissionById) => {
  try {
    const res = await request.post("permission/updatePermissionById", params);
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
