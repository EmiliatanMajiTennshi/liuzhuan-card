import { request } from "@/utils";

interface IUpdatePfStatus {
  goodsId: string;
  pftime: string;
}

/**
 * 生料状态更新
 * @param params
 * @returns
 */
export const updatePfStatus = async (params: IUpdatePfStatus) => {
  try {
    const res = await request.post("rawmaterial/updatePfStatus", params);
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
