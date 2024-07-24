import { request } from "@/utils";
interface IQueryTransferStore {
  pageNum?: number;
  pageSize?: number;
}

/**
 * 流转卡入库查询
 * @param params
 * @returns
 */
export const queryTransferStore = async (params?: IQueryTransferStore) => {
  try {
    const res = await request.get("transferCard/queryTransferStore", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
