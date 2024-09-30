import { request } from "@/utils";

/**
 * 重工流程卡添加
 * @param params
 * @returns
 */
export const insertReworkTransferCardNew = async (params: any) => {
  try {
    const res = await request.post(
      "reworkTransferCard/insertReworkTransferCard",
      params
    );
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
