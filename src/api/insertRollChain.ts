import { request } from "@/utils";

/**
 * 车间卷装链条添加,开单人用operate接口
 * @param params
 * @returns
 */
export const insertRollChain = async (params: any) => {
  try {
    const res = await request.post("rollChain/insertRollChain", params);
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
