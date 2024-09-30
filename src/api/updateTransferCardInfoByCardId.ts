import { request } from "@/utils";

/**
 * 半品零件通过流转卡编号更新流转卡信息和工艺流转卡号和序号更新工艺信息
 * @param params
 * @returns
 */
export const updateTransferCardInfoByCardId = async (params: any) => {
  try {
    const res = await request.post(
      "updateTransferCard/updateTransferCardInfoByCardId",
      params
    );
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};