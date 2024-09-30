import { request } from "@/utils";
interface IQueryTransferCard {
  pageNum?: number;
  pageSize?: number;
  transfCardNo?: string;
  partNumber?: string;
  itmid?: string;
}

/**
 * 零件流转卡查询
 * @param params
 * @returns
 */
export const queryTransferCard = async (params?: IQueryTransferCard) => {
  try {
    const res = await request.get("transferCard/queryTransferCard", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
