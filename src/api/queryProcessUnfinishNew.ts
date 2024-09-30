import { request } from "@/utils";

/**
 * 流转卡工序未完成情况查询
 * @returns
 */
export const queryProcessUnfinishNew = async (params: any) => {
  try {
    const res = await request.get("processUnfinish/queryProcessUnfinish", {
      params,
    });

    return res;
  } catch (err: any) {
    console.error("error", err);
    return err;
  }
};
