import { IInsertUser } from "@/pages/UserManage/UserManageType";
import { request } from "@/utils";

/**
 * 增加用户
 * @param params
 * @returns
 */
export const insertUser = async (params: IInsertUser) => {
  try {
    const res = await request.post("user/insertUser", params);
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
