import { request } from "@/utils";

/**
 * 设备申诉列表
 * @param params
 * @returns
 */
export const queryAppealInfo = async (params?: any) => {
  try {
    const res = await request.get("processUnfinish/queryAppealInfo", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
