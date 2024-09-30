import { request } from "@/utils";

/**
 * 配送
 * @param params
 * @returns
 */
export const insertDeliveryNew = async (params: any) => {
  try {
    const res = await request.post("logistics/insertDelivery", params);
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
