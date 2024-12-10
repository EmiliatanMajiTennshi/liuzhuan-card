import { request } from "@/utils";

/**
 * 通过id搜外协外购的料号
 * @returns
 */
export const queryPartNumberByU9Code = async (params: any) => {
  try {
    const res = await request.get(
      "/trasferCardManager/queryPartNumberByU9Code",
      {
        params,
      }
    );

    return res;
  } catch (err: any) {
    console.error("error", err);
    return err;
  }
};
