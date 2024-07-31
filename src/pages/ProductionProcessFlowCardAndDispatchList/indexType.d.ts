import { AnyObject } from "antd/es/_util/type";

export interface IData {
  partNumber?: string;
  orderid?: string;
  itmid?: string;
  name?: string;
  spec?: string;
  itmtdid?: string;
  ljFinDate?: string;
  newsupcount?: string;
  uomname?: string;
  weight?: string;
  unit?: string;
  mItmID?: string;
  mName?: string;
  mspec?: string;
  mItmTDID?: string;
  mainsizeList?: {
    project1?: string;
    projectitem1?: string;
    project2?: string;
    projectitem2?: string;
    project3?: string;
    projectitem3?: string;
    project4?: string;
    projectitem4?: string;
    allID?: string;
  }[];
  processList?: {
    seq?: number;
    processName?: string;
  }[];
  detailProcessesList?: {
    hid?: number;
    processName?: string;
    traceabilityNumber: string;
  }[];
  transferCardCode?: string;
  orderCode?: string;
  storeCode?: string;
  pickingCode?: string;
  traceabilityNumber?: string;
  trademarkList?: any[];
  type?: string;
  alreadySend?: {
    alreaySendNumKG?: string;
    alreaySendNumPCS?: string;
  };
  parseWeight?: string;
  transferKg?: string;
  transferPcs?: string;
  productionKg?: string;
  productionPcs?: string;
  project1Item?: string;
  project1Name?: string;
  project2Item?: string;
  project2Name?: string;
  project3Item?: string;
  project3Name?: string;
  project4Item?: string;
  project4Name?: string;
  project5Item?: string;
  project5Name?: string;
  project6Item?: string;
  project6Name?: string;
  barCode?: string;
  transferCard?: string;
  materialPartNumber?: string;
  id?: number;
  remark?: string;
  transferNumberKG?: string;
  transferNumberPCS?: string;
  reworkTransferCardCode?: string;
  detailProcesses?: any[];
}

export interface IFormFields {
  orderCatchHalf: string;
  lzCardNumber: string;
  orderid: string;
  itmid: string;
  name: string;
  spec: string;
  traceabilityNumber: string;
  itmtcid: string;
  itmTEID: string;
  ljFinDate: string;
  newsupcount: string;
  huancount: number;
  mItmID: string;
  mName: string;
  mspec: string;
  mItmTDID: string;
  itmtdid: string;
  orderQRcode: string;
  rukuQRcode: string;
  lingliaoQRcode: string;
  ordernum: string;
  liucount: string;
  liuhuancount: string;
  furnaceNum: string;
  trademark: string;
  heatTreatmentFurnace: string;
  priority: string;
  transferTime: string;
}
