import { request } from "@/utils";

/**
 * 生料物流配送状态
 * @param params
 * @returns
 */
export const queryPfInfostatus = async (params: any) => {
  try {
    const res = await request.get("/rawmaterial/queryPfInfostatus", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
