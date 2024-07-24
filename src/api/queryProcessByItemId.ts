// 通过料号查工艺
import { request } from "@/utils";
interface IQueryProcessByItemId {
  itemid: string;
}

/**
 * 通过料号查工艺
 * @param params
 * @returns
 */
export const queryProcessByItemId = async (params: IQueryProcessByItemId) => {
  try {
    const res = await request.get("flowCard/queryProcessByItemId", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
