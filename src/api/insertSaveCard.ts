import { request } from "@/utils";

/**
 * 保存下发
 * @param params
 * @returns
 */
export const insertSaveCard = async (params: any) => {
  try {
    const res = await request.post("flowCard/insertSaveCard", params);
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
