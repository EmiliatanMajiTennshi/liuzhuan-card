// 扣减成品流转卡数量
import { request } from "@/utils";
interface IReduceFinishPartNumberById {
  transferCardCode: number;
  numberKg: number;
  numberPcs: number;
}

/**
 * 扣减成品流转卡数量
 * @param params
 * @returns
 */
export const reduceFinishPartNumberById = async (
  params: IReduceFinishPartNumberById
) => {
  try {
    const res = await request.get(
      "trasferCardManager/reduceFinishPartNumberById",
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
