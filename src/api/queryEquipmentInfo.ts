import { request } from "@/utils";
interface IQueryEquipmentInfo {
  pageNum?: number;
  pageSize?: number;
  id?: string;
  name?: string;
}

/**
 * 设备查询
 * @param params
 * @returns
 */
export const queryEquipmentInfo = async (params?: IQueryEquipmentInfo) => {
  try {
    const res = await request.get("transferCard/queryEquipmentInfo", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
