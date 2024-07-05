import { request } from "@/utils";

export const deleteUsers = async (params: number[]) => {
  try {
    const res = await request.post("user/deleteUsers", params);
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
