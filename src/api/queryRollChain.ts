import { request } from "@/utils";

/**
 * 车间卷装链条
 * @returns
 */
export const queryRollChain = async (params: any) => {
  try {
    const res = await request.get("/rollChain/queryRollChain", {
      params,
    });

    return res;
  } catch (err: any) {
    console.error("error", err);
    return err;
  }
};
