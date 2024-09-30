import { request } from "@/utils";

/**
 * 获取半品零件列表
 * @returns
 */
export const getUnfinishedProducts = async (params: any) => {
  try {
    const res = await request.get("trasferCardManager/unfinishedProducts", {
      params,
    });

    return res;
  } catch (err: any) {
    console.error("error", err);
    return err;
  }
};
