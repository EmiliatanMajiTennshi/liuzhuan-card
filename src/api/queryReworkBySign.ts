import { request } from "@/utils";
interface IQueryReworkInfoById {
  id: number;
}

/**
 * 获取返工卡编号和追溯单号
 * @param params
 * @returns
 */
export const queryReworkBySign = async (params: IQueryReworkInfoById) => {
  try {
    const res = await request.get("/reworkTransferCard/queryReworkBySign", {
      params,
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
