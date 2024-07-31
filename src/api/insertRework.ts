import { request } from "@/utils";

interface IInsertRework {
  productType: any;
  reworkType: any;
  transferCardCode: any;
  reworkTransferCardCode: string | undefined;
  traceabilityNumber: any;
  reworkNumber: any;
  partNumber: any;
  name: any;
  spec: any;
  reworkFlow: any;
  drawer: any;
  reworkQuantity: any;
  reworkUnit: any;
  material: any;
  trademark: any;
  detailProcesses: any[];
}

/**
 * 返工流程卡添加
 * @param params
 * @returns
 */
export const insertRework = async (params: IInsertRework) => {
  try {
    const res = await request.post("rework/insertRework", params);
    return res;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
