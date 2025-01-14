import { request } from "@/utils";

/**
 * 获取模具信息
 * @returns
 */
export const findMoldInfo = async (params: any) => {
  try {
    const res = await request.get("findMoldInfo", {
      params,
    });
    return res;
  } catch (err: any) {
    console.error("error", err);
    return err;
  }
};
