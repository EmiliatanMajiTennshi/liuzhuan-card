import { request } from "@/utils";

/**
 * 多工序管理查询;
 * @param params
 * @returns
 */
export const queryMultiProcess = async (params: any) => {
  try {
    const res = await request.get("multiProcess/queryMultiProcess", { params });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
