// 通过id查询返工流程卡详细信息
import { request } from "@/utils";
interface IQueryReworkInfoById {
  id: number;
}

/**
 * 通过id查询返工流程卡详细信息
 * @param params
 * @returns
 */
export const queryReworkInfoById = async (params: IQueryReworkInfoById) => {
  try {
    const res = await request.get("rework/queryReworkInfoById", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
