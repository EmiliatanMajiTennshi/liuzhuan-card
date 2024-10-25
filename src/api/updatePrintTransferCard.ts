// 撤销打印
import { request } from "@/utils";
interface IUpdatePrintTransferCard {
  transferCardCode: string;
}

/**
 * 撤销打印
 * @param params
 * @returns
 */
export const updatePrintTransferCard = async (
  params?: IUpdatePrintTransferCard
) => {
  try {
    const res = await request.get(
      "/updateTransferCard/updatePrintTransferCard",
      { params }
    );
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
