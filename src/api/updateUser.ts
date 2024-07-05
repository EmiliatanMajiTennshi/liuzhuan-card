import { request } from "@/utils";

interface IInsertUser {
  account: string;
  password: string;
  username: string;
  role: string[];
}

export const updateUser = async (params: IInsertUser) => {
  try {
    const res = await request.post("user/updateUser", params);
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
