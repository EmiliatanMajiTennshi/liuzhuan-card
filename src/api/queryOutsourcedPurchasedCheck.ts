import { request } from "@/utils";
interface IQueryOutsourcedPurchasedCheck {
  pageNum?: number;
  pageSize?: number;
}

/**
 * 外购外协已检查询
 * @param params
 * @returns
 */
export const queryOutsourcedPurchasedCheck = async (
  params?: IQueryOutsourcedPurchasedCheck
) => {
  try {
    const res = await request.get(
      "transferCard/queryOutsourcedPurchasedCheck",
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
