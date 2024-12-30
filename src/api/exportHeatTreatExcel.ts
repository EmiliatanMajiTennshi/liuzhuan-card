import { request } from "@/utils";
/**
 * 导出热处理列表excel
 * @returns
 */
export const exportHeatTreatExcel = async () => {
  try {
    const res = await request.get("heatTreatment/exportHeatTreatExcel", {
      responseType: "blob",
    });
    return res;
  } catch (err: any) {
    console.error("error", err);
    return err;
  }
};
