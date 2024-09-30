import { request } from "@/utils";

/**
 * 半品保存下发
 * @param params
 * @returns
 */
export const insertUnfinishedProductsNew = async (params: any) => {
  try {
    const res = await request.post(
      "transferCardSave/insertUnfinishedProducts",
      params
    );
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
