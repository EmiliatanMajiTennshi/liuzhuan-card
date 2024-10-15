import { request } from "@/utils";

/**
 * 已入库流转卡工序未完成情况统计 月

 * @returns
 */
export const countProcessUnfinishToStoreMonth = async () => {
  try {
    const res = await request.get(
      "processUnfinish/countProcessUnfinishToStoreMonth"
    );
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
