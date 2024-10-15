import { request } from "@/utils";

/**
 * 已入库流转卡工序未完成情况统计 日

 * @returns
 */
export const countProcessUnfinishToStoreYestereday = async () => {
  try {
    const res = await request.get(
      "processUnfinish/countProcessUnfinishToStoreYestereday"
    );
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
