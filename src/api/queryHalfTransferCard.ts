import { request } from "@/utils";
interface IQueryHalfTransferCard {
  pageNum?: number;
  pageSize?: number;
}

/**
 * 查询半品流转卡
 * @param params
 * @returns
 */
export const queryHalfTransferCard = async (
  params?: IQueryHalfTransferCard
) => {
  try {
    const res = await request.get("flowCard/queryHalfTransferCard", { params });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
