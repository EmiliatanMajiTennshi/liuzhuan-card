import { request } from "@/utils";

/**
 * 炉台变更
 * @param params
 * @returns
 */
export const insertFurnaceChange = async (params: any) => {
  try {
    const res = await request.post("logistics/insertFurnaceChange", params);
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
