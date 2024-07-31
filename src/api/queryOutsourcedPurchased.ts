import { request } from "@/utils";
interface IQueryOutsourcedPurchased {
  pageNum?: number;
  pageSize?: number;
}

/**
 * 外协外购已检查询
 * @param params
 * @returns
 */
export const queryOutsourcedPurchased = async (
  params?: IQueryOutsourcedPurchased
) => {
  try {
    const res = await request.get("transferCard/queryOutsourcedPurchased", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
