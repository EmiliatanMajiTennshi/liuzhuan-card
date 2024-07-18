// 补单订单查询
import { request } from "@/utils";
interface IQuerySupplementaryOrder {
  id: number;
}

/**
 * 补单订单查询
 * @param params
 * @returns
 */
export const querySupplementaryOrder = async (
  params: IQuerySupplementaryOrder
) => {
  try {
    const res = await request.get("supplementary/querySupplementaryOrder", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
