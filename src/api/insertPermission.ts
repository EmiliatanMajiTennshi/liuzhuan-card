import { request } from "@/utils";

export interface IInsertPermission {
  name: string;
  perCode: string;
}

/**
 * 增加权限
 * @param params
 * @returns
 */
export const insertPermission = async (params: IInsertPermission) => {
  try {
    const res = await request.post("permission/insertPermission", params);
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
