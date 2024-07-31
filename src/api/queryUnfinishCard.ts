import { request } from "@/utils";
interface IQueryUnfinishCard {
  pageNum?: number;
  pageSize?: number;
}

/**
 * 流转卡工序未完成情况查询（未入库）
 * @param params
 * @returns
 */
export const queryUnfinishCard = async (params?: IQueryUnfinishCard) => {
  try {
    const res = await request.get("transferCard/queryUnfinishCard", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
