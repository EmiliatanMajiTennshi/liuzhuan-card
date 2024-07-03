import { request } from "@/utils";
export const getUserList = async (params: any) => {
  try {
    const res = await request.get("user/user", {
      params: params,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
