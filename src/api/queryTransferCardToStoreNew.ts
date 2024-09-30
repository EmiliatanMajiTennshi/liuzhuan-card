import { request } from "@/utils";

/**
 * 流转卡入库信息查询
 * @returns
 */
export const queryTransferCardToStoreNew = async (params: any) => {
  try {
    const res = await request.get(
      "trasferCardManager/queryTransferCardToStore",
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
