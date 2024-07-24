// 零件流转卡点击查看
import { request } from "@/utils";
interface IClickTransferCard {
  id: number;
}

/**
 * 零件流转卡点击查看
 * @param params
 * @returns
 */
export const clickTransferCard = async (params: IClickTransferCard) => {
  try {
    const res = await request.get("/transferCard/clickTransferCard", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
