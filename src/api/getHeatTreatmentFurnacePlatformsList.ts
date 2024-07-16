import { request } from "@/utils";

/**
 * 获取热处理炉台
 * @returns
 */
export const getHeatTreatmentFurnacePlatformsList = async () => {
  try {
    const res = await request.get("furnacechange/queryAllFurnacePlatform");
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
