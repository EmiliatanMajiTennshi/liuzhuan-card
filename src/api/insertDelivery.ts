import { request } from "@/utils";

/**
 * 成品保存下发
 * @param params
 * @returns
 */
export const insertfinishedProductsNew = async (params: any) => {
  try {
    const res = await request.post(
      "transferCardSave/insertfinishedProducts",
      params
    );
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
