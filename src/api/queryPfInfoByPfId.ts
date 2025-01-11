import { request } from "@/utils";

/**
 * 生料库存已完成配发查询
 * @param params
 * @returns
 */
export const queryPfInfoByPfId = async (params: any) => {
  try {
    const res = await request.get("rawmaterial/queryPfInfoByPfId", { params });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
