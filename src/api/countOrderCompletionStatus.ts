import { request } from "@/utils";

/**
 * 订单完成情况统计
 * @param params
 * @returns
 */
export const countOrderCompletionStatus = async () => {
  try {
    const res = await request.get("count/countOrderCompletionStatus");
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
