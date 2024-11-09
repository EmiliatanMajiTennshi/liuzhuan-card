import { request } from "@/utils";

/**
 * 作废
 * @param params
 * @returns
 */
export const updateDelmkByTransferCardCode = async (params: any) => {
  try {
    const res = await request.get(
      "/trasferCardManager/updateDelmkByTransferCardCode",
      { params }
    );
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
