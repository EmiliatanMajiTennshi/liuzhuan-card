export interface IData {
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
