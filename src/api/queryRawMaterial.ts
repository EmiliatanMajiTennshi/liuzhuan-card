// 生料库存查询
import { request } from "@/utils";
interface IQueryRawMaterial {
  pageNum?: number;
  pageSize?: number;
}

/**
 * 生料库存查询
 * @param params
 * @returns
 */
export const queryRawMaterial = async (params: IQueryRawMaterial) => {
  try {
    const res = await request.get("rawmaterial/queryRawMaterial", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
