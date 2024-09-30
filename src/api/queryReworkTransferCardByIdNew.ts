import { request } from "@/utils";

/**
 * 重工流转卡通过重工流转卡编号查询详细信息
 * @returns
 */
export const queryReworkTransferCardByIdNew = async (params: any) => {
  try {
    const res = await request.get(
      "reworkTransferCard/queryReworkTransferCardById",
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
