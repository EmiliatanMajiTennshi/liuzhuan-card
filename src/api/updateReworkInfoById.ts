import { request } from "@/utils";

interface IUpdateReworkInfoById {
  id: number;
}

/**
 * 通过id更新返工流转卡
 * @param params
 * @returns
 */
export const updateReworkInfoById = async (params: IUpdateReworkInfoById) => {
  try {
    const res = await request.post("/rework/updateReworkInfoById", params);
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
