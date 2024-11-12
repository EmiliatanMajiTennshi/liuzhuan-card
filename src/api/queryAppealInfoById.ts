import { request } from "@/utils";

/**
 * 申诉单详情查询
 * @param params
 * @returns
 */
export const queryAppealInfoById = async (params?: { id: string | number }) => {
  try {
    const res = await request.get("/processUnfinish/queryAppealInfoById", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
