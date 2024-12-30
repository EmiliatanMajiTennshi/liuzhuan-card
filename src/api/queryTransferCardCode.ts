import { request } from "@/utils";

/**
 * 获取流转卡编号用于二次下发
 * @returns
 */
export const queryTransferCardCode = async (params: { code: number }) => {
  try {
    const res = await request.get("transferCardSave/queryTransferCardCode", {
      params,
    });
    return res;
  } catch (err: any) {
    console.error("error", err);
    return err;
  }
};
