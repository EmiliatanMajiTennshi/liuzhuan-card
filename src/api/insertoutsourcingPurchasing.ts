import { request } from "@/utils";

/**
 * 外购外协保存下发
 * @param params
 * @returns
 */
export const insertoutsourcingPurchasingNew = async (params: any) => {
  try {
    const res = await request.post(
      "transferCardSave/insertoutsourcingPurchasing",
      params
    );
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
