import { request } from "@/utils";

/**
 * 半品零件通过订单号和料号查询
 * @returns
 */
export const queryUnfinishedProductsByOI = async (params: any) => {
  try {
    const res = await request.get(
      "trasferCardManager/queryUnfinishedProductsByOI",
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
