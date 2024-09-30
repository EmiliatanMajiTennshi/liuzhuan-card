import { request } from "@/utils";

/**
 * 零件流转卡
 * @returns
 */
export const queryTransferCardNew = async (params: any) => {
  try {
    const res = await request.get("trasferCardManager/querytransferCard", {
      params,
    });

    return res;
  } catch (err: any) {
    console.error("error", err);
    return err;
  }
};
