import { requestDJ } from "@/utils";

/**
 * 多工序查询(查询)
 * @returns
 */
export const getMultiCardgxList = async (params: any) => {
  try {
    const res = await requestDJ.get("getMultiCardgxList", {
      params,
    });

    return res;
  } catch (err: any) {
    console.error("error", err);
    return err;
  }
};
