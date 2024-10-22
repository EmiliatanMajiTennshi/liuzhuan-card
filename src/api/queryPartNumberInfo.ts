import { request } from "@/utils";

/**
 * 通过料号搜信息
 * @returns
 */
export const queryPartNumberInfo = async (params: any) => {
  try {
    const res = await request.get("/trasferCardManager/queryPartNumberInfo", {
      params,
    });

    return res;
  } catch (err: any) {
    console.error("error", err);
    return err;
  }
};
