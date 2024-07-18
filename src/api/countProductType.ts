import { request } from "@/utils";

/**
 * 统计零件流转卡类型
 * @param params
 * @returns
 */
export const countProductType = async () => {
  try {
    const res = await request.get("transferCard/countProductType");
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
