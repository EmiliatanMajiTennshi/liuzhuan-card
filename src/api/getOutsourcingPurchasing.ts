import { request } from "@/utils";

/**
 * 外协外购零件查询
 * @returns
 */
export const getOutsourcingPurchasing = async (params: any) => {
  try {
    const res = await request.get("trasferCardManager/outsourcingPurchasing", {
      params,
    });

    return res;
  } catch (err: any) {
    console.error("error", err);
    return err;
  }
};
