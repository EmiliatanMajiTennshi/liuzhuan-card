import { request } from "@/utils";
interface IQueryOutsourcingPurchasing {
  pageNum?: number;
  pageSize?: number;
}

/**
 * 查询标准品流转卡
 * @param params
 * @returns
 */
export const queryOutsourcingPurchasing = async (
  params?: IQueryOutsourcingPurchasing
) => {
  try {
    const res = await request.get("outSource/queryOutsourcingPurchasing", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
