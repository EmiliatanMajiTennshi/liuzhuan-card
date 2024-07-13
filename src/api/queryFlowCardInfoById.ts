// 标准零件点击下发查询

import { request } from "@/utils";
interface IQueryFlowCardInfoById {
  id: number;
}

/**
 * 通过id查找流转卡
 * @param params
 * @returns
 */
export const queryFlowCardInfoById = async (params: IQueryFlowCardInfoById) => {
  try {
    const res = await request.get("flowCard/queryFlowCardInfoById", { params });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
