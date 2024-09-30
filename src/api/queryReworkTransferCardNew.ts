import { request } from "@/utils";

/**
 * 重工流程卡查询
 * @returns
 */
export const queryReworkTransferCardNew = async (params: any) => {
  try {
    const res = await request.get(
      "reworkTransferCard/queryReworkTransferCard",
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
