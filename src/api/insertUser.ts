import { IInsertUser } from "@/pages/UserManage/UserManageType";
import { request } from "@/utils";

export const insertUser = async (params: IInsertUser) => {
  try {
    const res = await request.post("user/insertUser", params);
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
