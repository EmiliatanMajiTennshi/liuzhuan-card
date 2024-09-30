import { request } from "@/utils";

/**
 * 外购外协已检查询
 * @returns
 */
export const queryOutSourceCheckNew = async (params: any) => {
  try {
    const res = await request.get("trasferCardManager/queryoutSourceCheck", {
      params,
    });

    return res;
  } catch (err: any) {
    console.error("error", err);
    return err;
  }
};
