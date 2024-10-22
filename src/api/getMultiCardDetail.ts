import { requestDJ } from "@/utils";

/**
 * 工艺详情
 * @returns
 */
export const getMultiCardDetail = async (params: any) => {
  try {
    const res = await requestDJ.get("getMultiCardDetail", {
      params,
    });

    return res;
  } catch (err: any) {
    console.error("error", err);
    return err;
  }
};
