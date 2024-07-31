import { request } from "@/utils";

interface IUpdateReworkDetailById {
  id: number;
}

/**
 * 通过id更新返工流转卡工序
 * @param params
 * @returns
 */
export const updateReworkDetailById = async (
  params: IUpdateReworkDetailById
) => {
  try {
    const res = await request.post("rework/updateReworkDetailById", params);
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
