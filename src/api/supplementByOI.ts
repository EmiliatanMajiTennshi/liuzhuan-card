import { request } from "@/utils";

/**
 * 补单零件通过订单号和料号查询
 * @returns
 */
export const supplementByOI = async (params: any) => {
  try {
    const res = await request.get("trasferCardManager/supplementByOI", {
      params,
    });

    return res;
  } catch (err: any) {
    console.error("error", err);
    return err;
  }
};
