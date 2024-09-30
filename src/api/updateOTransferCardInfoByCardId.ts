import { request } from "@/utils";

/**
 * 外协外购零件通过流转卡编号更新流转卡信息和工艺流转卡号和序号更新工艺信息
 * @param params
 * @returns
 */
export const updateOTransferCardInfoByCardId = async (params: any) => {
  try {
    const res = await request.post(
      "updateTransferCard/updateOTransferCardInfoByCardId",
      params
    );
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
