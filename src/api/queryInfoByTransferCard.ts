import { request } from "@/utils";

/**
 * 重工流转卡通过流转卡编号transferCardCode搜索信息
 * @param params
 * @returns
 */
export const queryInfoByTransferCard = async (params: any) => {
  try {
    const res = await request.get(
      "/reworkTransferCard/queryInfoByTransferCard",
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
