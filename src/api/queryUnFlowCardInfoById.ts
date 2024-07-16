// 标准非零件点击下发查询

import { request } from "@/utils";
interface IQueryUnFlowCardInfoById {
  id: number;
}

/**
 * 通过id查找流转卡
 * @param params
 * @returns
 */
export const queryUnFlowCardInfoById = async (
  params: IQueryUnFlowCardInfoById
) => {
  try {
    const res = await request.get("flowCard/queryUnFlowCardInfoById", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
