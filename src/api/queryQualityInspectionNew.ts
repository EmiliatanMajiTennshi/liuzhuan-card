import { request } from "@/utils";

/**
 * 品检-外购外协报检查询
 * @returns
 */
export const queryQualityInspectionNew = async (params: any) => {
  try {
    const res = await request.get("qualityInspection/queryQualityInspection", {
      params,
    });

    return res;
  } catch (err: any) {
    console.error("error", err);
    return err;
  }
};
