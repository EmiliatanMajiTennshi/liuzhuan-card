import { request } from "@/utils";
interface IQueryHeatTreatment {
  pageNum?: number;
  pageSize?: number;
}

/**
 * 热处理流转卡查询
 * @param params
 * @returns
 */
export const queryHeatTreatment = async (params?: IQueryHeatTreatment) => {
  try {
    const res = await request.get("heatTreatment/queryHeatTreatment", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
