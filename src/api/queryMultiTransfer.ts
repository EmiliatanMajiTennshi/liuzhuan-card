import { request } from "@/utils";

/**
 * 多工序查询;
 * @param params
 * @returns
 */
export const queryMultiTransfer = async (params: any) => {
  try {
    const res = await request.get("multiProcess/queryMultiTransfer", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
