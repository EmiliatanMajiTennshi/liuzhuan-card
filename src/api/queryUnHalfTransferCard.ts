import { request } from "@/utils";
interface IQueryUnHalfTransferCard {
  pageNum?: number;
  pageSize?: number;
}

/**
 * 查询标准品流转卡
 * @param params
 * @returns
 */
export const queryUnHalfTransferCard = async (
  params?: IQueryUnHalfTransferCard
) => {
  try {
    const res = await request.get("flowCard/queryUnHalfTransferCard", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
