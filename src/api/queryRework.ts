// 返工流程卡查询
import { request } from "@/utils";
interface IQueryRework {
  pageNum?: number;
  pageSize?: number;
}

/**
 * 返工流程卡查询
 * @param params
 * @returns
 */
export const queryRework = async (params: IQueryRework) => {
  try {
    const res = await request.get("rework/queryRework", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
