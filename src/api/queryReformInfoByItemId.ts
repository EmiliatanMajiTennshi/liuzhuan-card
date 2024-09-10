// 模糊搜索
import { request } from "@/utils";
interface IQueryReformInfoByItemId {
  itemId: string;
}

/**
 * 模糊搜索改制料号
 * @param params
 * @returns
 */
export const queryReformInfoByItemId = async (
  params: IQueryReformInfoByItemId
) => {
  try {
    const res = await request.get("rework/queryReformInfoByItemId", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
