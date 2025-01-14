import { request } from "@/utils";

interface IAddMoldInfo {
  productName: string;
  description: string;
  createdBy: string;
}
/**
 * 模具新品添加
 * @param params 包含id的数组
 * @returns
 */
export const addMoldInfo = async (params: IAddMoldInfo) => {
  try {
    const res = await request.post("addproDev", params);
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
