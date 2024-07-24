import { request } from "@/utils";
interface IQueryOperationInfo {
  pageNum?: number;
  pageSize?: number;
  id?: string;
  name?: string;
}

/**
 * 操作工查询
 * @param params
 * @returns
 */
export const queryOperationInfo = async (params?: IQueryOperationInfo) => {
  try {
    const res = await request.get("transferCard/queryOperationInfo", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
