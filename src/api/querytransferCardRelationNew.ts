import { request } from "@/utils";

/**
 * 半品成品关联查询
 * @returns
 */
export const querytransferCardRelation = async (params: any) => {
  try {
    const res = await request.get(
      "trasferCardManager/querytransferCardRelation",
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
