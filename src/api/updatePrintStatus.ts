import { request } from "@/utils";
interface IPrintSaveCard {
  id?: string | number;
}

/**
 * 返工打印状态
 * @param params
 * @returns
 */
export const updatePrintStatus = async (params?: IPrintSaveCard) => {
  try {
    const res = await request.get("rework/updatePrintStatus", { params });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
