import { request } from "@/utils";

interface IUpdateMultiProcessByTransferCardCode {
  id: number;
  logisticsQuantity: number;
  transferCardCode: string;
}
/**
 * 通过id更新多工序物流数量
 * @param params
 * @returns
 */
export const updateMultiProcessByTransferCardCode = async (
  params: IUpdateMultiProcessByTransferCardCode
) => {
  try {
    const res = await request.get(
      "multiProcess/updateMultiProcessByTransferCardCode",
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
