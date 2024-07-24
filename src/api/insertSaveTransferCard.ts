import { request } from "@/utils";

/**
 * 零件流转卡保存
 * @param params
 * @returns
 */
export const insertSaveTransferCard = async (params: any) => {
  try {
    const res = await request.post(
      "transferCard/insertSaveTransferCard",
      params
    );
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
