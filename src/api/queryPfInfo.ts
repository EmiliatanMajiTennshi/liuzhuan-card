import { request } from "@/utils";

/**
 * 生料派发库存
 * @param params
 * @returns
 */
export const queryPfInfo = async (params: any) => {
  try {
    const res = await request.get("rawmaterial/queryPfInfo", { params });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
