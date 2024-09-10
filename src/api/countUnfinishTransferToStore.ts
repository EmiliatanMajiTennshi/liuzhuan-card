// 已入库流转卡工序未完成情况统计-部门,统计张数
import { request } from "@/utils";
interface ICountUnfinishTransferToStore {
  sign: string;
}

/**
 * 已入库流转卡工序未完成情况统计-部门,统计张数
 * @param params
 * @returns
 */
export const countUnfinishTransferToStore = async (
  params: ICountUnfinishTransferToStore
) => {
  try {
    const res = await request.get("count/countUnfinishTransferToStore", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
