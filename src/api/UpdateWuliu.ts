import { requestDJ } from "@/utils";

/**
 * 更新物流数量
 * @returns
 */
export const UpdateWuliu = async (params: any) => {
  try {
    const res = await requestDJ.get("UpdateWuliu", {
      params,
    });

    return res;
  } catch (err: any) {
    console.error("error", err);
    return err;
  }
};
