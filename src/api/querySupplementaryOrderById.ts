// 补单订单点击下发
import { request } from "@/utils";
interface IQuerySupplementaryOrderById {
  id: number;
}

/**
 * 补单订单点击下发
 * @param params
 * @returns
 */
export const querySupplementaryOrderById = async (
  params: IQuerySupplementaryOrderById
) => {
  try {
    const res = await request.get("supplementary/querySupplementaryOrderById", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
