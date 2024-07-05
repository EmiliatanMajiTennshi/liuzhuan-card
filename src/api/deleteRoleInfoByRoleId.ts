import { request } from "@/utils";

export const deleteRoleInfoByRoleId = async (params: number[]) => {
  try {
    const res = await request.post("role/deleteRoleInfoByRoleId", params);
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
