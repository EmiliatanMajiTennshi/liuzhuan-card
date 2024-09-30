import { request } from "@/utils";

/**
 * 物流-热处理配料查询
 * @returns
 */
export const queryLogisticsNew = async (params: any) => {
  try {
    const res = await request.get("logistics/queryLogistics", {
      params,
    });

    return res;
  } catch (err: any) {
    console.error("error", err);
    return err;
  }
};
