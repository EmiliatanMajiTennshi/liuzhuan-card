import { request } from "@/utils";

/**
 * 已入库流转卡工序未完成情况查询
 * @returns
 */
export const queryProcessUnfinishToStoreNew = async (params: any) => {
  try {
    const res = await request.get(
      "processUnfinish/queryProcessUnfinishToStore",
      {
        params,
      }
    );

    return res;
  } catch (err: any) {
    console.error("error", err);
    return err;
  }
};
