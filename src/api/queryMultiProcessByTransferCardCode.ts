import { request } from "@/utils";

/**
 * 多工艺根据流转卡编号查询
 * @param params
 * @returns
 */
export const queryMultiProcessByTransferCardCode = async (params: {
  transferCardCode?: string;
}) => {
  try {
    const res = await request.get(
      "multiProcess/queryMultiProcessByTransferCardCode",
      { params }
    );
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
