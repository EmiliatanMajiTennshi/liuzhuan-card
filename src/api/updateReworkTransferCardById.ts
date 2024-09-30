import { request } from "@/utils";

/**
 * 重工流转卡通过重工流转卡编号和工序序号、工序名称更新工序
 * @param params
 * @returns
 */
export const updateReworkTransferCardById = async (params: any) => {
  try {
    const res = await request.post(
      "reworkTransferCard/updateReworkTransferCardById",
      params
    );
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
