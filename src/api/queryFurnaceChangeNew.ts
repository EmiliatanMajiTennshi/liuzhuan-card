import { request } from "@/utils";

/**
 * 甩毛刺-甩圆角-炉台变更
 * @returns
 */
export const queryFurnaceChangeNew = async (params: any) => {
  try {
    const res = await request.get("logistics/queryFurnaceChange", {
      params,
    });

    return res;
  } catch (err: any) {
    console.error("error", err);
    return err;
  }
};
