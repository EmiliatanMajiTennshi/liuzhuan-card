import { request } from "@/utils";
interface IQueryUnfinishCardToStore {
  pageNum?: number;
  pageSize?: number;
}

/**
 * 流转卡工序未完成情况查询(已入库)
 * @param params
 * @returns
 */
export const queryUnfinishCardToStore = async (
  params?: IQueryUnfinishCardToStore
) => {
  try {
    const res = await request.get("transferCard/queryUnfinishCardToStore", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
