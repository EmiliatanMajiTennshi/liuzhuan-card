import { request } from "@/utils";
interface IQueryHeatTreatmentDashBoard {
  pageNum?: number;
  pageSize?: number;
}

/**
 * 热处理流转卡查询
 * @param params
 * @returns
 */
export const queryHeatTreatDashBoard = async (
  params?: IQueryHeatTreatmentDashBoard
) => {
  try {
    const res = await request.get("heatTreatment/queryHeatTreatDashBoard", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
