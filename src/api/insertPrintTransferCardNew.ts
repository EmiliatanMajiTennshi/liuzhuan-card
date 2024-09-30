import { request } from "@/utils";

/**
 * 流转卡打印，保存流转卡编号
 * @returns
 */
export const insertPrintTransferCardNew = async (params: any) => {
  try {
    const res = await request.get(
      "updateTransferCard/insertPrintTransferCard",
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
