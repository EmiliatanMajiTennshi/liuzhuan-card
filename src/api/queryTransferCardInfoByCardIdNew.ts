import { request } from "@/utils";

/**
 * 通过流转卡编号查询流转卡信息
 * @returns
 */
export const queryTransferCardInfoByCardIdNew = async (params: any) => {
  try {
    const res = await request.get(
      "updateTransferCard/queryTransferCardInfoByCardId",
      {
        params,
      }
    );

    return res;
  } catch (err: any) {
    console.error("error", err);
    return err;
  }
};
