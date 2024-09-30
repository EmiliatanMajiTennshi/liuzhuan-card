import { request } from "@/utils";

/**
 * 非标准零件通过半品订单号和料号，查成品的订单号和料号
 * @returns
 */
export const queryPartNumberByHalf = async (params: any) => {
  try {
    const res = await request.get("trasferCardManager/queryPartNumberByHalf", {
      params,
    });

    return res;
  } catch (err: any) {
    console.error("error", err);
    return err;
  }
};
