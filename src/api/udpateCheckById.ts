import { request } from "@/utils";

interface IUpdateCheckById {
  id: number;
}

/**
 * 通过id更新品检-外协外购报检检查
 * @param params
 * @returns
 */
export const updateCheckById = async (params: IUpdateCheckById) => {
  try {
    const res = await request.get("transferCard/updateCheckById", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
