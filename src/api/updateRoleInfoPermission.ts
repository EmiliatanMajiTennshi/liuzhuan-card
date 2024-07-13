import { request } from "@/utils";

interface IUpdateRoleInfoPermission {
  id: number;
  menus: string[];
  permission: string[];
  name: string;
}

/**
 * 更新角色权限
 * @param params
 * @returns
 */
export const updateRoleInfoPermission = async (
  params: IUpdateRoleInfoPermission
) => {
  try {
    const res = await request.post("role/updateRoleInfoPermission", params);
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
