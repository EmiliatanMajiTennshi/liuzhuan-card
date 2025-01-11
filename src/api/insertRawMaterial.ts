import { request } from "@/utils";

interface IRawMaterial {
  pfcount: string;
  pftime: string;
  goodsId: string;
}

/**
 * 添加原材料
 */
export const insertRawMaterial = async (params: IRawMaterial) => {
  try {
    const res = await request.post("rawmaterial/insertRawMaterial", params);
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
