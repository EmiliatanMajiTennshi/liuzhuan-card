// 模糊搜索评审单号,开单人
import { request } from "@/utils";
interface IQueryReviewFormNumber {
  number: string;
}

/**
 * 模糊搜索评审单号,开单人
 * @param params
 * @returns
 */
export const queryReviewFormNumber = async (params: IQueryReviewFormNumber) => {
  try {
    const res = await request.get("rework/queryReviewFormNumber", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
