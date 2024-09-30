import { request } from "@/utils";
interface ICountProcessUnfinishToStore {
  sign: string;
}

/**
 * 已入库流转卡工序未完成情况统计
 * @param params
 * @returns
 */
export const countProcessUnfinishToStore = async (
  params: ICountProcessUnfinishToStore
) => {
  try {
    const res = await request.get(
      "processUnfinish/countProcessUnfinishToStore",
      {
        params,
      }
    );
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
