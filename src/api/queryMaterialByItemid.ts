import { request } from "@/utils";

/**
 * 通过id查询材料
 * @param params
 * @returns
 */
export const queryMaterialByItemid = async (params?: { itemid: number }) => {
  try {
    const res = await request.get("flowCard/queryMaterialByItemid", { params });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
