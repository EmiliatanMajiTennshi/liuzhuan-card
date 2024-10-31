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
    project5?: string;
    projectitem5?: string;
    project6?: string;
    projectitem6?: string;
    allID?: string;
  }[];
  processList?: {
    [key: string]: any;
    seq?: number;
    processName?: string;
  }[];
  detailProcessesList?: {
    hid?: number;
    processName?: string;
    traceabilityNumber: string;
    operationInfoList: any;
    verifierInfoList: any;
    [key: string]: any;
  }[];
  transferCardCode?: string;
  orderCode?: string;
  storeCode?: string;
  pickingCode?: string;
  traceabilityNumber?: string;
  trademarkList?: any[];
  trademarkList1?: any[];
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
  reworkUnit?: string;
  pCodeList?: ang[];
  parseitmid?: string;
  parsePartNumber?: string;
  pNumber?: string;
  productKg?: string;
  productPcs?: string;
  transferNumber?: string;
  reformPartNumber?: string;
  furnaceNo?: string;
  associationTraceabilityNumber?: string;
  orderCatchHalf?: string;
  trademark?: string;
  materialInfos?: any;
  relation?: string;
  rollChainTraceabilityNumber?: string;
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
  transferNumberKG?: string | number;
}

export interface IOperationItem {
  name: string;
  barcode: string;
  department: string;
}
export interface IVerifierItem {
  name: string;
  barcode: string;
}
export interface IEquipmentItem {
  name: string;
  barcode: string;
}
