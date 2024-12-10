import { request } from "@/utils";
interface IQueryStoreList {
  department?: string;
  finishTimeStart?: string;
  finishTimeEnd?: string;
}

/**
 * 统计明细
 * @param params
 * @returns
 */
export const queryStoreList = async (params: IQueryStoreList) => {
  try {
    const res = await request.get("count/queryStroeList", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
