// 外协流转卡点击下发查询

import { request } from "@/utils";
interface IQueryFlowCardInfoByOrderNo {
  id: number;
}

/**
 * 通过id查找流转卡
 * @param params
 * @returns
 */
export const queryFlowCardInfoByOrderNo = async (
  params: IQueryFlowCardInfoByOrderNo
) => {
  try {
    const res = await request.get("outSource/queryFlowCardInfoByOrderNo", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
