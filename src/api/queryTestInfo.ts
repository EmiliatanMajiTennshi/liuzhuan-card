import { request } from "@/utils";
interface IQueryTestInfo {
  pageNum?: number;
  pageSize?: number;
  id?: string;
  name?: string;
}

/**
 * 检验员查询
 * @param params
 * @returns
 */
export const queryTestInfo = async (params?: IQueryTestInfo) => {
  try {
    const res = await request.get("transferCard/queryTestInfo", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
