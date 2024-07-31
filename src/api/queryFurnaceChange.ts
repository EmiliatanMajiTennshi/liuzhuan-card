import { request } from "@/utils";
interface IQueryFurnaceChange {
  pageNum?: number;
  pageSize?: number;
}

/**
 * 炉台变更查询
 * @param params
 * @returns
 */
export const queryFurnaceChange = async (params?: IQueryFurnaceChange) => {
  try {
    const res = await request.get("furnacechange/queryFurnaceChange", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
