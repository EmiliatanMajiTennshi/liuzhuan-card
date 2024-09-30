import { request } from "@/utils";

/**
 * 成品零件通过订单号和料号查询
 * @returns
 */
export const queryfinishedProductsByOI = async (params: any) => {
  try {
    const res = await request.get(
      "trasferCardManager/queryfinishedProductsByOI",
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
