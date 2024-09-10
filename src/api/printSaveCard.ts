import { request } from "@/utils";
interface IPrintSaveCard {
  id?: string | number;
}

/**
 * 打印状态
 * @param params
 * @returns
 */
export const printSaveCard = async (params?: IPrintSaveCard) => {
  try {
    const res = await request.get("flowCard/printSaveCard", { params });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
