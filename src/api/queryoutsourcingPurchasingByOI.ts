import { request } from "@/utils";

/**
 * 外协外购通过订单号和料号查询
 * @returns
 */
export const queryoutsourcingPurchasingByOI = async (params: any) => {
  try {
    const res = await request.get(
      "trasferCardManager/queryoutsourcingPurchasingByOI",
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
