import { request } from "@/utils";

/**
 * 补单零件查询
 * @returns
 */
export const getSupplement = async (params: any) => {
  try {
    const res = await request.get("trasferCardManager/supplement", {
      params,
    });

    return res;
  } catch (err: any) {
    console.error("error", err);
    return err;
  }
};
