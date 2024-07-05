import { request } from "@/utils";
export const getUserList = async (params: any) => {
  try {
    const res = await request.get("user/userlist", {
      params,
    });
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
