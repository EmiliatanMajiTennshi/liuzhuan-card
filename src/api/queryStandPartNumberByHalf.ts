import { request } from "@/utils";

/**
 * 标准零件通过半品订单号和料号，查成品的订单号和料号
 * @returns
 */
export const queryStandPartNumberByHalf = async (params: any) => {
  try {
    const res = await request.get(
      "trasferCardManager/queryStandPartNumberByHalf",
      {
        params,
      }
    );

    return res;
  } catch (err: any) {
    console.error("error", err);
    return err;
  }
};
