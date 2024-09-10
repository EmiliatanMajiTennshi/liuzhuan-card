import { request } from "@/utils";

/**
 * 查需要同步操作员和检验员的工艺
 * @param params
 * @returns
 */
export const queryProcess = async () => {
  try {
    const res = await request.get("transferCard/queryProcess");
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
