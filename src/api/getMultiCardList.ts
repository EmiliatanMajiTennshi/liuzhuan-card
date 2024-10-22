import { requestDJ } from "@/utils";

/**
 * 多工序查询（管理）
 * @returns
 */
export const getMultiCardList = async (params: any) => {
  try {
    const res = await requestDJ.get("getMultiCardList", {
      params,
    });

    return res;
  } catch (err: any) {
    console.error("error", err);
    return err;
  }
};
