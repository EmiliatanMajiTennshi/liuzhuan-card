// 返工流程卡二维码获取
import { request } from "@/utils";

/**
 * 返工流程卡二维码获取
 * @returns
 */
export const queryQR = async () => {
  try {
    const res = await request.get("rework/queryQR");
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
