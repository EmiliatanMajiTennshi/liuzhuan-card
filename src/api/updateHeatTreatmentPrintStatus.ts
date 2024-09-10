import { request } from "@/utils";
interface IPrintSaveCard {
  id?: string | number;
}

/**
 * 热处理炉台打印状态
 * @param params
 * @returns
 */
export const updateHeatTreatmentPrintStatus = async (
  params?: IPrintSaveCard
) => {
  try {
    const res = await request.get(
      "/heatTreatment/updateHeatTreatmentPrintStatus",
      { params }
    );
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
