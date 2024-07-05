import { request } from "@/utils";

interface IUpdateRoleInfoPermission {
  id: number;
  menus: string[];
  permission: string[];
  name: string;
}

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
