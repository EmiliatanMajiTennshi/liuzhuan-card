import { request } from "@/utils";

interface IUpdateHeatTreatmentStatus {
  id: number;
}

/**
 * 通过id确认物流-热处理配料状态
 * @param params
 * @returns
 */
export const updateHeatTreatmentStatus = async (
  params: IUpdateHeatTreatmentStatus
) => {
  try {
    const res = await request.get("heatTreatment/updateHeatTreatmentStatus", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
