import { request } from "@/utils";

/**
 * 重工流转卡打印
 * @returns
 */
export const printReworkTransferCardNew = async (params: any) => {
  try {
    const res = await request.get(
      "reworkTransferCard/printReworkTransferCard",
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
