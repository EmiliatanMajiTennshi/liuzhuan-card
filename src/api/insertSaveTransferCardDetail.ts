import { request } from "@/utils";

/**
 * 流转卡管理保存
 * @param params
 * @returns
 */
export const insertSaveTransferCardDetail = async (params: any) => {
  try {
    const res = await request.post(
      "transferCard/insertSaveTransferCardDetail",
      params
    );
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
