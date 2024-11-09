import { request } from "@/utils";

/**
 * 保存申诉信息
 * @param params
 * @returns
 */
export const insertAppealInfo = async (params: any) => {
  try {
    const res = await request.post("processUnfinish/insertAppealInfo", params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
