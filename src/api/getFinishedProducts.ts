import { request } from "@/utils";

/**
 * 获取成品零件列表
 * @returns
 */
export const getFinishedProducts = async (params: any) => {
  try {
    const res = await request.get("trasferCardManager/finishProduct", {
      params,
    });
    return res;
  } catch (err: any) {
    console.error("error", err);
    return err;
  }
};
