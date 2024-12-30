import { request } from "@/utils";
interface IQueryOutSourcetransferCardRelation {
  pageNum?: number;
  pageSize?: number;
}

/**
 * 同时打印通过31找32
 * @param params
 * @returns
 */
export const queryOutSourcetransferCardRelation = async (
  params?: IQueryOutSourcetransferCardRelation
) => {
  try {
    const res = await request.get(
      "/trasferCardManager/queryOutSourcetransferCardRelation",
      {
        params,
      }
    );
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
